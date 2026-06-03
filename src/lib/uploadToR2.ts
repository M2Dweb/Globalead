/**
 * Upload seguro para o R2 via URL pré-assinado.
 *
 * Fluxo:
 * 1. Pede ao servidor (r2-presign) um URL temporário de PUT (válido 5 min).
 * 2. O browser envia o ficheiro diretamente para o R2 usando esse URL.
 * 3. As credenciais nunca passam pelo browser.
 */

export const uploadToR2 = async (
  file: File | Blob,
  path: string,
  adminPassword: string = ''
): Promise<{ url: string; key: string }> => {
  // 1. Obter URL pré-assinado
  const presignRes = await fetch('/.netlify/functions/r2-presign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path,
      contentType: file.type || 'application/octet-stream',
      password: adminPassword,
    }),
  });

  if (!presignRes.ok) {
    const err = await presignRes.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `r2-presign failed: ${presignRes.status}`);
  }

  const { presignedUrl, publicUrl, key } = await presignRes.json();

  // 2. Upload direto para o R2
  const uploadRes = await fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error(`Upload para R2 falhou: ${uploadRes.status}`);
  }

  return { url: publicUrl, key };
};
