import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { Bot, X, ChevronsUp, Sparkles, Code, CheckCircle2, Copy, Loader2, Settings } from 'lucide-react';
import { getAIAssistance } from '@/services/ai-assistance';
import { AIAssistantProps, AIAssistanceMode } from '@/types/code-editor'; // Adjusted import
import AISettings from './AISettings'; // Assuming AISettings will be migrated later
import CodeSnippetViewer from './CodeSnippetViewer'; // Assuming CodeSnippetViewer will be migrated later
import { AnimatePresence, motion } from 'framer-motion';

// Define a message structure for our chat
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  formattedContent?: string;
  highlightedContent?: string;
  extractedCodeBlocks?: Array<{ code: string, language: string }>; // Array of code blocks for CodeSnippetViewer
}

// Function to create a clean format without code blocks (for text content)
const createTextContent = (content: string): string => {
  if (!content) return '';

  // Instead of removing code blocks, replace them with placeholders we can target
  let textContent = content.replace(/```([\w]*)\n([\s\S]*?)```/g, (_match, _lang, _code, offset) => {
    // Create a unique ID for this code block based on position
    return `<div class="code-block-placeholder" data-position="${offset}"></div>`;
  });

  // Format remaining markdown
  textContent = textContent
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!^)\*([^*\n]+)\*/gm, '<em>$1</em>')
    .replace(/^(\s*)\* /gm, '$1• ')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\n/g, '<br />');

  return textContent;
};

// Function to create markup as a string (without direct Prism usage)
const createMarkupAsString = (content: string): string => {
  if (!content) return '';
  const htmlContent = content
    // Format code blocks - we don't do syntax highlighting here anymore since we use CodeSnippetViewer
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, language, code) => {
      return `<pre><code class="language-${language || 'plaintext'}">${code.trim()}</code></pre>`;
    })
    // Format inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Format bold text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Format italic text
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Format links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Format lists
    .replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>')
    // Format paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Format line breaks
    .replace(/\n/g, '<br />');

  return htmlContent;
};

// Extract code blocks for a message once, outside of the render cycle
const extractCodeBlocks = (content: string): Array<{ code: string, language: string }> => {
  const codeBlocks: Array<{ code: string, language: string }> = [];
  const regex = /```([\w]*)\n([\s\S]*?)```/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const language = match[1].trim() || 'plaintext';
    const code = match[2].trim();

    // Map language aliases
    let normalizedLang = language;
    if (language === 'js') normalizedLang = 'javascript';
    if (language === 'ts') normalizedLang = 'typescript';
    if (language === 'py') normalizedLang = 'python';
    if (language === 'sh' || language === 'shell') normalizedLang = 'bash';
    if (language === 'jsx') normalizedLang = 'javascript';
    if (language === 'tsx') normalizedLang = 'typescript';
    if (language === 'yml') normalizedLang = 'yaml';

    codeBlocks.push({
      code,
      language: normalizedLang
    });
  }

  return codeBlocks;
};

// Move the CodeBlockPart component out to prevent recreation and allow memoization
const CodeBlockPart = memo(({
  codeBlock
}: {
  codeBlock: { code: string; language: string };
}) => {
  return (
    <div className="my-2">
      <CodeSnippetViewer
        code={codeBlock.code}
        language={codeBlock.language}
        showOpenInCompiler={false}
      />
    </div>
  );
});
CodeBlockPart.displayName = 'CodeBlockPart';

