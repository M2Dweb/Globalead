/**
 * Lista os subscritores da newsletter para o /admin.
 * POST /.netlify/functions/newsletter-list
 * Body: { password: string }
 *
 * A tabela newsletter_subscribers tem RLS ligado e sem políticas, por isso não
 * é legível com a chave anónima (que viaja no bundle do site). A leitura passa
 * por aqui, protegida pela mesma password do painel.
 */
import { createClient } from '@supabase/supabase-js';

const json = (statusCode, payload) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const verifyAdminPassword = async (password) => {
  if (!password) return false;
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  );
  const { data } = await supabase.from('site_settings').select('admin_password').single();
  return data?.admin_password === password;
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

  if (!(await verifyAdminPassword(body.password))) {
    return json(401, { error: 'Unauthorized' });
  }

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, nome, apelido, status, source, consent_at, created_at, brevo_synced')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return json(200, { subscribers: data || [] });
  } catch (err) {
    console.error('newsletter-list error:', err);
    return json(500, { error: 'Não foi possível obter os subscritores' });
  }
};
