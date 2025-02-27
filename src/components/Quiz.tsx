import React, { useState, useEffect, useRef } from 'react';
import { Image, Type, AlertCircle, CheckCircle2, X, Loader2, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Flashcard = Database['public']['Tables']['flashcards']['Row'];
type QuizMode = 'text-to-image' | 'image-to-text' | 'voice-to-image';

interface QuizQuestion {
  question: Flashcard;
  options: Flashcard[];
  userAnswer: Flashcard | null;
  isCorrect: boolean | null;
  attempts: number;
  incorrectAnswers: Set<number>;
  score: number;
}

export function Quiz({ categoryId }: { categoryId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>('text-to-image');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Flashcard | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Reset states when question changes
    setImageLoading(true);
    setIsPlayingAudio(false);
    setAudioError(false);
    setSelectedAnswer(null);
  }, [currentQuestionIndex, quizMode]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true);
        setError(null);

        const { data: flashcards, error: fetchError } = await supabase
          .from('flashcards')
          .select('*')
          .eq('category_id', categoryId);

        if (fetchError) throw fetchError;
        if (!flashcards || flashcards.length < 4) {
          throw new Error('Not enough flashcards available for quiz');
        }

        const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledCards.slice(0, 20);

        const quizQuestions = selectedQuestions.map(question => {
          const otherCards = flashcards.filter(card => card.id !== question.id);
          const shuffledOptions = [...otherCards].sort(() => Math.random() - 0.5).slice(0, 3);
          
          return {
            question,
            options: [...shuffledOptions, question].sort(() => Math.random() - 0.5),
            userAnswer: null,
            isCorrect: null,
            attempts: 0,
            incorrectAnswers: new Set<number>(),
            score: 0
          };
        });

        setQuestions(quizQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz questions');
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, [categoryId]);

  const currentQuestion = questions[currentQuestionIndex];

  // Get the appropriate image URL (prefer bucket_url if available)
  const getImageUrl = (card: Flashcard) => {
    return card.bucket_url || card.image_url;
  };

  const handleAnswerSelect = (answer: Flashcard) => {
    if (currentQuestion?.incorrectAnswers.has(answer.id)) {
      return;
    }
    
    // Set the selected answer
    setSelectedAnswer(answer);
    
    // Immediately check the answer for all modes
    handleCheckAnswer(answer);
  };

  const handleCheckAnswer = (answer: Flashcard) => {
    if (!answer || !currentQuestion) return;

    const isCorrect = answer.id === currentQuestion.question.id;
    const updatedQuestions = [...questions];
    
    if (!isCorrect) {
      const newIncorrectAnswers = new Set(currentQuestion.incorrectAnswers);
      newIncorrectAnswers.add(answer.id);
      
      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        incorrectAnswers: newIncorrectAnswers,
        attempts: currentQuestion.attempts + 1,
        score: 0 // Reset score as it's incorrect
      };
      
      setQuestions(updatedQuestions);
      setSelectedAnswer(null);
    } else {
      // Calculate score based on attempts
      let questionScore = 0;
      if (currentQuestion.attempts === 0) {
        questionScore = 1; // Full point for first try
      } else if (currentQuestion.attempts === 1) {
        questionScore = 0.5; // Half point for second try
      }
      // More than 2 attempts = 0 points (default)

      updatedQuestions[currentQuestionIndex] = {
        ...currentQuestion,
        userAnswer: answer,
        isCorrect: true,
        score: questionScore
      };

      setQuestions(updatedQuestions);

      // Add a small delay before moving to next question
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          // Calculate final score
          const finalScore = updatedQuestions.reduce((acc, q) => acc + q.score, 0);
          setTotalScore(finalScore);
          setShowResults(true);
        }
      }, 800); // Short delay to show the correct answer feedback
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setTotalScore(0);
    setQuestions([]);
    setIsLoading(true);
  };

  const cycleQuizMode = () => {
    setQuizMode(prev => {
      if (prev === 'text-to-image') return 'image-to-text';
      if (prev === 'image-to-text') return 'voice-to-image';
      return 'text-to-image';
    });
  };

  const playAudio = () => {
    if (audioRef.current && !audioError) {
      setIsPlayingAudio(true);
      audioRef.current.play().catch(() => {
        setAudioError(true);
        setIsPlayingAudio(false);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingAudio(false);
  };

  const handleAudioError = () => {
    setAudioError(true);
    setIsPlayingAudio(false);
  };

  // Get mode icon and color
  const getModeIcon = () => {
    switch (quizMode) {
      case 'text-to-image':
        return { icon: <Type size={24} className="text-white" />, color: 'bg-green-500 hover:bg-green-600' };
      case 'image-to-text':
        return { icon: <Image size={24} className="text-white" />, color: 'bg-purple-500 hover:bg-purple-600' };
      case 'voice-to-image':
        return { icon: <Volume2 size={24} className="text-white" />, color: 'bg-blue-500 hover:bg-blue-600' };
    }
  };

  const getModeName = () => {
    switch (quizMode) {
      case 'text-to-image': return 'Text to Image';
      case 'image-to-text': return 'Image to Text';
      case 'voice-to-image': return 'Voice to Image';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="mb-6">
          <p className="text-xl">
            Final Score: <span className="font-bold">{totalScore.toFixed(1)}</span> / {questions.length}
          </p>
          <p className="text-gray-600">
            Accuracy: {((totalScore / questions.length) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Scoring: 1 point for correct first try, 0.5 points for correct second try
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.question.id}
              className={`p-4 rounded-lg ${
                q.score === 1
                  ? 'bg-green-50'
                  : q.score === 0.5
                  ? 'bg-yellow-50'
                  : 'bg-red-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Question {index + 1}:</span>
                {q.score === 1 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : q.score === 0.5 ? (
                  <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="ml-auto font-medium">
                  {q.score > 0 ? `+${q.score.toFixed(1)}` : '0'} points
                </span>
              </div>
              <p className="mb-1">{q.question.word}</p>
              <p className="text-sm text-gray-600">
                Your answer: {q.userAnswer?.word || 'Not answered'}
              </p>
              {!q.isCorrect && (
                <p className="text-sm text-gray-600">
                  Correct answer: {q.question.word}
                </p>
              )}
              {q.attempts > 0 && (
                <p className="text-sm text-gray-500">
                  Attempts: {q.attempts + 1}
                </p>
              )}
              {q.isCorrect && q.score < 1 && (
                <p className="text-sm text-yellow-600">
                  {q.score === 0.5 ? 'Correct on second try (0.5 points)' : 'Correct but too many attempts (0 points)'}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handlePlayAgain}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const { icon, color } = getModeIcon();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Quiz Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quiz</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">{getModeName()}</span>
          <button
            onClick={cycleQuizMode}
            className={`p-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 ${color} relative`}
            title={`Switch to next mode (${getModeName()})`}
          >
            {icon}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
              <RotateCcw size={12} className="text-gray-600" />
            </div>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentQuestionIndex + 1} / {questions.length}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        {quizMode === 'text-to-image' && (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">{currentQuestion.question.word}</h3>
            <p className="text-gray-600">{currentQuestion.question.pronunciation}</p>
          </div>
        )}
        
        {quizMode === 'image-to-text' && (
          <div className="aspect-video mb-6 overflow-hidden rounded-lg relative bg-gray-100">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            )}
            <img
              src={getImageUrl(currentQuestion.question)}
              alt="Question"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}
        
        {quizMode === 'voice-to-image' && (
          <div className="flex flex-col items-center justify-center py-6">
            <button
              onClick={playAudio}
              disabled={isPlayingAudio || audioError}
              className={`p-8 rounded-full shadow-lg transition-all duration-300 transform ${
                isPlayingAudio ? 'scale-110 bg-blue-600' : 'hover:scale-105 bg-blue-500'
              } ${audioError ? 'bg-gray-300 cursor-not-allowed' : ''}`}
              title={audioError ? 'Audio not available' : 'Play pronunciation'}
            >
              {audioError ? (
                <VolumeX size={48} className="text-gray-500" />
              ) : isPlayingAudio ? (
                <Volume2 size={48} className="text-white animate-pulse" />
              ) : (
                <Volume2 size={48} className="text-white" />
              )}
            </button>
            
            {audioError ? (
              <p className="mt-4 text-red-500 text-sm">Audio unavailable</p>
            ) : (
              <p className="mt-4 text-gray-600 text-sm">
                {isPlayingAudio ? 'Playing...' : 'Click to hear the word'}
              </p>
            )}
            
            <audio 
              ref={audioRef} 
              src={currentQuestion.question.audio_url} 
              onEnded={handleAudioEnded}
              onError={handleAudioError}
            />
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option) => {
          const isIncorrect = currentQuestion.incorrectAnswers.has(option.id);
          const isSelected = selectedAnswer?.id === option.id;
          const isCorrectAnswer = option.id === currentQuestion.question.id;
          
          return (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option)}
              disabled={isIncorrect || isSelected}
              className={`p-4 rounded-lg border-2 transition-all duration-200 relative ${
                isIncorrect
                  ? 'border-red-500 bg-red-50 opacity-50 cursor-not-allowed'
                  : isSelected && isCorrectAnswer
                  ? 'border-green-500 bg-green-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {(quizMode === 'text-to-image' || quizMode === 'voice-to-image') ? (
                <div className="aspect-video overflow-hidden rounded-lg relative">
                  <img
                    src={getImageUrl(option)}
                    alt={option.word}
                    className={`w-full h-full object-cover ${isIncorrect ? 'opacity-50' : ''}`}
                  />
                  {isIncorrect && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-20">
                      <X className="w-12 h-12 text-red-500 drop-shadow-lg" />
                    </div>
                  )}
                  {isSelected && isCorrectAnswer && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-20">
                      <CheckCircle2 className="w-12 h-12 text-green-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center relative">
                  <p className="text-lg font-semibold">{option.word}</p>
                  <p className="text-sm text-gray-600">{option.pronunciation}</p>
                  {isIncorrect && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X className="w-8 h-8 text-red-500" />
                    </div>
                  )}
                  {isSelected && isCorrectAnswer && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Instructions */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Click on an option to select your answer
      </p>
    </div>
  );
}