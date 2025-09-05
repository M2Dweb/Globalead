/*
  # Create properties table

  1. New Tables
    - `properties`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `area` (integer)
      - `location` (text)
      - `type` (text)
      - `energy_class` (text)
      - `year_built` (integer)
      - `features` (text array)
      - `images` (text array)

  2. Security
    - Enable RLS on `properties` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL,
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area integer DEFAULT 0,
  location text DEFAULT '',
  type text DEFAULT 'apartamento',
  energy_class text DEFAULT 'B',
  year_built integer DEFAULT 2024,
  features text[] DEFAULT '{}',
  images text[] DEFAULT '{}'
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are viewable by everyone"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO properties (title, description, price, bedrooms, bathrooms, area, location, type, energy_class, year_built, features, images) VALUES
('Empreendimento Vila Nova', 'Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente, o que lhe configurará uma imagem de modernidade e simultaneamente de robustez.', 450000, 3, 3, 238, 'Aldoar, Porto', 'moradia', 'B', 2024, '{"Garagem para 2 carros", "Jardim privativo", "Cozinha equipada", "Ar condicionado"}', '{"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"}'),
('Apartamento T2 Moderno', 'Apartamento completamente renovado com acabamentos de luxo, localizado numa zona premium da cidade.', 280000, 2, 1, 85, 'Cedofeita, Porto', 'apartamento', 'A', 2023, '{"Cozinha equipada", "Ar condicionado", "Varanda"}', '{"https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"}'),
('Moradia T4 com Jardim', 'Moradia espaçosa com jardim privativo, garagem para 2 carros e excelente exposição solar.', 520000, 4, 3, 200, 'Matosinhos, Porto', 'moradia', 'A+', 2024, '{"Jardim privativo", "Garagem para 2 carros", "Piscina", "Alarme"}', '{"https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"}');