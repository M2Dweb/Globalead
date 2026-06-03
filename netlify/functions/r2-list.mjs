/**
 * Lista ficheiros numa pasta do R2.
 * GET /.netlify/functions/r2-list?folder=bancos
 * Sem autenticação (leitura pública de URLs).
 */
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const getClient = () =>
  new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

export const handler = async (event) => {
  const folder = event.queryStringParameters?.folder || '';
  if (!folder) {
    return { statusCode: 400, body: JSON.stringify({ error: 'folder param required' }) };
  }

  try {
    const client = getClient();
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: folder.endsWith('/') ? folder : `${folder}/`,
    });

    const response = await client.send(command);
    const baseUrl = process.env.R2_PUBLIC_BASE_URL;
    const urls = (response.Contents || [])
      .map((item) => `${baseUrl}/${item.Key}`)
      .filter((url) => !url.endsWith('/'));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify(urls),
    };
  } catch (err) {
    console.error('r2-list error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to list files' }) };
  }
};
