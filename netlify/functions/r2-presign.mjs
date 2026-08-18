/**
 * Gera um URL pré-assinado (PUT) para upload direto do browser para o R2.
 * POST /.netlify/functions/r2-presign
 * Body: { path: string, contentType: string, password: string }
 *
 * Protegido: valida a password de admin antes de emitir o URL.
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createClient } from '@supabase/supabase-js';

const getClient = () =>
  new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    // OBRIGATÓRIO para URLs pré-assinados no R2.
    // Por omissão o SDK da AWS junta ao URL `x-amz-checksum-crc32=AAAAAA==`
    // (o CRC32 de um corpo vazio, porque na altura de assinar ainda não há
    // ficheiro). Quando o browser faz o PUT com a foto real, o checksum não
    // bate certo e o R2 recusa — e como a resposta de erro não traz cabeçalhos
    // CORS, o browser só mostra "Failed to fetch".
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
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

  const { path, contentType, password } = body;

  if (!path || !contentType) {
    return { statusCode: 400, body: JSON.stringify({ error: 'path and contentType required' }) };
  }

  const authorized = await verifyAdminPassword(password);
  if (!authorized) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const client = getClient();
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: path,
      ContentType: contentType,
    });

    // URL válido 5 minutos — suficiente para qualquer upload
    const presignedUrl = await getSignedUrl(client, command, { expiresIn: 300 });
    const publicUrl = `${process.env.R2_PUBLIC_BASE_URL}/${path}`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ presignedUrl, publicUrl, key: path }),
    };
  } catch (err) {
    console.error('r2-presign error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to generate presigned URL' }) };
  }
};
