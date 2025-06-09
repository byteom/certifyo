'use client';

import { Suspense } from 'react';
import Compiler from '@/components/code-editor/Compiler';
import { useThemeStore } from '@/store/themeStore';

export default function CodeEditorPage() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`flex flex-col w-full min-h-screen ${
      isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <Suspense fallback={<div>Loading...</div>}>
        <Compiler />
      </Suspense>
    </div>
  );
} 