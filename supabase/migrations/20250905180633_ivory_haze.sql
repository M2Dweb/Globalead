/*
  # Update properties table with new fields

  1. New Columns
    - `property_types` (jsonb) - For development property types (T1, T2, etc.)
    - `floor_plans` (text[]) - Array of floor plan image URLs
    - `state` (text) - Property state (Novo, Usado, etc.)
    - `parking` (integer) - Number of parking spaces
    - `reference` (text) - Property reference code

  2. Updates
    - Add default values for existing properties
*/

-- Add new columns to properties table
DO $$
BEGIN
  -- Add property_types column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'property_types'
  ) THEN
    ALTER TABLE properties ADD COLUMN property_types jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add floor_plans column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'floor_plans'
  ) THEN
    ALTER TABLE properties ADD COLUMN floor_plans text[] DEFAULT '{}';
  END IF;

  -- Add state column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'state'
  ) THEN
    ALTER TABLE properties ADD COLUMN state text DEFAULT 'Novo';
  END IF;

  -- Add parking column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'parking'
  ) THEN
    ALTER TABLE properties ADD COLUMN parking integer DEFAULT 0;
  END IF;

  -- Add reference column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties' AND column_name = 'reference'
  ) THEN
    ALTER TABLE properties ADD COLUMN reference text DEFAULT '';
  END IF;
END $$;

-- Insert sample development property
INSERT INTO properties (
  title,
  description,
  price,
  bedrooms,
  bathrooms,
  area,
  location,
  type,
  energy_class,
  year_built,
  features,
  images,
  property_types,
  state,
  parking,
  reference
) VALUES (
  'Empreendimento Noval Park',
  'O empreendimento Novel Park nasce em Vila Nova de Gaia, junto ao Monte da Virgem, numa das zonas mais elevadas e tranquilas da cidade. Implantado nos terrenos da Quinta do Cravel, o projeto usufrui de uma envolvente natural privilegiada, ao mesmo tempo que garante proximidade ao centro urbano e à ampla rede de serviços e acessos, tornando-se uma opção ideal para quem procura viver com equilíbrio entre natureza e comodidade.',
  432600,
  3,
  2,
  145,
  'Vila Nova de Gaia',
  'empreendimento',
  'NA',
  2025,
  ARRAY['Garagem para 3 carros', 'Jardim privativo', 'Cozinha equipada', 'Ar condicionado', 'Aquecimento central'],
  ARRAY[
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ],
  '[
    {
      "name": "T1",
      "area": 70,
      "price": 218000,
      "garage": "C/Garagem",
      "floor_plan": "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      "name": "T2A",
      "area": 100,
      "price": 298700,
      "garage": "C/Garagem p/ 2 lugares",
      "floor_plan": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      "name": "T2B",
      "area": 118,
      "price": 350200,
      "garage": "C/Garagem p/ 2 lugares",
      "floor_plan": "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      "name": "T3",
      "area": 145,
      "price": 432600,
      "garage": "C/Garagem p/ 3 lugares",
      "floor_plan": "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]'::jsonb,
  'Novo',
  3,
  'T3NPVNG'
) ON CONFLICT DO NOTHING;