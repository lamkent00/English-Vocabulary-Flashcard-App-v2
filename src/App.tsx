import React, { useState, useEffect } from 'react';
import { FlashcardDeck } from './components/FlashcardDeck';
import { Quiz } from './components/Quiz';
import { supabase } from './lib/supabase';
import type { Database } from './types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];
type Flashcard = Database['public']['Tables']['flashcards']['Row'];

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'flashcards' | 'quiz'>('flashcards');

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;

        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadFlashcards() {
      if (!selectedCategory) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('flashcards')
          .select('*')
          .eq('category_id', selectedCategory)
          .order('id');

        if (error) throw error;

        setFlashcards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load flashcards');
      } finally {
        setLoading(false);
      }
    }

    loadFlashcards();
  }, [selectedCategory]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto pt-8 px-4">
        {/* Header with Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setMode('flashcards')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'flashcards'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'quiz'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : mode === 'flashcards' ? (
          <FlashcardDeck flashcards={flashcards} />
        ) : (
          selectedCategory && <Quiz categoryId={selectedCategory} />
        )}
      </div>
    </div>
  );
}

export default App;