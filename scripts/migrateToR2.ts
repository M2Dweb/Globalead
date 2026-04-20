import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Needs service role for better access

const accountId = process.env.VITE_CLOUDFLARE_ACCOUNT_ID || '';
const accessKeyId = process.env.VITE_R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.VITE_R2_SECRET_ACCESS_KEY || '';
const bucketName = process.env.VITE_R2_BUCKET_NAME || '';
const publicBaseUrl = process.env.VITE_R2_PUBLIC_BASE_URL || '';

if (!supabaseUrl || !supabaseServiceKey || !accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.error('Missing environment variables. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadToR2(url: string, path: string): Promise<string | null> {
  try {
    if (!url || !url.includes('supabase.co/storage/v1/object/public/')) {
      return null;
    }

    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    console.log(`Uploading to R2: ${path}`);
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: path,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);
    return `${publicBaseUrl}/${path}`;
  } catch (error) {
    console.error(`Error migrating ${url}:`, error);
    return null;
  }
}

async function migrateProperties() {
  console.log('Migrating Properties...');
  const { data: properties, error } = await supabase.from('properties').select('*');
  
  if (error) {
    console.error('Error fetching properties:', error);
    return;
  }

  for (const prop of properties) {
    console.log(`Processing Property: ${prop.title} (${prop.id})`);
    const updates: any = {};

    // 1. Cover Image
    if (prop.cover_image && prop.cover_image.includes('supabase.co')) {
      const path = `properties/covers/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      const newUrl = await uploadToR2(prop.cover_image, path);
      if (newUrl) {
        updates.cover_image = newUrl;
        updates.image_url = newUrl;
        updates.image_key = path;
      }
    }

    // 2. Images Array
    if (prop.images && Array.isArray(prop.images)) {
      const newImages = [];
      let changed = false;
      for (let i = 0; i < prop.images.length; i++) {
        const img = prop.images[i];
        if (img && img.includes('supabase.co')) {
          const path = `properties/${Date.now()}_${i}_${Math.random().toString(36).substring(7)}.jpg`;
          const newUrl = await uploadToR2(img, path);
          if (newUrl) {
            newImages.push(newUrl);
            changed = true;
          } else {
            newImages.push(img);
          }
        } else {
          newImages.push(img);
        }
      }
      if (changed) {
        updates.images = newImages;
      }
    }

    // 3. Property Types (Floor Plans)
    if (prop.property_types && Array.isArray(prop.property_types)) {
      let changed = false;
      const newPT = prop.property_types.map(async (pt: any) => {
        if (pt.floor_plan && pt.floor_plan.includes('supabase.co')) {
          const path = `floor-plans/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
          const newUrl = await uploadToR2(pt.floor_plan, path);
          if (newUrl) {
            changed = true;
            return { ...pt, floor_plan: newUrl };
          }
        }
        return pt;
      });
      
      if (changed) {
        updates.property_types = await Promise.all(newPT);
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', prop.id);
      
      if (updateError) {
        console.error(`Error updating property ${prop.id}:`, updateError);
      } else {
        console.log(`Property ${prop.id} updated successfully.`);
      }
    }
  }
}

async function migrateBlogPosts() {
  console.log('Migrating Blog Posts...');
  const { data: posts, error } = await supabase.from('blog_posts').select('*');
  
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  for (const post of posts) {
    console.log(`Processing Blog Post: ${post.title} (${post.id})`);
    const updates: any = {};

    if (post.image && post.image.includes('supabase.co')) {
      const path = `blog/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
      const newUrl = await uploadToR2(post.image, path);
      if (newUrl) {
        updates.image = newUrl;
        updates.image_url = newUrl;
        updates.image_key = path;
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', post.id);
      
      if (updateError) {
        console.error(`Error updating post ${post.id}:`, updateError);
      } else {
        console.log(`Post ${post.id} updated successfully.`);
      }
    }
  }
}

async function migrateLogos(folder: string) {
  console.log(`Migrating logos from folder: ${folder}...`);
  const { data: files, error } = await supabase.storage.from('imagens').list(folder);

  if (error) {
    console.error(`Error listing folder ${folder}:`, error);
    return;
  }

  for (const file of files) {
    if (file.name.startsWith('.') || file.name === '.emptyFolderPlaceholder') continue;
    
    const supabaseUrl = `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/imagens/${folder}/${file.name}`;
    const r2Path = `${folder}/${file.name}`;
    
    await uploadToR2(supabaseUrl, r2Path);
  }
}

async function main() {
  await migrateProperties();
  await migrateBlogPosts();
  await migrateLogos('bancos');
  await migrateLogos('seguros');
  await migrateLogos('patrocinios');
  await migrateLogos('videos');
  console.log('Migration completed!');
}

main().catch(console.error);
