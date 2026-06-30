-- Capa (poster) do vídeo do imóvel — imagem mostrada antes de dar play
ALTER TABLE properties ADD COLUMN IF NOT EXISTS video_poster text;
