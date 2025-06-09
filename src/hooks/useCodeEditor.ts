import { useState, useRef, useEffect, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, EDITOR_THEMES, DEFAULT_CODE } from '@/constants/editor-config';
import { SupportedLanguage, EditorTheme } from '@/types/code-editor';
import { defineMonacoThemes } from '@/constants/monacoThemes';
import { useThemeStore } from '@/store/themeStore';
import * as monaco from 'monaco-editor';

// Add type declaration for window
declare global {
    interface Window {
        __MONACO_EDITOR__: monaco.editor.IStandaloneCodeEditor | null;
    }
}

export function useCodeEditor(
    onExecute?: (code: string) => void, 
    externalLanguageId?: string,
    onEditorMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void
) {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<typeof monaco | null>(null);
    const previousLanguageRef = useRef<string | null>(null);

    // Access global theme state
    const { isDarkMode } = useThemeStore();

    // 🔁 Load selected language from localStorage or default
    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(() => {
        // If an external language ID is provided, use it
        if (externalLanguageId) {
            const lang = SUPPORTED_LANGUAGES.find((lang) => lang.id === externalLanguageId);
            if (lang) {
                previousLanguageRef.current = lang.id;
                return lang;
            }
        }
        
        // Otherwise use localStorage
        const savedLangId = typeof window !== 'undefined' ? localStorage.getItem('selected-language') : null;
        const lang = SUPPORTED_LANGUAGES.find((lang) => lang.id === savedLangId);
        if (lang) {
            previousLanguageRef.current = lang.id;
            return lang;
        }
        
        // Default to first language in the list
        previousLanguageRef.current = SUPPORTED_LANGUAGES[0].id;
        return SUPPORTED_LANGUAGES[0];
    });

    // Listen for changes to externalLanguageId prop - critical for syncing language state
    useEffect(() => {
        if (externalLanguageId && externalLanguageId !== selectedLanguage.id) {
            console.log(`Language change detected in useCodeEditor: ${externalLanguageId} (previous: ${selectedLanguage.id})`);
            
            const newLang = SUPPORTED_LANGUAGES.find((lang) => lang.id === externalLanguageId);
            if (!newLang) {
                console.error(`Invalid language ID received: ${externalLanguageId}`);
                return;
            }
            
            setSelectedLanguage(newLang);
            previousLanguageRef.current = newLang.id;
            
            // Update editor's language when it's mounted
            if (editorRef.current && monacoRef.current) {
                // Set default code for the language if there's no saved code
                const savedCode = typeof window !== 'undefined' ? localStorage.getItem(`code-${newLang.id}`) : null;
                const defaultCode = DEFAULT_CODE[newLang.id] || '';
                const codeToSet = savedCode || defaultCode;
                
                editorRef.current.setValue(codeToSet);
                
                // Update the editor language model
                const model = editorRef.current.getModel();
                if (model) {
                    monacoRef.current.editor.setModelLanguage(model, newLang.id);
                }
            }
        }
    }, [externalLanguageId, selectedLanguage.id]); // Removed mutable refs from dependencies

    const [selectedTheme, setSelectedTheme] = useState<EditorTheme>(() => {
        const savedThemeId = typeof window !== 'undefined' ? localStorage.getItem('editor-theme') : null;
        return EDITOR_THEMES.find((t) => t.id === savedThemeId) || EDITOR_THEMES[0];
    });

    // Add font size state with localStorage persistence
    const [fontSize, setFontSize] = useState<number>(() => {
        const savedFontSize = typeof window !== 'undefined' ? localStorage.getItem('editor-font-size') : null;
        return savedFontSize ? parseInt(savedFontSize, 10) : 14;
    });

    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

    const handleLanguageChange = useCallback((langId: string) => {
        console.log(`Changing language in useCodeEditor to: ${langId}`);
        
        if (langId === selectedLanguage.id) {
            console.log('Language already selected, no change needed');
            return; // Already selected
        }
        
        const newLang = SUPPORTED_LANGUAGES.find((lang) => lang.id === langId);
        if (!newLang) {
            console.error(`Invalid language ID in handleLanguageChange: ${langId}`);
            return;
        }

        // Update previous language ref
        previousLanguageRef.current = newLang.id;

        setSelectedLanguage(newLang);
        if (typeof window !== 'undefined') { // Check for window for SSR
            localStorage.setItem('selected-language', newLang.id);
        }

        if (editorRef.current) {
            // Get saved code for this language or use default
            const savedCode = typeof window !== 'undefined' ? localStorage.getItem(`code-${newLang.id}`) : null;
            const defaultCode = DEFAULT_CODE[newLang.id] || '';
            const codeToSet = savedCode || defaultCode;
            
            editorRef.current.setValue(codeToSet);
            
            // Update model language
            const model = editorRef.current.getModel();
            if (monacoRef.current && model) {
                monacoRef.current.editor.setModelLanguage(model, newLang.id);
            }
        }
    }, [selectedLanguage.id]); // Removed mutable refs from dependencies

    const handleThemeChange = (theme: EditorTheme) => {
        setSelectedTheme(theme);
        if (typeof window !== 'undefined') { // Check for window for SSR
            localStorage.setItem('editor-theme', theme.id);
        }
        // Use the theme ID directly which now matches our custom theme definitions
        monacoRef.current?.editor.setTheme(theme.id);
        setIsThemeMenuOpen(false);
    };

    const handleFontSizeChange = (size: number) => {
        setFontSize(size);
        if (typeof window !== 'undefined') { // Check for window for SSR
            localStorage.setItem('editor-font-size', size.toString());
        }
        
        if (editorRef.current) {
            editorRef.current.updateOptions({ fontSize: size });
        }
    };

    const handleResetCode = () => {
        const defaultCode = DEFAULT_CODE[selectedLanguage.id] || '';
        editorRef.current?.setValue(defaultCode);
        if (typeof window !== 'undefined') { // Check for window for SSR
            localStorage.setItem(`code-${selectedLanguage.id}`, defaultCode);
        }
    };

    const getCurrentCode = (): string => {
        return editorRef.current?.getValue() || '';
    };

    const handleEditorDidMount = (editorInstance: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
        editorRef.current = editorInstance;
        monacoRef.current = monacoInstance;

        // Define custom themes
        defineMonacoThemes(monacoInstance); // Call the theme definition function

        // Apply the initial theme based on global dark mode state
        const initialThemeId = isDarkMode ? 'vs-dark' : 'vs-light'; // Use vs-dark/vs-light based on global state
        monacoInstance.editor.setTheme(initialThemeId);

        // Expose editor instance globally for AI assistant to access
        if (typeof window !== 'undefined') { // Check for window for SSR
             window.__MONACO_EDITOR__ = editorInstance;
        }

        // Pass editor instance to parent component if callback is provided
        if (onEditorMount) {
            onEditorMount(editorInstance);
        }
      
        // Try to load saved code for the current language
        const savedCode = typeof window !== 'undefined' ? localStorage.getItem(`code-${selectedLanguage.id}`) : null;
        const defaultCode = DEFAULT_CODE[selectedLanguage.id] || '';
        
        // Use saved code if available, otherwise use default code
        editorInstance.setValue(savedCode || defaultCode);
      
        // Use the theme ID instead of theme.theme to apply our custom themes
        if (selectedTheme && selectedTheme.id && monacoInstance.editor) { // Check if selectedTheme is available
             monacoInstance.editor.setTheme(selectedTheme.id);
        } else if (monacoInstance.editor) { // Fallback to default theme if selectedTheme is not available
             monacoInstance.editor.setTheme(EDITOR_THEMES[0].id);
        }

        // Set font size based on saved value
        editorInstance.updateOptions({ fontSize });
      
        // Run on Ctrl+Enter
        editorInstance.addCommand(
          monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter,
          () => {
            const code = editorInstance.getValue();
            if (code && onExecute) {
              onExecute(code);
            }
          }
        );
        
        // Format code on Shift+Alt+F
        editorInstance.addCommand(
          monacoInstance.KeyMod.Shift | monacoInstance.KeyMod.Alt | monacoInstance.KeyCode.KeyF,
          () => {
            editorInstance.getAction('editor.action.formatDocument')?.run();
          }
        );
    };

    // Effect to sync Monaco theme with global theme state
    useEffect(() => {
      if (monacoRef.current) {
        const themeId = isDarkMode ? 'vs-dark' : 'vs-light';
        monacoRef.current.editor.setTheme(themeId);
      }
    }, [isDarkMode]); // Removed monacoRef.current from dependencies

    return {
        selectedLanguage,
        selectedTheme,
        fontSize,
        isThemeMenuOpen,
        setIsThemeMenuOpen,
        handleEditorDidMount,
        handleLanguageChange,
        handleThemeChange,
        handleFontSizeChange,
        handleResetCode,
        getCurrentCode,
        editorRef // Expose editorRef
    };
} 