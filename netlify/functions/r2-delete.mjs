/**
 * Apaga ficheiros do R2.
 * POST /.netlify/functions/r2-delete
 * Body: { keys: string[], password: string }
 *
 * Protegido: valida a password de admin.
 */
import { S3Client, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

const getClient = () =>
  new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
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
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { keys, password } = body;

  if (!Array.isArray(keys) || keys.length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'keys array required' }) };
  }

  const authorized = await verifyAdminPassword(password);
  if (!authorized) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const client = getClient();
    const command = new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Delete: { Objects: keys.map((k) => ({ Key: k })) },
    });

    const result = await client.send(command);
    const deleted = (result.Deleted || []).length;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deleted }),
    };
  } catch (err) {
    console.error('r2-delete error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete files' }) };
  }
};
