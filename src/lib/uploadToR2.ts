import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_BASE_URL } from './r2';

export const uploadToR2 = async (file: File | Blob, path: string): Promise<{ url: string; key: string }> => {
  const fileArrayBuffer = await file.arrayBuffer();
  const fileBuffer = new Uint8Array(fileArrayBuffer);

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: path,
    Body: fileBuffer,
    ContentType: file.type || 'application/octet-stream',
  });

  await r2Client.send(command);

  return {
    url: `${R2_PUBLIC_BASE_URL}/${path}`,
    key: path
  };
};
