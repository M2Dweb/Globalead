import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const accountId = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || '';
const accessKeyId = import.meta.env.VITE_R2_ACCESS_KEY_ID || '';
const secretAccessKey = import.meta.env.VITE_R2_SECRET_ACCESS_KEY || '';

export const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME || '';
export const R2_PUBLIC_BASE_URL = import.meta.env.VITE_R2_PUBLIC_BASE_URL || '';

// Log configuration status (without exposing keys)
if (!accountId || !accessKeyId || !secretAccessKey || !R2_BUCKET_NAME || !R2_PUBLIC_BASE_URL) {
  console.error('R2 Configuration is incomplete:', {
    hasAccountId: !!accountId,
    hasAccessKeyId: !!accessKeyId,
    hasSecretAccessKey: !!secretAccessKey,
    hasBucketName: !!R2_BUCKET_NAME,
    hasPublicBaseUrl: !!R2_PUBLIC_BASE_URL
  });
}

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const listR2Folder = async (folder: string): Promise<string[]> => {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET_NAME,
    Prefix: folder.endsWith('/') ? folder : `${folder}/`,
  });

  try {
    const response = await r2Client.send(command);
    if (!response.Contents) return [];
    
    return response.Contents
      .map(item => `${R2_PUBLIC_BASE_URL}/${item.Key}`)
      .filter(url => !url.endsWith('/'));
  } catch (error) {
    console.error(`Erro ao listar R2 (${folder}):`, error);
    return [];
  }
};

export const getBucketMetrics = async (): Promise<{ usedBytes: number; fileCount: number }> => {
  const command = new ListObjectsV2Command({
    Bucket: R2_BUCKET_NAME,
  });

  try {
    const response = await r2Client.send(command);
    if (!response.Contents) return { usedBytes: 0, fileCount: 0 };
    
    const usedBytes = response.Contents.reduce((acc, item) => acc + (item.Size || 0), 0);
    const fileCount = response.Contents.length;
    
    return { usedBytes, fileCount };
  } catch (error) {
    console.error('Erro ao obter métricas do R2:', error);
    return { usedBytes: 0, fileCount: 0 };
  }
};
