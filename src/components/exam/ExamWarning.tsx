import React from 'react';
import { AlertTriangle, 
  //  Maximize
   } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface ExamWarningProps {
  warningCount: number;
  maxWarnings: number;
  onClose: () => void;
  onReturnToExam: () => void;
}

export default function ExamWarning({ warningCount, maxWarnings, onClose, onReturnToExam }: ExamWarningProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl max-w-md w-full mx-4`}>
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Warning!</h3>
        </div>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Please stay in fullscreen mode and don&apos;t switch tabs. Warning {warningCount} of {maxWarnings}.
        </p>
        <button
          onClick={onReturnToExam}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Return to Exam
        </button>
      </div>
    </div>
  );
}