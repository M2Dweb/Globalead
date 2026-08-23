-- Visibilidade do anúncio no site público.
--
-- Separada do `availability_status` de propósito: esse descreve o estado de
-- venda (disponível / reservado / vendido) e um imóvel vendido CONTINUA no
-- site, com a etiqueta. Este campo responde a outra pergunta — "isto aparece
-- no site?" — e permite esconder e voltar a mostrar um anúncio sem o apagar.
--
-- DEFAULT true + NOT NULL: todos os imóveis que já existem ficam publicados,
-- por isso correr esta migração não muda nada do que está online hoje.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN properties.is_published IS
  'false = escondido do site público (catálogo, destaques, pesquisa, sitemap e OG). Continua visível e editável no /admin.';

-- O catálogo e os destaques filtram sempre por esta coluna.
CREATE INDEX IF NOT EXISTS properties_is_published_idx
  ON properties (is_published);
