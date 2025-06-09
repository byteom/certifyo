import { useState, useEffect, useCallback, useRef } from 'react';
import { Save } from 'lucide-react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import AIFloatingButton from './AIFloatingButton';
import SaveCodeDialog from './SaveCodeDialog';
import LanguageSelector from './LanguageSelector';
import { executeCode } from '@/services/code-execution';
import { SUPPORTED_LANGUAGES } from '@/constants/editor-config';
import { useAuthStore } from '@/store/authStore';
import { getCodeSnippet as _getCodeSnippet, getCodeSnippetByShareableLink as _getCodeSnippetByShareableLink } from '@/services/code-snippets';
import CodeSuggestionPanel from '@/components/ui/CodeSuggestionPanel';
import { useThemeStore } from '@/store/themeStore';
import type { editor } from 'monaco-editor';

export default function Compiler() {
  const { user: currentUser } = useAuthStore();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const linkId = params.linkId as string | undefined;
  const { isDarkMode } = useThemeStore();

  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [customInput, setCustomInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState(() => {
    const savedLangId = typeof window !== 'undefined' ? localStorage.getItem('selected-language') : null;
    return savedLangId || SUPPORTED_LANGUAGES[0].id;
  });
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [loadingSnippet, setLoadingSnippet] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionData, setSuggestionData] = useState<{
    suggestion: string;
    strengths: string[];
    improvements: string[];
    score?: number;
  } | null>(null);
  
  const currentLanguageRef = useRef(selectedLanguageId);
  
  useEffect(() => {
    currentLanguageRef.current = selectedLanguageId;
  }, [selectedLanguageId]);

  useEffect(() => {
    if (editorInstance) {
      editorRef.current = editorInstance;
    }
  }, [editorInstance]);

  useEffect(() => {
    const loadSnippet = async () => {
      setLoadingSnippet(true);
      setLoadingError(null);
      
      try {
        let snippetData: { code: string; language: string } | undefined;
        const snippetId = searchParams.get('snippet');
        
        if (snippetId) {
          snippetData = { code: '// Mock snippet from ID', language: 'javascript' };
        } 
        else if (linkId) {
          snippetData = { code: '// Mock snippet from Link ID', language: 'python' };
        }
        
        if (snippetData) {
          setSelectedLanguageId(snippetData.language);
          
          if (editorRef.current) {
            editorRef.current.setValue(snippetData.code);
          } else {
            const checkInterval = setInterval(() => {
              if (editorRef.current) {
                editorRef.current.setValue(snippetData!.code);
                clearInterval(checkInterval);
              }
            }, 100);
            
            setTimeout(() => clearInterval(checkInterval), 5000);
          }
        }
      } catch (err) {
        console.error("Error loading snippet:", err);
        setLoadingError(err instanceof Error ? err.message : "Failed to load the requested snippet");
      } finally {
        setLoadingSnippet(false);
      }
    };
    
    if (searchParams.get('snippet') || linkId) {
      loadSnippet();
    }
  }, [searchParams, linkId, editorRef]);

  const handleExecute = useCallback(async (code: string, language: string, version: string, input: string) => {
    setIsExecuting(true);
    setError(undefined);
    setOutput('');

    try {
      const currentLangId = currentLanguageRef.current;
      
      const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.id === currentLangId);
      
      if (!currentLang) {
        throw new Error(`Invalid language selected: ${currentLangId}`);
      }
      
      console.log(`Executing code in ${currentLang.name} (${currentLang.id})`);
      
      const result = await executeCode(code, currentLang.id, currentLang.version, input);
      
      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while executing the code');
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const handleLanguageChange = useCallback((langId: string) => {
    const newLang = SUPPORTED_LANGUAGES.find(lang => lang.id === langId);
    if (!newLang) {
      console.error(`Invalid language ID: ${langId}`);
      return;
    }
    
    console.log(`Switching language to: ${newLang.name} (${newLang.id})`);
    setSelectedLanguageId(newLang.id);
    currentLanguageRef.current = newLang.id;
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-language', newLang.id);
    }
  }, []);

  const getCurrentCode = () => {
    if (editorInstance) {
      return editorInstance.getValue();
    }
    return '';
  };

  const handleInsertAICode = (code: string) => {
    if (!editorInstance) return;

    const selection = editorInstance.getSelection();
    if (selection) {
      editorInstance.executeEdits('ai-assistant', [{
        range: selection,
        text: code,
        forceMoveMarkers: true
      }]);
    } else {
      const model = editorInstance.getModel();
      if (model) {
        const lastLineNumber = model.getLineCount();
        const lastLineLength = model.getLineLength(lastLineNumber);
        const position = { lineNumber: lastLineNumber, column: lastLineLength + 1 };
        editorInstance.setPosition(position);
        editorInstance.trigger('ai-assistant', 'type', { text: '\n\n' + code });
      }
    }
  };

  const getCurrentLanguage = () => {
    const lang = SUPPORTED_LANGUAGES.find(lang => lang.id === selectedLanguageId);
    return {
      id: lang?.id || 'typescript',
      name: lang?.name || 'TypeScript'
    };
  };

  const handleSaveSuccess = (snippetId: string) => {
    router.push(`/snippets/${snippetId}`);
  };

  const _SaveButton = (
    <button
      onClick={() => setIsSaveDialogOpen(true)}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-purple-600/70 rounded-lg hover:bg-purple-600/20 transition-colors"
    >
      <Save className="w-4 h-4" />
      <span>Save Code</span>
    </button>
  );

  const handleCodeSuggestion = async () => {
    setShowSuggestion(true);
    setSuggestionLoading(true);
    setTimeout(() => {
      setSuggestionData({
        suggestion: `def calculate_monkey_collisions(vertices: int) -> int:\n    MOD = 10**9 + 7\n    # ...rest of the code...`,
        strengths: [
          'The logic to compute the number of collision configurations is correct and utilizes modular arithmetic effectively.',
          'The use of Python\'s built-in pow function for exponentiation is efficient and optimal for the problem constraints.'
        ],
        improvements: []
      });
      setSuggestionLoading(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${
      isDarkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {loadingSnippet && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full shadow-lg border border-purple-900/40">
            <div className="flex items-center justify-center space-x-3">
              <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg font-medium text-white">Loading snippet...</p>
            </div>
          </div>
        </div>
      )}

      {loadingError && (
        <div className="max-w-3xl mx-auto mt-4">
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">{loadingError}</p>
          </div>
        </div>
      )}

      <main className="flex-1 mx-auto w-full p-2 sm:p-6">
        <div className="block md:hidden mb-4">
          <LanguageSelector
            selectedLanguageId={selectedLanguageId}
            onSelectLanguage={handleLanguageChange}
            orientation="horizontal"
            className="mb-2"
          />
        </div>

        {currentUser && (
          <div className="sm:hidden mb-2 px-2">
            <button
              onClick={() => setIsSaveDialogOpen(true)}
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2 text-white"
            >
              <Save className="w-4 h-4" />
              <span>Save Code</span>
            </button>
          </div>
        )}

        <div className="flex h-[calc(100vh-8.5rem)] md:h-[calc(100vh-7.5rem)] gap-4">
          <div className="hidden md:block w-20">
            <LanguageSelector
              selectedLanguageId={selectedLanguageId}
              onSelectLanguage={handleLanguageChange}
              orientation="vertical"
              maxHeight="calc(100vh - 10rem)"
              className="h-full"
            />
          </div>

          <div className="flex-1 grid lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            <div className="lg:col-span-3 bg-gray-900/80 border border-purple-900/50 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-violet-900/20 hover:shadow-xl">
              <CodeEditor
                onExecute={handleExecute}
                isExecuting={isExecuting}
                customInput={customInput}
                selectedLanguageId={selectedLanguageId}
                onEditorMount={(editor) => setEditorInstance(editor)}
              />
              <div className="p-4 border-t border-purple-900/30 bg-gray-900/70 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md transition-all"
                  onClick={handleCodeSuggestion}
                  disabled={suggestionLoading}
                >
                  {suggestionLoading ? 'Loading Suggestion...' : 'Code Suggestion'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gray-900/80 border border-purple-900/50 rounded-2xl shadow-lg backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-violet-900/20 hover:shadow-xl">
              <OutputPanel
                output={output}
                error={error}
                customInput={customInput}
                onInputChange={setCustomInput}
                isExecuting={isExecuting}
              />
            </div>
          </div>
        </div>
      </main>

      <AIFloatingButton
        getCurrentCode={getCurrentCode}
        currentLanguage={getCurrentLanguage()}
        onInsertCode={handleInsertAICode}
      />

      {isSaveDialogOpen && (
        <SaveCodeDialog
          isOpen={isSaveDialogOpen}
          onClose={() => setIsSaveDialogOpen(false)}
          onSaveSuccess={handleSaveSuccess}
          code={getCurrentCode()}
          language={selectedLanguageId}
        />
      )}

      {showSuggestion && suggestionData && (
        <CodeSuggestionPanel
          userCode={getCurrentCode()}
          suggestionCode={suggestionData.suggestion}
          _language={getCurrentLanguage().id}
          strengths={suggestionData.strengths}
          improvements={suggestionData.improvements}
          score={suggestionData.score}
          onClose={() => setShowSuggestion(false)}
          onApply={handleInsertAICode}
        />
      )}
    </div>
  );
}