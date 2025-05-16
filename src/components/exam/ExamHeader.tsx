import React from 'react';
import { Clock } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface ExamHeaderProps {
  title: string;
  timeLeft: number;
}

export default function ExamHeader({title,timeLeft }: ExamHeaderProps) {
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h1>
      <div className="flex items-center space-x-2 text-lg font-semibold text-indigo-500">
        <Clock className="h-5 w-5" />
        <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}