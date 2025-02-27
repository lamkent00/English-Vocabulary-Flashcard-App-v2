import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://ltsbvdvnceqlavkdztfd.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0c2J2ZHZuY2VxbGF2a2R6dGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDU2MzkzMCwiZXhwIjoyMDU2MTM5OTMwfQ.LtbS1VV43Fb2MzPtbY84Xh7vgAAygW2I7wAJC8Omk-g';

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

interface FlashcardDuplicate {
  id: number;
  image_url: string;
}

async function updateFlashcardsFromDuplicate() {
  try {
    console.log('Starting the update process...');

    // 1. Fetch data from flashcards_duplicate table
    console.log('Fetching data from flashcards_duplicate table...');
    const { data: duplicateData, error: duplicateError } = await supabase
      .from('flashcards_duplicate')
      .select('id, image_url');

    if (duplicateError) {
      throw new Error(`Error fetching from flashcards_duplicate: ${duplicateError.message}`);
    }

    if (!duplicateData || duplicateData.length === 0) {
      throw new Error('No data found in flashcards_duplicate table');
    }

    console.log(`Found ${duplicateData.length} records in flashcards_duplicate table`);

    // 2. Process each record
    let successCount = 0;
    let failureCount = 0;

    for (const duplicate of duplicateData) {
      try {
        console.log(`\nProcessing flashcard ID: ${duplicate.id}`);
        
        // Generate the expected bucket URL based on ID and word
        // First, get the word from the flashcards table
        const { data: flashcardData, error: flashcardError } = await supabase
          .from('flashcards')
          .select('word')
          .eq('id', duplicate.id)
          .single();
        
        if (flashcardError) {
          throw new Error(`Error fetching flashcard word: ${flashcardError.message}`);
        }
        
        if (!flashcardData) {
          throw new Error(`No matching flashcard found with ID: ${duplicate.id}`);
        }
        
        const word = flashcardData.word;
        const filename = `${duplicate.id}-${word.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        
        // Get the public URL from Supabase storage
        const { data: { publicUrl } } = supabase.storage
          .from('flashcard_images')
          .getPublicUrl(filename);
        
        console.log(`Original image_url: ${duplicate.image_url}`);
        console.log(`Bucket URL: ${publicUrl}`);
        
        // 3. Update the flashcards table
        const { error: updateError } = await supabase
          .from('flashcards')
          .update({ 
            image_url: duplicate.image_url,
            bucket_url: publicUrl 
          })
          .eq('id', duplicate.id);
        
        if (updateError) {
          throw new Error(`Error updating flashcard: ${updateError.message}`);
        }
        
        console.log(`✅ Successfully updated flashcard ID: ${duplicate.id}`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Failed to update flashcard ID ${duplicate.id}:`, error.message);
        failureCount++;
      }
      
      // Add a small delay between operations
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 4. Print summary
    console.log('\n=== Update Summary ===');
    console.log(`Total records processed: ${duplicateData.length}`);
    console.log(`Successfully updated: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log('======================');
    
  } catch (error) {
    console.error('Error during update process:', error.message);
  }
}

// Run the update script
updateFlashcardsFromDuplicate();