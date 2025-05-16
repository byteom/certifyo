
import React from 'react';
import { useThemeStore } from '../../store/themeStore';

interface SubmitConfirmationProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function SubmitConfirmation({ onClose, onConfirm }: SubmitConfirmationProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-xl max-w-md w-full mx-4`}>
        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Confirm Submission
        </h3>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Are you sure you want to submit your exam? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}