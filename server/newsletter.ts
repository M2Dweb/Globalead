/**
 * Subscrição da newsletter.
 * POST /api/newsletter-subscribe
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
 * Variáveis de ambiente (os segredos em Cloudflare → Worker → Settings →
 * Variables and Secrets; o resto nos "vars" do wrangler.jsonc):
 *   SUPABASE_SERVICE_ROLE_KEY   (obrigatória, secreta)
 *   VITE_SUPABASE_URL           (ou SUPABASE_URL)
 *   BREVO_API_KEY               (opcional, secreta — sem ela, guarda na mesma e marca por sincronizar)
 *   BREVO_LIST_ID               (opcional — id da lista no Brevo)
 *
 * Veio da Netlify Function com o mesmo nome. Fala com o PostgREST
 * diretamente, sem o supabase-js, para a função ficar pequena.
 */
import type { Env } from './og';

// Deliberadamente simples: só apanha erros de escrita óbvios.
//
// Isto é opt-in simples: o consentimento fica registado (consent_at, source)
// mas ninguém confirma que o endereço é mesmo de quem subscreveu. Se em algum
// momento aparecerem subscrições falsas, o passo seguinte é ligar o double
// opt-in do Brevo — exige um template de confirmação criado lá.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/**
 * Só os campos de nome que vieram preenchidos.
 *
 * O banner da newsletter pede apenas o email. Sem este filtro, quem já estava
 * na lista com nome (vindo do rodapé) e voltasse a subscrever pelo banner
 * ficava sem ele — cá e no Brevo.
 */
const definedOnly = (fields: Record<string, string | null>) =>
  Object.fromEntries(Object.entries(fields).filter(([, value]) => value));

/**
 * Cria/atualiza o contacto no Brevo e junta-o à lista.
 * Devolve true se ficou sincronizado.
 */
const syncToBrevo = async (env: Env, { email, nome, apelido }: { email: string; nome: string | null; apelido: string | null }) => {
  const apiKey = env.BREVO_API_KEY;
  const listId = Number(env.BREVO_LIST_ID);

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
        attributes: definedOnly({ FIRSTNAME: nome, LASTNAME: apelido }),
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

/** Pedido ao PostgREST com a service role key; lança erro se não for 2xx. */
const supabase = async (env: Env, path: string, init: RequestInit = {}) => {
  const url = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Faltam VITE_SUPABASE_URL/SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY');

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
      ...(init.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`);
  return response;
};

export async function newsletterSubscribe(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
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

  const brevoSynced = await syncToBrevo(env, { email, nome, apelido });
  const now = new Date().toISOString();

  try {
    const existing = (await (
      await supabase(env, `newsletter_subscribers?select=id&email=eq.${encodeURIComponent(email)}&limit=1`)
    ).json()) as { id: string }[];

    if (existing.length > 0) {
      // Já cá esteve. Se tinha cancelado, volta a ficar ativo — e fica registada
      // a data do novo consentimento. O created_at original mantém-se.
      await supabase(env, `newsletter_subscribers?id=eq.${encodeURIComponent(existing[0].id)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...definedOnly({ nome, apelido }),
          status: 'ativo',
          unsubscribed_at: null,
          consent_at: now,
          source,
          brevo_synced: brevoSynced,
        }),
      });
    } else {
      await supabase(env, 'newsletter_subscribers', {
        method: 'POST',
        body: JSON.stringify([{ email, nome, apelido, source, consent_at: now, brevo_synced: brevoSynced }]),
      });
    }

    // brevoSynced=false não é erro para quem subscreveu: ficou guardado e
    // sincroniza-se depois. Só nós é que precisamos de saber.
    return json(200, { ok: true, synced: brevoSynced });
  } catch (err) {
    console.error('[newsletter] Erro ao guardar subscritor:', err);
    return json(500, { error: 'Não foi possível registar a subscrição' });
  }
}
