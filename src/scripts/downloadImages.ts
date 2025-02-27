import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Read environment variables directly from .env file
const supabaseUrl = 'https://ltsbvdvnceqlavkdztfd.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c2J2ZHZuY2VxbGF2a2R6dGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU2MzkzMCwiZXhwIjoyMDU2MTM5OTMwfQ.LtbS1VV43Fb2MzPtbY84Xh7vgAAygW2I7wAJC8Omk-g';

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

type Flashcard = Database['public']['Tables']['flashcards']['Row'];

async function downloadImage(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    
    const buffer = await response.arrayBuffer();
    await fs.writeFile(filename, Buffer.from(buffer));
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    throw error;
  }
}

async function downloadAllImages() {
  try {
    // Create images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'flashcards');
    await fs.mkdir(imagesDir, { recursive: true });

    // Fetch all flashcards
    const { data: flashcards, error } = await supabase
      .from('flashcards')
      .select('*');

    if (error) throw error;
    if (!flashcards) throw new Error('No flashcards found');

    console.log(`Found ${flashcards.length} flashcards. Starting download...`);

    // Process each flashcard
    for (const flashcard of flashcards) {
      const imageUrl = flashcard.image_url;
      if (!imageUrl.includes('unsplash.com')) {
        console.log(`Skipping ${flashcard.word} - not an Unsplash image`);
        continue;
      }

      const filename = `${flashcard.id}-${flashcard.word.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      const imagePath = path.join(imagesDir, filename);
      const publicUrl = `/images/flashcards/${filename}`;

      try {
        console.log(`Downloading image for ${flashcard.word}...`);
        await downloadImage(imageUrl, imagePath);

        // Update database with new URL
        const { error: updateError } = await supabase
          .from('flashcards')
          .update({ image_url: publicUrl })
          .eq('id', flashcard.id);

        if (updateError) throw updateError;

        console.log(`✓ Successfully processed ${flashcard.word}`);
      } catch (error) {
        console.error(`Failed to process ${flashcard.word}:`, error);
      }

      // Add a small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Image download and database update complete!');
  } catch (error) {
    console.error('Failed to process images:', error);
  }
}

// Run the download script
downloadAllImages();