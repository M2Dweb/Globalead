/**
 * Compressão/redimensionamento de imagens no browser antes do upload para o R2.
 *
 * Porquê: as imagens originais das máquinas/telemóveis têm vários MB (2–10MB+).
 * Servidas em tamanho real, tornam o site muito lento. Aqui reduzimos a
 * dimensão máxima e recomprimimos para JPEG de qualidade alta, ficando
 * tipicamente em 150–500KB sem perda visível de qualidade.
 *
 * Só afeta imagens — vídeos e outros ficheiros passam ao lado.
 *
 * Opcionalmente desenha a marca de água "GLOBALEAD PORTUGAL" no mesmo canvas
 * (ver watermark.ts), para não haver uma segunda codificação JPEG.
 */

import { drawWatermark } from './watermark';

interface CompressOptions {
  /** Maior lado da imagem, em pixéis (default 1920). */
  maxDimension?: number;
  /** Qualidade JPEG 0–1 (default 0.82). */
  quality?: number;
  /** Grava a marca de água "GLOBALEAD PORTUGAL" por cima da imagem (default false). */
  watermark?: boolean;
}

export const compressImage = async (
  file: File,
  { maxDimension = 1920, quality = 0.82, watermark = false }: CompressOptions = {}
): Promise<File> => {
  // Só comprime imagens rasterizadas. SVG/GIF ou não-imagens passam intactos.
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;

    const scale = Math.min(1, maxDimension / Math.max(width, height));
    const targetW = Math.round(width * scale);
    const targetH = Math.round(height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, targetW, targetH);
    bitmap.close?.();

    if (watermark) {
      await drawWatermark(ctx, targetW, targetH);
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );

    if (!blob) {
      return file;
    }

    // Se o resultado ficar maior, mantém o original — exceto com marca de
    // água, em que o ficheiro gerado é obrigatoriamente o que tem de subir.
    if (!watermark && blob.size >= file.size) {
      return file;
    }

    const newName = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], newName, { type: 'image/jpeg', lastModified: Date.now() });
  } catch (err) {
    console.error('compressImage falhou, a usar original:', err);
    return file;
  }
};
