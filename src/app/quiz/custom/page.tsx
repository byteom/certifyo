'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowLeft, Brain, AlertTriangle } from 'lucide-react';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import { generateCustomQuizQuestions } from '@/services/quiz-service';

interface AIGeneratedQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function CustomQuizPage() {
  const router = useRouter();
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { user } = useAuthStore();
  
  // Instead of using useSearchParams, we'll use URL parsing
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [count, setCount] = useState(10);
  
  const [questions, setQuestions] = useState<AIGeneratedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/quiz');
      return;
    }

    // Parse URL parameters manually instead of using useSearchParams
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const topicParam = urlParams.get('topic');
      const difficultyParam = urlParams.get('difficulty');
      const countParam = urlParams.get('count');
      
      if (topicParam) setTopic(topicParam);
      if (difficultyParam) setDifficulty(difficultyParam);
      if (countParam) setCount(parseInt(countParam, 10));
      
      if (!topicParam) {
        router.push('/quiz');
        return;
      }
      
      const fetchApiKeyAndGenerateQuestions = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('groq_api_key')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          
          if (!data?.groq_api_key) {
            setError('No API key found. Please add your Groq API key in your profile settings.');
            setIsLoading(false);
            return;
          }
          
          // Generate questions
          try {
            const generatedQuestions = await generateCustomQuizQuestions(
              data.groq_api_key,
              topicParam,
              difficultyParam || 'medium',
              countParam ? parseInt(countParam, 10) : 10
            );
            
            setQuestions(generatedQuestions);
            setIsLoading(false);
          } catch (err) {
            console.error('Error generating questions:', err);
            setError('Failed to generate quiz questions. Please try again.');
            setIsLoading(false);
          }
        } catch (err) {
          console.error('Error fetching API key:', err);
          setError('Failed to fetch API key. Please try again.');
          setIsLoading(false);
        }
      };

      fetchApiKeyAndGenerateQuestions();
    }
  }, [user, router]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    
    // Optional: Save quiz results to database
    if (user && topic) {
      try {
        const score = selectedAnswers.filter(
          (answer, index) => answer === questions[index].correctAnswer
        ).length;
        
        const percentage = Math.round((score / questions.length) * 100);
        
        supabase.from('quiz_history').insert([{
          user_id: user.id,
          subject: topic,
          score: percentage,
          total_questions: questions.length,
          is_custom: true,
          difficulty: difficulty
        }]).then(({ error }) => {
          if (error) console.error('Error saving quiz results:', error);
        });
      } catch (err) {
        console.error('Error processing quiz results:', err);
      }
    }
  };

  const handleReturnToQuizzes = () => {
    router.push('/quiz');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col items-center justify-center p-4`}>
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Generating AI quiz questions on {topic}...
        </p>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          This may take a moment as our AI crafts challenging questions for you.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 max-w-md text-center`}>
          <AlertTriangle className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Error
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {error}
          </p>
          <button
            onClick={handleReturnToQuizzes}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Return to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    
    return (
      <QuizResults
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        onReturnToQuizzes={handleReturnToQuizzes}
        isDarkMode={isDarkMode}
        subject={topic}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <button
            onClick={handleReturnToQuizzes}
            className={`mr-4 p-2 rounded-full ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } transition-colors`}
          >
            <ArrowLeft className={`h-5 w-5 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`} />
          </button>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {topic} Quiz
          </h1>
          <div className={`ml-auto flex items-center ${
            isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
          }`}>
            <Brain className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">AI-Generated</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className={`h-2 w-full rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className="h-2 rounded-full bg-indigo-600"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        {questions.length > 0 && (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            onSelectAnswer={handleAnswerSelect}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`
            } transition-colors`}
          >
            Previous
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className={`px-6 py-2 rounded-lg ${
                selectedAnswers[currentQuestionIndex] === undefined
                  ? `${isDarkMode ? 'bg-indigo-800 text-indigo-300' : 'bg-indigo-300 text-indigo-700'} opacity-70 cursor-not-allowed`
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className={`px-6 py-2 rounded-lg ${
                selectedAnswers[currentQuestionIndex] === undefined
                  ? `${isDarkMode ? 'bg-green-800 text-green-300' : 'bg-green-300 text-green-700'} opacity-70 cursor-not-allowed`
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } transition-colors`}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}