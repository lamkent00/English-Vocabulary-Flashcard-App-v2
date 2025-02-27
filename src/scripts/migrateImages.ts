import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ltsbvdvnceqlavkdztfd.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c2J2ZHZuY2VxbGF2a2R6dGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU2MzkzMCwiZXhwIjoyMDU2MTM5OTMwfQ.LtbS1VV43Fb2MzPtbY84Xh7vgAAygW2I7wAJC8Omk-g';

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

type Flashcard = Database['public']['Tables']['flashcards']['Row'];

async function fetchImageAsBuffer(url: string): Promise<Buffer> {
  try {
    console.log(`Fetching image from: ${url}`);
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) }); // Timeout 10s
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${url} (Status: ${response.status} - ${response.statusText})`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`Error fetching image from ${url}:`, error.message);
    throw error;
  }
}

async function migrateImages() {
  try {
    // 1. Get all flashcards and their image URLs
    console.log('Fetching all flashcards from database...');
    const { data: flashcards, error: fetchError } = await supabase
      .from('flashcards')
      .select('id, word, image_url');

    if (fetchError) throw fetchError;
    if (!flashcards || flashcards.length === 0) {
      throw new Error('No flashcards found in the database');
    }

    console.log(`Found ${flashcards.length} flashcards with images to process`);
    
    // 2. Print statistics about image URLs
    const urlDomains = new Map<string, number>();
    flashcards.forEach(card => {
      try {
        const url = new URL(card.image_url);
        const domain = url.hostname;
        urlDomains.set(domain, (urlDomains.get(domain) || 0) + 1);
      } catch (e) {
        urlDomains.set('invalid-url', (urlDomains.get('invalid-url') || 0) + 1);
      }
    });

    console.log('\nImage URL Statistics:');
    console.log('---------------------');
    for (const [domain, count] of urlDomains.entries()) {
      console.log(`${domain}: ${count} images`);
    }
    console.log('---------------------\n');

    // 3. Process each flashcard
    console.log('Starting image migration process...');
    let successCount = 0;
    let failureCount = 0;
    let skippedCount = 0;

    for (const flashcard of flashcards) {
      try {
        console.log(`\nProcessing: ${flashcard.word} (ID: ${flashcard.id})`);
        
        // Skip if the image URL is already from Supabase storage
        if (flashcard.image_url.includes('supabase.co/storage')) {
          console.log(`Skipping: Image is already in Supabase storage`);
          skippedCount++;
          continue;
        }
        
        // Generate a unique filename
        const filename = `${flashcard.id}-${flashcard.word.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        
        // Fetch the image
        console.log(`Downloading image...`);
        const imageBuffer = await fetchImageAsBuffer(flashcard.image_url);
        console.log(`Downloaded ${imageBuffer.length} bytes`);
        
        // Upload to Supabase Storage
        console.log(`Uploading to Supabase Storage bucket 'flashcard_images'...`);
        const { error: uploadError } = await supabase.storage
          .from('flashcard_images')
          .upload(filename, imageBuffer, {
            contentType: 'image/jpeg',
            upsert: true
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('flashcard_images')
          .getPublicUrl(filename);

        console.log(`New public URL: ${publicUrl}`);

        // Update the database with the new URL
        console.log(`Updating database record...`);
        const { error: updateError } = await supabase
          .from('flashcards')
          .update({ bucket_url: publicUrl })
          .eq('id', flashcard.id);

        if (updateError) throw updateError;

        console.log(`✅ Successfully processed ${flashcard.word}`);
        successCount++;
        
        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Failed to process ${flashcard.word}:`, error);
        failureCount++;
      }
    }

    console.log('\n=== Migration Summary ===');
    console.log(`Total flashcards: ${flashcards.length}`);
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log(`Skipped (already in storage): ${skippedCount}`);
    console.log('========================');
    
  } catch (error) {
    console.error('Error during migration process:', error);
  }
}

// Run the migration script
migrateImages();