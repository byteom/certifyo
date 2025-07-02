import React, { useEffect } from 'react';

interface LearningUnitNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onAskAI: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

const LearningUnitNavigation: React.FC<LearningUnitNavigationProps> = ({
  onPrev, onNext, onAskAI, disablePrev, disableNext
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') { onPrev(); }
      if (e.key === 'ArrowRight') { onNext(); }
      if (e.key.toLowerCase() === 'a') { onAskAI(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPrev, onNext, onAskAI]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex justify-around items-center py-2 shadow md:static md:shadow-none md:border-none" aria-label="Unit Navigation">
      <button onClick={onPrev} disabled={disablePrev} aria-label="Previous Unit" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">⟵ Prev</button>
      <button onClick={onAskAI} aria-label="Ask AI" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Ask AI</button>
      <button onClick={onNext} disabled={disableNext} aria-label="Next Unit" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">Next ⟶</button>
    </nav>
  );
};

export default LearningUnitNavigation; 