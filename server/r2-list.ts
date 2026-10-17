/**
 * Lista ficheiros numa pasta do R2.
 * GET /api/r2-list?folder=bancos
 * Sem autenticação (leitura pública de URLs).
 *
 * Na Cloudflare o bucket chega como binding (R2 → bucket "globalead", em
 * Settings → Bindings), por isso não há chaves S3 nesta função. Os URLs
 * devolvidos usam o endereço público do bucket (VITE_R2_PUBLIC_BASE_URL).
 */
import type { Env } from './og';

/** O pouco que usamos do binding do R2. */
export interface R2Bucket {
  list(options: { prefix: string; limit?: number }): Promise<{ objects: { key: string }[] }>;
}

export async function r2List(request: Request, env: Env & { R2?: R2Bucket }): Promise<Response> {
  const folder = new URL(request.url).searchParams.get('folder') || '';
  if (!folder) {
    return Response.json({ error: 'folder param required' }, { status: 400 });
  }
  if (!env.R2) {
    console.error('[r2-list] Falta o binding R2 do bucket');
    return Response.json({ error: 'Failed to list files' }, { status: 500 });
  }

  try {
    const { objects } = await env.R2.list({ prefix: folder.endsWith('/') ? folder : `${folder}/`, limit: 1000 });
    const baseUrl = env.R2_PUBLIC_BASE_URL || env.VITE_R2_PUBLIC_BASE_URL || '';
    const urls = objects.map((item) => `${baseUrl}/${item.key}`).filter((url) => !url.endsWith('/'));

    return Response.json(urls, { headers: { 'Cache-Control': 'public, max-age=300' } });
  } catch (err) {
    console.error('[r2-list] Erro:', err);
    return Response.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
