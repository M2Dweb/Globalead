/**
 * Marca de água "GLOBALEAD PORTUGAL" desenhada por cima das fotos dos imóveis.
 *
 * É aplicada no browser, no mesmo canvas que já comprime a imagem (ver
 * compressImage.ts), por isso fica gravada no próprio JPEG que vai para o R2.
 * Não há forma de a tirar depois sem voltar a carregar a foto original.
 *
 * A marca é a imagem em /marca-de-agua.png (logótipo a branco sobre fundo
 * transparente, já recortado ao texto e com alpha normalizado — a opacidade
 * é decidida aqui, em OPACITY, e não no ficheiro). Se a imagem não carregar,
 * desenha-se o texto equivalente com fontes de sistema, para uma foto nunca
 * subir sem marca quando a opção está ligada.
 */

const IMAGE_URL = '/marca-de-agua.png';

/** Fração da largura da foto que a marca deve ocupar. */
const TEXT_WIDTH_RATIO = 0.5;
/** Opacidade da marca (0–1). */
const OPACITY = 0.36;

let imagePromise: Promise<HTMLImageElement | null> | null = null;

/** Carrega a imagem uma única vez; devolve null se falhar (fallback para texto). */
const loadImage = (): Promise<HTMLImageElement | null> => {
  if (!imagePromise) {
    imagePromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error('Marca de água: não foi possível carregar', IMAGE_URL);
        resolve(null);
      };
      img.src = IMAGE_URL;
    });
  }
  return imagePromise;
};

/** Sombra suave para a marca se ler tanto em fundos claros como escuros. */
const applyShadow = (ctx: CanvasRenderingContext2D, size: number) => {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = Math.max(2, size * 0.08);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(1, size * 0.02);
};

const drawImageWatermark = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) => {
  const drawW = width * TEXT_WIDTH_RATIO;
  const drawH = drawW * (img.naturalHeight / img.naturalWidth);
  const x = (width - drawW) / 2;
  const y = (height - drawH) / 2;

  ctx.save();
  ctx.globalAlpha = OPACITY;
  applyShadow(ctx, drawH);
  ctx.drawImage(img, x, y, drawW, drawH);
  ctx.restore();
};

// ---------------------------------------------------------------------------
// Fallback em texto — só usado se a imagem não carregar.
// ---------------------------------------------------------------------------

const BOLD_PART = 'GLOBALEAD';
const REGULAR_PART = 'PORTUGAL';
const FONT_FAMILY = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const measure = (ctx: CanvasRenderingContext2D, fontSize: number) => {
  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
  const bold = ctx.measureText(`${BOLD_PART} `).width;
  ctx.font = `normal ${fontSize}px ${FONT_FAMILY}`;
  const regular = ctx.measureText(REGULAR_PART).width;
  return { bold, regular, total: bold + regular };
};

const drawTextWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.save();

  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0.06em';
  }

  // Reescala a fonte para o texto ocupar exatamente TEXT_WIDTH_RATIO da largura.
  const targetWidth = width * TEXT_WIDTH_RATIO;
  const probe = measure(ctx, 100);
  const fontSize = Math.max(12, Math.round((100 * targetWidth) / probe.total));
  const m = measure(ctx, fontSize);

  const x = (width - m.total) / 2;
  const y = height / 2;

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.globalAlpha = OPACITY;
  ctx.fillStyle = '#ffffff';
  applyShadow(ctx, fontSize);

  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
  ctx.fillText(`${BOLD_PART} `, x, y);
  ctx.font = `normal ${fontSize}px ${FONT_FAMILY}`;
  ctx.fillText(REGULAR_PART, x + m.bold, y);

  ctx.restore();
};

/**
 * Desenha a marca de água no canvas indicado, ao centro. O tamanho é
 * proporcional à largura da foto, por isso funciona em horizontais e verticais.
 */
export const drawWatermark = async (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): Promise<void> => {
  const img = await loadImage();
  if (img) {
    drawImageWatermark(ctx, img, width, height);
  } else {
    drawTextWatermark(ctx, width, height);
  }
};
