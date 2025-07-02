'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Brain, BookOpen, Lightbulb, Loader2, AlertTriangle, Settings } from 'lucide-react';
import SubjectQuizCard from '@/components/quiz/SubjectQuizCard';
import CustomQuizForm from '@/components/quiz/CustomQuizForm';
import ApiKeyWarning from '@/components/quiz/ApiKeyWarning';
import { subjects } from '@/data/subjects';

export default function QuizPage() {
  const router = useRouter();
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { user } = useAuthStore();
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'subjects' | 'custom'>('subjects');

  // Check if user has Groq API key
  useEffect(() => {
    const checkApiKey = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('groq_api_key')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setHasApiKey(!!data?.groq_api_key);
      } catch (error) {
        console.error('Error checking API key:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkApiKey();
  }, [user]);

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4`}>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 max-w-md text-center`}>
          <AlertTriangle className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sign In Required
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please sign in to access the AI Quiz feature.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Quiz System
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your knowledge with AI-generated quizzes on various subjects or create custom quizzes on any topic.
          </p>
        </div>

        {/* API Key Warning */}
        {!hasApiKey && (
          <ApiKeyWarning 
            isDarkMode={isDarkMode} 
            onGoToProfile={handleGoToProfile} 
          />
        )}

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'subjects'
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 shadow-sm'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Subject Quizzes
              </div>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'custom'
                  ? isDarkMode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-indigo-600 shadow-sm'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Custom Quiz
              </div>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'subjects' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <SubjectQuizCard 
                key={subject.id} 
                subject={subject} 
                isDarkMode={isDarkMode} 
                disabled={!hasApiKey}
              />
            ))}
          </div>
        ) : (
          <CustomQuizForm 
            isDarkMode={isDarkMode} 
            disabled={!hasApiKey} 
          />
        )}

        {/* Settings Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleGoToProfile}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg 
              ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-900'
              } transition-all`}
            aria-label="API Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}