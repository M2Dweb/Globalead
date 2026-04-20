import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  const { data: prop } = await supabase.from('properties').select('title, cover_image, images').limit(1);
  console.log('--- Property Example ---');
  console.log(JSON.stringify(prop, null, 2));

  const { data: post } = await supabase.from('blog_posts').select('title, image').limit(1);
  console.log('\n--- Blog Post Example ---');
  console.log(JSON.stringify(post, null, 2));
}

check().catch(console.error);