// Text content component to separately render text
const TextContent = memo(({ html }: { html: string }) => {
  return (
    <div
      className="ai-response formatted-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
TextContent.displayName = 'TextContent';

// Move RichMessageContent outside of the main component and properly memoize it
const RichMessageContent = memo(({ message }: { message: ChatMessage }) => {
  const textContent = useMemo(() => {
    if (!message.formattedContent) {
      return createTextContent(message.content);
    }
    return createTextContent(message.formattedContent);
  }, [message.content, message.formattedContent]);

  const hasCodeBlocks = message.extractedCodeBlocks && message.extractedCodeBlocks.length > 0;
  const parts = useMemo(() => {
    return textContent.split('<div class="code-block-placeholder" data-position="');
  }, [textContent]);

  if (!hasCodeBlocks) {
    return <TextContent html={textContent} />;
  }

  return (
    <div className="message-content">
      {parts[0] && <TextContent html={parts[0]} />}
      {parts.slice(1).map((part, index) => {
        const [, textContent] = part.split('"></div>');
        const codeBlockIndex = Math.min(index, message.extractedCodeBlocks!.length - 1);
        const codeBlock = message.extractedCodeBlocks![codeBlockIndex];
        return (
          <React.Fragment key={`part-${index}`}>
            <CodeBlockPart codeBlock={codeBlock} />
            {textContent && <TextContent html={textContent} />}
          </React.Fragment>
        );
      })}
    </div>
  );
});
RichMessageContent.displayName = 'RichMessageContent';

// Optimize complete messages to prevent rerenders
const Message = memo(({
  message,
  setRef,
  onInsertCode,
  onClose
}: {
  message: ChatMessage;
  isLast?: boolean; // Made optional and unused param explicit
  setRef: (el: HTMLDivElement | null) => void;
  onInsertCode: (code: string) => void;
  onClose: () => void;
}) => {
  return (
    <div
      ref={setRef}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`${message.role === 'user'
          ? 'max-w-[80%] bg-purple-600 text-white rounded-tr-none rounded-lg p-3'
          : 'w-full bg-gray-800 text-white rounded-tl-none rounded-lg p-3'
          }`}
      >
        {message.role === 'assistant' ? (
          <>
            <div className="prose prose-invert max-w-none">
              <RichMessageContent message={message} />
            </div>
            <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-gray-700/30">
              <button
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors text-white"
                onClick={() => navigator.clipboard.writeText(message.content)}
              >
                <Copy className="w-3 h-3" /> Copy
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors text-white"
                onClick={() => {
                  if (message.extractedCodeBlocks?.[0]?.code) {
                    onInsertCode(message.extractedCodeBlocks[0].code);
                    onClose();
                  }
                }}
              >
                <CheckCircle2 className="w-3 h-3" /> Insert
              </button>
            </div>
          </>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
});
Message.displayName = 'Message';

export default function AIAssistant({
  isOpen,
  onClose,
  code,
  language,
  onInsertCode
}: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AIAssistanceMode>('chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Improved ref setting function using useCallback to prevent rerenders
  const setMultipleRefs = useCallback((isLast: boolean, isAssistant: boolean, element: HTMLDivElement | null) => {
    if (isLast) {
      lastMessageRef.current = element;
      if (isAssistant) {
        latestMessageRef.current = element;
      }
    }
  }, []);

  // Simple scroll to bottom effect
  useEffect(() => {
    if (chatHistory.length > 0 && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [chatHistory]);

  // Focus the input when opened
  useEffect(() => {
    if (isOpen && promptInputRef.current) {
      setTimeout(() => promptInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset error when closed
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const formatResponse = (text: string): string => {
    if (!text) return '';

    try {
      const formatted = text
        .replace(/^(#+)\s+(.+)$/gm, (_, hashes, title) => `${hashes} ${title}`)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />');

      return formatted;
    } catch (error) {
      console.error('Error formatting response:', error);
      return text;
    }
  };

  const handleModeChange = (newMode: AIAssistanceMode) => {
    setMode(newMode);
    setError(null);

    if (newMode === 'explain' && code) {
      handleExplainMode();
    } else if (newMode === 'complete' && code) {
      handleCompleteMode();
    }
  };

  const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim() && mode === 'chat') {
      return;
    }

    // Add user message to chat history immediately
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: prompt,
      role: 'user',
      timestamp: new Date()
    };

    setChatHistory(history => [...history, userMessage]);

    // Clear input field
    setPrompt('');

    setIsLoading(true);
    setError(null);

    try {
      // Get context from recent messages to provide to the AI
      const recentMessages = chatHistory.slice(-5).map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
      const contextPrompt = recentMessages ? `${recentMessages}\n\nUser: ${prompt}` : prompt;

      const result = await getAIAssistance({
        prompt: contextPrompt,
        code: code,
        language,
        apiKey: process.env.OPENAI_API_KEY || '', // Provide empty string as fallback
      });

      if (!result.success) {
        setError(result.error || 'Failed to get assistance');
      } else {
        // Add AI response to chat history
        const formattedContent = formatResponse(result.suggestion || '');
        const highlightedContent = createMarkupAsString(formattedContent);
        const extractedBlocks = extractCodeBlocks(result.suggestion || '');

        const aiMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: result.suggestion || '',
          formattedContent: formattedContent,
          highlightedContent: highlightedContent,
          extractedCodeBlocks: extractedBlocks,
          role: 'assistant',
          timestamp: new Date()
        };

        setChatHistory(history => [...history, aiMessage]);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainMode = async () => {
    if (!code.trim()) {
      setError('No code to explain');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAIAssistance({
        prompt: code,
        language,
        apiKey: '' // Provide a fallback or fetch from user profile if needed
      });

      if (!result.success) {
        setError(result.error || 'Failed to explain code');
      } else {
        // Add AI response to chat history
        const formattedContent = formatResponse(result.suggestion || '');
        const highlightedContent = createMarkupAsString(formattedContent);
        const extractedBlocks = extractCodeBlocks(result.suggestion || '');

        const aiMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: result.suggestion || '',
          formattedContent: formattedContent,
          highlightedContent: highlightedContent,
          extractedCodeBlocks: extractedBlocks,
          role: 'assistant',
          timestamp: new Date()
        };

        setChatHistory(history => [...history, aiMessage]);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteMode = async () => {
    if (!code.trim()) {
      setError('No code to complete');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAIAssistance({
        prompt: code,
        language,
        apiKey: '' // Provide a fallback or fetch from user profile if needed
      });

      if (!result.success) {
        setError(result.error || 'Failed to complete code');
      } else {
        // Add AI response to chat history
        const formattedContent = formatResponse(result.suggestion || '');
        const highlightedContent = createMarkupAsString(formattedContent);
        const extractedBlocks = extractCodeBlocks(result.suggestion || '');

        const aiMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          content: result.suggestion || '',
          formattedContent: formattedContent,
          highlightedContent: highlightedContent,
          extractedCodeBlocks: extractedBlocks,
          role: 'assistant',
          timestamp: new Date()
        };

        setChatHistory(history => [...history, aiMessage]);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const hasApiKey = () => {
    // TODO: Adapt this to CertifyO's API key management
    return !!localStorage.getItem('gemini-api-key');
  };

  // Function to clear chat history
  const handleClearChat = () => {
    setChatHistory([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-gray-900 rounded-xl shadow-xl border border-purple-700/50 w-full max-w-3xl max-h-[80vh] flex flex-col"
            style={{ position: 'relative' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-purple-800/30">
              <div className="flex items-center gap-2">
                <Bot className="text-purple-400 w-5 h-5" />
                <h3 className="text-white font-medium">NeoRun AI Code Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="text-gray-400 hover:text-white px-2 py-1 text-xs rounded hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Clear chat"
                >
                  Clear Chat
                </button>
                <button
                  onClick={handleOpenSettings}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex border-b border-purple-800/30">
              <button
                onClick={() => handleModeChange('chat')}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                  mode === 'chat'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white'
                  } cursor-pointer`}
              >
                <Sparkles className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => handleModeChange('complete')}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                  mode === 'complete'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
                  } cursor-pointer`}
              >
                <Code className="w-4 h-4" />
                Complete
              </button>
              <button
                onClick={() => handleModeChange('explain')}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                  mode === 'explain'
                    ? 'text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
                  } cursor-pointer`}
              >
                <Bot className="w-4 h-4" />
                Explain
              </button>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatHistory.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  setRef={(el) => setMultipleRefs(index === chatHistory.length - 1, message.role === 'assistant', el)}
                  onInsertCode={onInsertCode}
                  onClose={onClose}
                />
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin text-purple-400 w-6 h-6" />
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 max-w-sm">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                </div>
              )}
              {!hasApiKey() && (
                 <div className="flex justify-center">
                  <div className="bg-yellow-900/30 border border-yellow-800 rounded-lg p-3 max-w-sm">
                    <p className="text-yellow-400 text-sm text-center">
                      Please set your Gemini API key in the settings.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-purple-800/30">
              <form ref={formRef} onSubmit={handlePromptSubmit} className="flex items-center gap-3">
                <textarea
                  ref={promptInputRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      formRef.current?.requestSubmit();
                    }
                  }}
                  placeholder={mode === 'chat' ? "Ask a question about the code..." : mode === 'explain' ? "Code explanation generated above." : "Code completion generated above."}
                  className="flex-1 p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:opacity-50"
                  rows={1}
                  disabled={isLoading || mode !== 'chat' || !hasApiKey()}
                />
                <button
                  type="submit"
                  className="absolute bottom-4 right-4 p-2 text-white bg-purple-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors cursor-pointer"
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronsUp className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
          
          {isSettingsOpen && (
            <AISettings 
              isOpen={isSettingsOpen} 
              onClose={() => setIsSettingsOpen(false)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 