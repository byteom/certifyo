import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Loader2, Settings, Download, Share2, Palette, Type } from 'lucide-react';
import {
  EDITOR_THEMES,
  EDITOR_OPTIONS,
  SUPPORTED_LANGUAGES
} from '@/constants/editor-config';
import { useCodeEditor } from '@/hooks/useCodeEditor';
import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import type { editor } from 'monaco-editor';

interface CodeEditorProps {
  onExecute: (code: string, language: string, version: string, input: string) => Promise<void>;
  isExecuting: boolean;
  customInput: string;
  selectedLanguageId: string;
  onEditorMount?: (editor: editor.IStandaloneCodeEditor) => void;
}

export default function CodeEditor({
  onExecute,
  isExecuting,
  customInput,
  selectedLanguageId,
  onEditorMount
}: CodeEditorProps) {
  const {
    selectedLanguage,
    selectedTheme,
    fontSize,
    isThemeMenuOpen,
    setIsThemeMenuOpen,
    handleEditorDidMount,
    handleThemeChange,
    handleFontSizeChange,
    handleResetCode,
    getCurrentCode
  } = useCodeEditor(
    async (code: string) => {
      // Ensure we use the correct language and version from the current state/props
      const currentLang = SUPPORTED_LANGUAGES.find(lang => lang.id === selectedLanguage.id);
      if (!currentLang) {
          console.error('Current language not found in SUPPORTED_LANGUAGES', selectedLanguage);
          return;
      }
      await onExecute(code, currentLang.id, currentLang.version, customInput);
    },
    selectedLanguageId,
    // Pass the editor instance to parent via onEditorMount
    onEditorMount
  );

  // Keep local state in sync with parent props - This seems redundant with useCodeEditor's handling of externalLanguageId
  // The useCodeEditor hook already manages syncing its internal selectedLanguage with the externalLanguageId prop
  // Removing this state and effect to avoid potential conflicts
  // const [currentLang, setCurrentLang] = useState(selectedLanguage);

  // Update local state when parent prop changes
  // useEffect(() => {
  //   if (selectedLanguageId !== currentLang.id) {
  //     const newLang = SUPPORTED_LANGUAGES.find(lang => lang.id === selectedLanguageId);
  //     if (newLang) {
  //       setCurrentLang(newLang);
  //     }
  //   }
  // }, [selectedLanguageId, currentLang.id]);

  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false);

  const { isDarkMode } = useThemeStore(); // Access isDarkMode

  const handleExecute = async () => {
    const code = getCurrentCode();
    if (code) {
      // Use the language and version from the useCodeEditor hook's state
      const lang = selectedLanguage; // Use selectedLanguage from the hook

      console.log(`CodeEditor executing with language: ${lang.name} (${lang.id})`);
      if (typeof window !== 'undefined') { // Check for window for SSR
        localStorage.setItem(`code-${lang.id}`, code);
      }

      // Use the language and version from the hook's state
      await onExecute(code, lang.id, lang.version, customInput);
    }
  };

  // Handle file download
  const handleDownload = () => {
    const code = getCurrentCode();
    if (!code) return;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // Use selectedLanguage from the hook for the extension
    a.download = `code.${selectedLanguage.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsActionsMenuOpen(false); // Close the popup
  };

  // Handle code sharing (copy shareable link)
  const handleShare = () => {
    const code = getCurrentCode();
    if (!code) return;

    navigator.clipboard.writeText(code)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => console.error('Failed to copy code:', err));

    setIsActionsMenuOpen(false); // Close the popup
  };

  // Handle reset code with popup closing
  const handleResetCodeWithClose = () => {
    handleResetCode();
    setIsActionsMenuOpen(false); // Close the popup
  };

  return (
    <div className={`h-full flex flex-col rounded-b-xl overflow-hidden ${
      isDarkMode ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-800' // Conditional background and text color for main container
    }`}>
      {/* Header bar */}
      <div className={`flex items-center justify-between p-4 border-b ${
        isDarkMode ? 'bg-gray-900 border-purple-900/30' : 'bg-gray-100 border-purple-200/30' // Conditional background and border color for header
      }`}>
        {/* Display current language name */}
        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}> {/* Conditional text color */}
          {selectedLanguage.name} <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>({selectedLanguage.version})</span> {/* Conditional text color */}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center">
          {/* Actions Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isDarkMode ? 'border-purple-800/50 text-white hover:bg-purple-900/30' : 'border-purple-300/50 text-gray-800 hover:bg-purple-100/30' // Conditional styles
              }`}
              title="More Actions"
            >
              <Settings className="w-5 h-5" />
            </button>

            {isActionsMenuOpen && (
              <div className={`absolute right-0 mt-2 min-w-[12rem] rounded-xl shadow-xl border z-20 overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-purple-800/50' : 'bg-white border-purple-300/50' // Conditional background and border
              }`}>
                <div className="flex flex-col">
                  <button
                    onClick={handleResetCodeWithClose}
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer ${
                      isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100' // Conditional text color and hover background
                    }`}
                  >
                    <RotateCcw className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /> {/* Conditional icon color */}
                    Reset Code
                  </button>
                  <button
                    onClick={handleDownload}
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer ${
                      isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100' // Conditional text color and hover background
                    }`}
                  >
                    <Download className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /> {/* Conditional icon color */}
                    Download Code
                  </button>
                  <button
                    onClick={handleShare}
                    className={`flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer ${
                      isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100' // Conditional text color and hover background
                    }`}
                  >
                    <Share2 className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} /> {/* Conditional icon color */}
                    Share Code
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Menu */}
          <div className="relative">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isDarkMode ? 'border-purple-800/50 text-white hover:bg-purple-900/30' : 'border-purple-300/50 text-gray-800 hover:bg-purple-100/30' // Conditional styles
              }`}
              title="Change Theme"
            >
              <Palette className="w-5 h-5" />
            </button>

            {isThemeMenuOpen && (
              <div className={`absolute right-0 mt-2 min-w-[12rem] rounded-xl shadow-xl border z-20 overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-purple-800/50' : 'bg-white border-purple-300/50' // Conditional background and border
              }`}>
                <div className="flex flex-col">
                  {EDITOR_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme)}
                      className={`flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer ${
                        isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100' // Conditional text color and hover background
                      } ${selectedTheme.id === theme.id ? (isDarkMode ? 'bg-purple-700' : 'bg-purple-200') : '' // Conditional selected theme background
                        } font-semibold`}
                    >
                      <span className={`inline-block w-3 h-3 rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-900'} opacity-50`}></span> {/* Conditional dot color */}
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Font Size Menu */}
          <div className="relative">
            <button
              onClick={() => setIsFontSizeMenuOpen(!isFontSizeMenuOpen)}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isDarkMode ? 'border-purple-800/50 text-white hover:bg-purple-900/30' : 'border-purple-300/50 text-gray-800 hover:bg-purple-100/30' // Conditional styles
              }`}
              title="Change Font Size"
            >
              <Type className="w-5 h-5" />
            </button>

            {isFontSizeMenuOpen && (
              <div className={`absolute right-0 mt-2 min-w-[12rem] rounded-xl shadow-xl border z-20 overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-purple-800/50' : 'bg-white border-purple-300/50' // Conditional background and border
              }`}>
                <div className="flex flex-col">
                  {[12, 14, 16, 18, 20].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        handleFontSizeChange(size);
                        setIsFontSizeMenuOpen(false); // Close the menu after selection
                      }}
                      className={`flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer ${
                        isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100' // Conditional text color and hover background
                      } ${fontSize === size ? (isDarkMode ? 'bg-purple-700' : 'bg-purple-200') : '' // Conditional selected size background
                        } font-semibold`}
                    >
                      {size}px
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Run Button */}
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isExecuting
              ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow cursor-pointer'
              }`}
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden rounded-b-xl">
        <Editor
          height="100%"
          defaultLanguage={selectedLanguage.id}
          theme={selectedTheme.theme} // Use selectedTheme.theme
          value={getCurrentCode()} // Use getCurrentCode from hook
          options={{ ...EDITOR_OPTIONS, fontSize: fontSize }} // Apply font size from state
          onMount={handleEditorDidMount} // Use handleEditorDidMount from hook
        />
      </div>
    </div>
  );
} 