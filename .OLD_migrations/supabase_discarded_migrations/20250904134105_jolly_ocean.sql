/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `category` (text)
      - `date` (date)
      - `author` (text)
      - `image` (text)
      - `read_time` (text)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text DEFAULT '',
  excerpt text DEFAULT '',
  category text DEFAULT 'imoveis',
  date date DEFAULT CURRENT_DATE,
  author text DEFAULT 'Globalead Portugal',
  image text DEFAULT '',
  read_time text DEFAULT '5 min'
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO blog_posts (title, content, excerpt, category, date, author, image, read_time) VALUES
('Garantia pública sobe risco de incumprimento (e tende a elevar juros)', 'A garantia pública para crédito à habitação de jovens, que permite financiamento a 100%, já está em vigor, mas só deverá estar operacional no final do ano. O Banco de Portugal alerta para a necessidade de cautela na adesão, destacando o aumento do risco de incumprimento por parte dos jovens e o possível impacto nas taxas de juro. Esta medida, embora benéfica para facilitar o acesso à habitação, levanta questões sobre a sustentabilidade do mercado imobiliário e a estabilidade financeira dos jovens compradores.', 'A garantia pública para crédito à habitação de jovens, que permite financiamento a 100%, já está em vigor, mas só deverá estar operacional no final do ano. O Banco de Portugal alerta para a necessidade de cautela na adesão...', 'credito', '2025-01-06', 'Globalead Portugal', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400', '6 min'),
('Como organizar a casa no inverno: dicas para ter tudo à mão', 'Manter a casa organizada no inverno pode ser simples e rápido, proporcionando mais conforto e momentos de relaxamento. Apesar da rotina agitada, envolver toda a família nas tarefas domésticas, especialmente aproveitando o espírito natalício, torna a organização mais fácil e agradável. Uma casa limpa, arrumada e aconchegante cria o ambiente perfeito para desfrutar do inverno em família.', 'Manter a casa organizada no inverno pode ser simples e rápido, proporcionando mais conforto e momentos de relaxamento. Apesar da rotina agitada, envolver toda a família nas tarefas domésticas...', 'imoveis', '2025-01-06', 'Globalead Portugal', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400', '4 min'),
('Mercado de casas de luxo em Lisboa vai aumentar 4,5%', 'Lisboa reforça a sua posição como destino de destaque no mercado imobiliário de luxo, ocupando o 4º lugar no ranking das cidades europeias com maior potencial de valorização em 2025. De acordo com o relatório "2025 European Prime Price Forecast", da consultora imobiliária Knight Frank, os preços das casas de luxo na capital portuguesa deverão crescer 4,5% este ano.', 'Lisboa reforça a sua posição como destino de destaque no mercado imobiliário de luxo, ocupando o 4º lugar no ranking das cidades europeias com maior potencial de valorização em 2025...', 'imoveis', '2025-01-05', 'Globalead Portugal', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400', '5 min'),
('Novos sistemas de seguros para 2025', 'O mercado de seguros em Portugal está em constante evolução, com novas soluções digitais e coberturas mais abrangentes. As seguradoras apostam em tecnologia para melhorar a experiência do cliente e oferecer produtos mais personalizados.', 'O mercado de seguros em Portugal está em constante evolução, com novas soluções digitais e coberturas mais abrangentes...', 'seguros', '2025-01-04', 'Globalead Portugal', 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400', '3 min'),
('Certificação energética: novas regras em 2025', 'As novas regulamentações para certificação energética entram em vigor este ano, trazendo mudanças importantes para proprietários e inquilinos. Saiba como estas alterações podem afetar o seu imóvel.', 'As novas regulamentações para certificação energética entram em vigor este ano, trazendo mudanças importantes para proprietários e inquilinos...', 'certificacao', '2025-01-03', 'Globalead Portugal', 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=400', '4 min');