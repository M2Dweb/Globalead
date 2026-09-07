-- Conteúdo dos imóveis e dos artigos noutros idiomas.
--
-- Uma única coluna JSONB em vez de title_en, description_en, excerpt_en,
-- content_en... A forma é:
--
--   { "en": { "title": "...", "description": "...", "features": ["..."] } }
--
-- Acrescentar espanhol no futuro é escrever "es" ao lado de "en" — sem nova
-- migração, sem sete colunas por tabela e por idioma.
--
-- O português continua nas colunas originais e é sempre a versão de
-- referência. Um campo em falta ou vazio na tradução cai automaticamente no
-- português (ver src/lib/translations.ts), por isso publicar um imóvel sem o
-- traduzir continua a funcionar exatamente como hoje.
--
-- NOT NULL DEFAULT '{}': as linhas que já existem ficam com um objeto vazio,
-- por isso correr esta migração não muda nada do que está online.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN properties.translations IS
  'Traducoes por idioma: {"en": {"title", "description", "features"}}. Campo ausente ou vazio = usa a coluna portuguesa.';

COMMENT ON COLUMN blog_posts.translations IS
  'Traducoes por idioma: {"en": {"title", "excerpt", "content"}}. Campo ausente ou vazio = usa a coluna portuguesa.';
