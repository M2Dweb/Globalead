/**
 * Imagens de um imóvel, já com a "Foto de Capa" em primeiro lugar.
 *
 * O campo `cover_image` é gravado pelo /admin numa pasta própria
 * (`properties/covers/`), por isso normalmente NÃO faz parte de `images`.
 * Antes disto o site mostrava sempre `images[0]`, e a capa escolhida no painel
 * nunca chegava a aparecer — nem nos cartões, nem na página do imóvel, nem na
 * pré-visualização das partilhas (WhatsApp, Facebook, ...).
 */
export const getPropertyImages = (property: any): string[] => {
  const images: string[] = Array.isArray(property?.images)
    ? property.images.filter(Boolean)
    : [property?.images].filter(Boolean);

  const cover =
    typeof property?.cover_image === 'string' ? property.cover_image.trim() : '';

  if (!cover) return images;

  // Se a capa também estiver na galeria, apenas a promovemos à 1ª posição
  // (não queremos a mesma foto duas vezes).
  return [cover, ...images.filter((img) => img !== cover)];
};

/** Imagem principal do imóvel: a capa definida no /admin ou, na falta dela, a 1ª foto. */
export const getPropertyCover = (property: any): string | undefined =>
  getPropertyImages(property)[0];
