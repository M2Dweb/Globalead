/**
 * Subscrição da newsletter.
 * POST /.netlify/functions/newsletter-subscribe
 * Body: { nome?, apelido?, email, source? }
 *
 * Faz duas coisas, por esta ordem:
 *   1. grava o subscritor no Supabase — a lista é da Globalead, não da ferramenta;
 *   2. envia-o para o Brevo, que é quem trata das campanhas e do link de "cancelar
 *      subscrição" obrigatório.
 *
 * Corre no servidor de propósito: a chave do Brevo e a service role key do
 * Supabase nunca podem ir no bundle do site.
 *
 * Variáveis de ambiente (Netlify → Site settings → Environment variables):
 *   SUPABASE_SERVICE_ROLE_KEY   (obrigatória)
 *   BREVO_API_KEY               (opcional — sem ela, guarda na mesma e marca por sincronizar)
 *   BREVO_LIST_ID               (opcional — id da lista no Brevo)
 */
import { createClient } from '@supabase/supabase-js';

// Deliberadamente simples: só apanha erros de escrita óbvios. Quem valida a
// sério é o Brevo, no double opt-in.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const getSupabase = () =>
  createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

/**
 * Cria/atualiza o contacto no Brevo e junta-o à lista.
 * Devolve true se ficou sincronizado.
 */
const syncToBrevo = async ({ email, nome, apelido }) => {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey) {
    console.warn('[newsletter] BREVO_API_KEY não definida — subscritor guardado só no Supabase.');
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: nome || '', LASTNAME: apelido || '' },
        // Sem isto o Brevo devolve erro quando o contacto já existe.
        updateEnabled: true,
        ...(listId ? { listIds: [listId] } : {}),
      }),
    });

    // 201 = criado, 204 = já existia e foi atualizado.
    if (response.status === 201 || response.status === 204) return true;

    console.error('[newsletter] Brevo devolveu', response.status, await response.text());
    return false;
  } catch (err) {
    console.error('[newsletter] Falha a contactar o Brevo:', err);
    return false;
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const email = String(body.email || '').trim().toLowerCase();
  const nome = String(body.nome || '').trim() || null;
  const apelido = String(body.apelido || '').trim() || null;
  const source = String(body.source || 'rodape').trim();

  if (!EMAIL_RE.test(email)) {
    return json(400, { error: 'Email inválido' });
  }

  const supabase = getSupabase();
  const brevoSynced = await syncToBrevo({ email, nome, apelido });
  const now = new Date().toISOString();

  try {
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      // Já cá esteve. Se tinha cancelado, volta a ficar ativo — e fica registada
      // a data do novo consentimento. O created_at original mantém-se.
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          nome,
          apelido,
          status: 'ativo',
          unsubscribed_at: null,
          consent_at: now,
          source,
          brevo_synced: brevoSynced,
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await supabase.from('newsletter_subscribers').insert([
        { email, nome, apelido, source, consent_at: now, brevo_synced: brevoSynced },
      ]);

      if (error) throw error;
    }

    // brevoSynced=false não é erro para quem subscreveu: ficou guardado e
    // sincroniza-se depois. Só nós é que precisamos de saber.
    return json(200, { ok: true, synced: brevoSynced });
  } catch (err) {
    console.error('[newsletter] Erro ao guardar subscritor:', err);
    return json(500, { error: 'Não foi possível registar a subscrição' });
  }
};
