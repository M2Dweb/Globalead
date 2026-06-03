/**
 * Acesso ao R2 via Netlify Functions (lado do servidor).
 * As chaves secretas vivem APENAS no servidor — nunca neste ficheiro.
 * A única variável pública aqui é o URL base das imagens (não é segredo).
 */

export const R2_PUBLIC_BASE_URL = import.meta.env.VITE_R2_PUBLIC_BASE_URL || '';

// Não existe mais R2_BUCKET_NAME, r2Client, nem credenciais no cliente.
// Para compatibilidade com código que importava R2_BUCKET_NAME:
export const R2_BUCKET_NAME = '';

/**
 * Lista ficheiros numa pasta do R2.
 * Chama a Netlify Function r2-list (credenciais ficam no servidor).
 */
export const listR2Folder = async (folder: string): Promise<string[]> => {
  try {
    const res = await fetch(`/.netlify/functions/r2-list?folder=${encodeURIComponent(folder)}`);
    if (!res.ok) {
      console.error(`r2-list HTTP ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.error('listR2Folder error:', err);
    return [];
  }
};

/**
 * Devolve métricas de storage do bucket.
 * Chama a Netlify Function r2-metrics.
 */
export const getBucketMetrics = async (): Promise<{ usedBytes: number; fileCount: number }> => {
  try {
    const res = await fetch('/.netlify/functions/r2-metrics');
    if (!res.ok) {
      console.error(`r2-metrics HTTP ${res.status}`);
      return { usedBytes: 0, fileCount: 0 };
    }
    return await res.json();
  } catch (err) {
    console.error('getBucketMetrics error:', err);
    return { usedBytes: 0, fileCount: 0 };
  }
};
