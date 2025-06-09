import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useRouter } from 'next/navigation';

interface CodeSnippetViewerProps {
    code: string;
    language: string;
    title?: string;
    showHeader?: boolean;
    showCopyButton?: boolean;
    showLanguageTag?: boolean;
    showOpenInCompiler?: boolean;
    maxHeight?: string;
}

export default function CodeSnippetViewer({
    code,
    language,
    title,
    showHeader = true,
    showCopyButton = true,
    showLanguageTag = true,
    showOpenInCompiler = true,
}: CodeSnippetViewerProps) {
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    // Normalize language identifier
    const normalizeLanguage = (lang: string): string => {
        const langLower = lang.toLowerCase();

        // Map some common language aliases to react-syntax-highlighter friendly names
        const langMap: Record<string, string> = {
            'js': 'javascript',
            'ts': 'typescript',
            'py': 'python',
            'sh': 'bash',
            'shell': 'bash',
            'jsx': 'javascript',
            'tsx': 'typescript',
            'yml': 'yaml',
            'c++': 'cpp',
        };

        return langMap[langLower] || langLower;
    };

    // Handle copy code to clipboard
    const handleCopyCode = async () => {
        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    // Handle opening code in compiler
    const handleOpenInCompiler = () => {
        const normalizedLang = normalizeLanguage(language);
        router.push(`/code-editor?lang=${normalizedLang}&code=${encodeURIComponent(code)}`);
    };

    const normalizedLanguage = normalizeLanguage(language);

    return (
        <div className="bg-gray-900 rounded-xl border border-purple-900/40 shadow-lg overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-purple-700/50">
            {/* Terminal-style header */}
            {showHeader && (
                <div className="bg-gray-800/50 px-3 py-2 border-b border-purple-900/30 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                            {/* Placeholder for window controls */}
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                        </div>
                        {title && <span className="text-sm text-gray-300">{title}</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        {showLanguageTag && (
                            <div className="flex items-center text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded-md">
                                <span className="lowercase">{normalizedLanguage}</span>
                            </div>
                        )}
                        {showCopyButton && (
                            <button
                                onClick={handleCopyCode}
                                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                                aria-label="Copy code"
                            >
                                {isCopied ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        )}
                        {showOpenInCompiler && (
                            <button
                                onClick={handleOpenInCompiler}
                                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                                aria-label="Open in compiler"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Code content */}
            <div className="overflow-auto relative">
                 <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={normalizedLanguage}
                    showLineNumbers
                    wrapLines={true}
                    PreTag="div"
                    codeTagProps={{ style: { } }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
} 