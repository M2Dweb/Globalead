/**
 * Devolve métricas de storage do bucket R2.
 * GET /.netlify/functions/r2-metrics
 * Sem autenticação (só números, sem URLs privadas).
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

export const handler = async () => {
  try {
    const client = getClient();
    const command = new ListObjectsV2Command({ Bucket: process.env.R2_BUCKET_NAME });
    const response = await client.send(command);

    const contents = response.Contents || [];
    const usedBytes = contents.reduce((acc, item) => acc + (item.Size || 0), 0);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ usedBytes, fileCount: contents.length }),
    };
  } catch (err) {
    console.error('r2-metrics error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to get metrics' }) };
  }
};
