import { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import AIAssistant from './AIAssistant';

interface AIFloatingButtonProps {
    getCurrentCode: () => string;
    currentLanguage: {
        id: string;
        name: string;
    };
    onInsertCode: (code: string) => void;
}

export default function AIFloatingButton({
    getCurrentCode,
    currentLanguage,
    onInsertCode
}: AIFloatingButtonProps) {
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    // Show tooltip after a delay if it hasn't been shown before
    useEffect(() => {
        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setShowTooltip(true);
                setHasBeenShown(true);

                // Hide tooltip after 4 seconds
                setTimeout(() => {
                    setShowTooltip(false);
                }, 4000);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [hasBeenShown]);

    // Handle opening the AI Assistant
    const handleOpenAIAssistant = () => {
        setIsAIAssistantOpen(true);
        setShowTooltip(false);
    };

    return (
        <>
            {/* Floating button */}
            <button
                onClick={handleOpenAIAssistant}
                className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center z-30 group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => !hasBeenShown && setShowTooltip(false)}
                aria-label="AI Assistant"
            >
                <Bot className="w-6 h-6 text-white" /> AI
            </button>

            {/* Tooltip */}
            {showTooltip && (
                <div className="fixed bottom-20 right-6 bg-gray-900 text-white py-2 px-4 rounded-lg shadow-lg z-40 w-48 text-sm border border-purple-800/50">
                    <button
                        onClick={() => setShowTooltip(false)}
                        className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 hover:bg-gray-700"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    <p>Need coding help? Ask the AI assistant!</p>
                </div>
            )}

            {/* AI Assistant Modal */}
            <AIAssistant
                isOpen={isAIAssistantOpen}
                onClose={() => setIsAIAssistantOpen(false)}
                code={getCurrentCode()}
                language={currentLanguage.id}
                onInsertCode={onInsertCode}
            />
        </>
    );
} 