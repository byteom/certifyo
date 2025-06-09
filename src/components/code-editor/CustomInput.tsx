import React from 'react';
import { useThemeStore } from '@/store/themeStore';

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomInput({ value, onChange }: CustomInputProps) {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="px-4 pb-4 pt-2">
      <h2 className={`text-base font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Custom Input</h2>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your input here..."
          className={`w-full h-24 px-4 py-3 text-sm rounded-xl border backdrop-blur-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 resize-none transition-all ${
            isDarkMode
              ? 'bg-gray-800/60 text-white border-purple-900/40 placeholder:text-gray-400'
              : 'bg-white/60 text-gray-900 border-purple-200/40 placeholder:text-gray-500'
          }`}
        />
      </div>
    </div>
  );
} 