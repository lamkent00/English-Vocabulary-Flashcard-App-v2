import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, VolumeX, Image, Type } from 'lucide-react';
import type { Database } from '../types/supabase';

type Flashcard = Database['public']['Tables']['flashcards']['Row'];

interface FlashcardDeckProps {
  flashcards: Flashcard[];
}

export function FlashcardDeck({ flashcards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Reset states when flashcards change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsImageLoading(true);
    setAudioError(false);
  }, [flashcards]);

  // Reset audio error state when changing cards
  useEffect(() => {
    setAudioError(false);
  }, [currentIndex]);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
    setIsImageLoading(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
    setIsImageLoading(true);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    if (audioRef.current && !isImageLoading && !audioError) {
      audioRef.current.play().catch(() => {
        setAudioError(true);
      });
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleAudioError = () => {
    setAudioError(true);
  };

  const toggleDisplayMode = () => {
    setShowImage(!showImage);
    setIsFlipped(false);
  };

  // Get the appropriate image URL (prefer bucket_url if available)
  const getImageUrl = (card: Flashcard) => {
    return card.bucket_url || card.image_url;
  };

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">No flashcards available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl">
      <div className="w-full">
        {/* Header with Progress and Display Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentIndex + 1} / {flashcards.length}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Display Mode Toggle */}
          <button
            onClick={toggleDisplayMode}
            className={`ml-4 p-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
              showImage ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
            }`}
            title={showImage ? 'Switch to text mode' : 'Switch to image mode'}
          >
            {showImage ? (
              <Image size={24} className="text-white" />
            ) : (
              <Type size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Flashcard */}
        <div
          className="relative perspective-1000 cursor-pointer mb-8"
          onClick={handleFlip}
        >
          <div
            className={`relative w-full transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front of card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 backface-hidden">
              {showImage ? (
                <>
                  <div className="aspect-video mb-6 overflow-hidden rounded-lg relative">
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      </div>
                    )}
                    <img
                      src={getImageUrl(currentCard)}
                      alt={currentCard.word}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImageLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      onLoad={handleImageLoad}
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {currentCard.word}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {currentCard.pronunciation}
                    </p>
                  </div>
                </>
              ) : (
                <div className="min-h-[300px] flex flex-col items-center justify-center">
                  <h2 className="text-5xl font-bold text-gray-800 mb-4">
                    {currentCard.word}
                  </h2>
                  <p className="text-2xl text-gray-600 mb-6">
                    {currentCard.pronunciation}
                  </p>
                  <p className="text-xl text-gray-700 text-center">
                    {currentCard.meaning}
                  </p>
                </div>
              )}
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl p-6 backface-hidden rotate-y-180">
              {showImage ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-xl text-gray-700 text-center">
                    {currentCard.meaning}
                  </p>
                </div>
              ) : (
                <div className="aspect-video overflow-hidden rounded-lg relative">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                  )}
                  <img
                    src={getImageUrl(currentCard)}
                    alt={currentCard.word}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={handleImageLoad}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrevious}
            className="px-6 py-2 bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <button
            onClick={playAudio}
            disabled={isImageLoading || audioError}
            className={`p-3 rounded-full shadow-md transition-colors ${
              isImageLoading || audioError
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title={audioError ? 'Audio not available' : 'Play pronunciation'}
          >
            {audioError ? (
              <VolumeX size={24} className="text-gray-500" />
            ) : (
              <Volume2 size={24} className={isImageLoading ? 'text-gray-500' : 'text-white'} />
            )}
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentCard.audio_url} 
        onError={handleAudioError}
      />

      {/* Instructions */}
      <div className="mt-8 text-center text-gray-600">
        <p>Click the card to flip • Use buttons to navigate • Click speaker to hear pronunciation</p>
      </div>
    </div>
  );
}