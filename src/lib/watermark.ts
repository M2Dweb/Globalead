/**
 * Marca de água "GLOBALEAD PORTUGAL" desenhada por cima das fotos dos imóveis.
 *
 * É aplicada no browser, no mesmo canvas que já comprime a imagem (ver
 * compressImage.ts), por isso fica gravada no próprio JPEG que vai para o R2.
 * Não há forma de a tirar depois sem voltar a carregar a foto original.
 *
 * Aspeto: texto centrado, branco semi-transparente com uma sombra suave para
 * se ler tanto em fundos claros como escuros. "GLOBALEAD" a bold e
 * "PORTUGAL" a peso normal, tal como nos exemplos de referência.
 */

const BOLD_PART = 'GLOBALEAD';
const REGULAR_PART = 'PORTUGAL';

/** Fração da largura da imagem que o texto deve ocupar. */
const TEXT_WIDTH_RATIO = 0.5;
/** Opacidade do texto (0–1). */
const OPACITY = 0.36;

// Fontes de sistema garantidas em Windows/Mac — a marca é gerada na máquina de
// quem carrega a foto, por isso não podemos depender de webfonts.
const FONT_FAMILY = '"Helvetica Neue", Helvetica, Arial, sans-serif';

interface Metrics {
  /** Largura de "GLOBALEAD " (com o espaço) a bold. */
  bold: number;
  /** Largura de "PORTUGAL" a peso normal. */
  regular: number;
  total: number;
}

const measure = (ctx: CanvasRenderingContext2D, fontSize: number): Metrics => {
  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
  const bold = ctx.measureText(`${BOLD_PART} `).width;
  ctx.font = `normal ${fontSize}px ${FONT_FAMILY}`;
  const regular = ctx.measureText(REGULAR_PART).width;
  return { bold, regular, total: bold + regular };
};

/**
 * Desenha a marca de água no canvas indicado, ao centro. O tamanho da letra é
 * calculado a partir da largura da imagem, por isso fica proporcional quer a
 * foto seja horizontal quer vertical.
 */
export const drawWatermark = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  ctx.save();

  // Espaçamento entre letras (só em browsers que o suportam — Chrome/Edge/Safari 17+).
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0.06em';
  }

  // Começa com um tamanho de referência e reescala para o texto ocupar
  // exatamente TEXT_WIDTH_RATIO da largura.
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
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = Math.max(2, fontSize * 0.08);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = Math.max(1, fontSize * 0.02);

  ctx.font = `bold ${fontSize}px ${FONT_FAMILY}`;
  ctx.fillText(`${BOLD_PART} `, x, y);

  ctx.font = `normal ${fontSize}px ${FONT_FAMILY}`;
  ctx.fillText(REGULAR_PART, x + m.bold, y);

  ctx.restore();
};
