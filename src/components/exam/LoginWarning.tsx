import React from 'react';
import { LogIn, ArrowRight, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface LoginWarningProps {
  onClose: () => void;
  onSignIn: () => void;
}

export default function LoginWarning({ onClose, onSignIn }: LoginWarningProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`relative p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        
        {/* Close Button (Top Right) */}
         

        {/* Modal Content */}
        <div className="flex items-center mb-6">
          <LogIn className="h-6 w-6 text-indigo-500 mr-2" />
          <h3 className="text-2xl font-bold">Sign In Required</h3>
        </div>

        <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Please sign in to access this exam and continue.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
           

          <button
            onClick={onSignIn}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center px-5 py-2 rounded-md font-semibold"
          >
            Sign In
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
}
