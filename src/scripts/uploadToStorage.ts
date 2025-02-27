import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ltsbvdvnceqlavkdztfd.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c2J2ZHZuY2VxbGF2a2R6dGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU2MzkzMCwiZXhwIjoyMDU2MTM5OTMwfQ.LtbS1VV43Fb2MzPtbY84Xh7vgAAygW2I7wAJC8Omk-g';

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

async function fetchImageAsBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToStorage() {
  try {
    // 1. Get all flashcards
    console.log('Fetching flashcards...');
    const { data: flashcards, error: fetchError } = await supabase
      .from('flashcards')
      .select('*');

    if (fetchError) throw fetchError;
    if (!flashcards) throw new Error('No flashcards found');

    console.log(`Found ${flashcards.length} flashcards`);

    // 2. Process each flashcard
    for (const flashcard of flashcards) {
      try {
        console.log(`\nProcessing: ${flashcard.word} (ID: ${flashcard.id})`);
        
        // Generate a unique filename
        const filename = `${flashcard.id}-${flashcard.word.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        
        // Fetch the image
        console.log('Fetching image...');
        const imageBuffer = await fetchImageAsBuffer(flashcard.image_url);
        
        // Upload to Supabase Storage
        console.log('Uploading to Supabase Storage...');
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

        // Update the database with the new URL
        console.log('Updating database...');
        const { error: updateError } = await supabase
          .from('flashcards')
          .update({ image_url: publicUrl })
          .eq('id', flashcard.id);

        if (updateError) throw updateError;

        console.log(`✓ Successfully processed ${flashcard.word}`);
        
        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to process ${flashcard.word}:`, error);
      }
    }

    console.log('\nAll images have been processed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the upload script
uploadToStorage();