import React from 'react';
import { AlertTriangle, Settings } from 'lucide-react';

interface ApiKeyWarningProps {
  isDarkMode: boolean;
  onGoToProfile: () => void;
}

export default function ApiKeyWarning({ isDarkMode, onGoToProfile }: ApiKeyWarningProps) {
  return (
    <div className={`mb-10 p-6 rounded-xl border ${
      isDarkMode 
        ? 'bg-yellow-900/20 border-yellow-800/30' 
        : 'bg-yellow-50 border-yellow-200'
    }`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className={`h-6 w-6 ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
          }`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-lg font-medium ${
            isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
          }`}>
            Groq API Key Required
          </h3>
          <div className={`mt-2 ${
            isDarkMode ? 'text-yellow-300/80' : 'text-yellow-600'
          }`}>
            <p>
              To use the AI Quiz feature, you need to add your Groq API key in your profile settings. 
              The AI Quiz system uses Groq's powerful language models to generate personalized quizzes.
            </p>
            <p className="mt-2">
              You can get a free API key by signing up at{' '}
              <a 
                href="https://console.groq.com/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Groq Console
              </a>.
            </p>
            <div className="mt-4">
              <button
                onClick={onGoToProfile}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-yellow-800 text-yellow-100 hover:bg-yellow-700' 
                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                } transition-colors`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Go to Profile Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}