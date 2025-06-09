import type { editor } from 'monaco-editor';

// Custom theme definitions for Monaco Editor
export const defineMonacoThemes = (monaco: { editor: typeof editor }) => {
  // Neo Dark theme - Custom theme matching the landing page code snippet
  monaco.editor.defineTheme('neo-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4' },      // bluish gray
      { token: 'keyword', foreground: 'a78bfa' },      // purple-400
      { token: 'string', foreground: '4ade80' },       // green-400
      { token: 'number', foreground: 'fcd34d' },       // yellow-300
      { token: 'operator', foreground: 'f472b6' },     // pink-400
      { token: 'function', foreground: '60a5fa' },     // blue-400
      { token: 'variable', foreground: 'fb923c' },     // orange-400
      { token: 'type', foreground: '8b5cf6' },         // violet-500
      { token: 'delimiter', foreground: 'e2e8f0' },    // slate-200
      { token: 'regexp', foreground: 'f87171' },       // red-400
      { token: 'tag', foreground: '2dd4bf' },          // teal-400
    ],
    colors: {
      'editor.background': '#030712',                  // gray-950 (much darker)
      'editor.foreground': '#d1d5db',                  // gray-300
      'editor.lineHighlightBackground': '#1e293b',     // slate-800
      'editorCursor.foreground': '#a78bfa',            // purple-400
      'editor.selectionBackground': '#312e81',         // indigo-900
      'editorLineNumber.foreground': '#6b7280',        // gray-500
      'editorLineNumber.activeForeground': '#a78bfa',  // purple-400
      'editorIndentGuide.background': '#1e293b',       // slate-800
      'editor.selectionHighlightBackground': '#374151', // gray-700
      'editorSuggestWidget.background': '#0f172a',     // slate-900
      'editorSuggestWidget.border': '#1e293b',         // slate-800
      'editorSuggestWidget.selectedBackground': '#312e81', // indigo-900
    }
  });

  // GitHub Dark theme
  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a737d' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'number', foreground: '79c0ff' },
      { token: 'operator', foreground: 'f8f8f2' },
      { token: 'function', foreground: 'd2a8ff' },
      { token: 'variable', foreground: 'ffa657' },
      { token: 'type', foreground: '79c0ff' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editor.lineHighlightBackground': '#161b22',
      'editorCursor.foreground': '#c9d1d9',
      'editor.selectionBackground': '#3b5070',
      'editorLineNumber.foreground': '#6e7681',
      'editorLineNumber.activeForeground': '#c9d1d9',
      'editorIndentGuide.background': '#21262d',
    }
  });

  // Dracula Dark theme
  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'operator', foreground: 'f8f8f2' },
      { token: 'function', foreground: '50fa7b' },
      { token: 'variable', foreground: 'ffb86c' },
      { token: 'type', foreground: '8be9fd', fontStyle: 'italic' },
    ],
    colors: {
      'editor.background': '#282a36',
      'editor.foreground': '#f8f8f2',
      'editor.lineHighlightBackground': '#44475a',
      'editorCursor.foreground': '#f8f8f2',
      'editor.selectionBackground': '#44475a',
      'editorLineNumber.foreground': '#6272a4',
      'editorLineNumber.activeForeground': '#f8f8f2',
      'editorIndentGuide.background': '#424450',
    }
  });

  // Night Owl theme
  monaco.editor.defineTheme('night-owl', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '637777' },
      { token: 'keyword', foreground: 'c792ea' },
      { token: 'string', foreground: 'ecc48d' },
      { token: 'number', foreground: 'f78c6c' },
      { token: 'operator', foreground: '7fdbca' },
      { token: 'function', foreground: '82aaff' },
      { token: 'variable', foreground: 'd7dbe0' },
      { token: 'type', foreground: 'ffcb8b' },
    ],
    colors: {
      'editor.background': '#011627',
      'editor.foreground': '#d6deeb',
      'editor.lineHighlightBackground': '#0e2c45',
      'editorCursor.foreground': '#80a4c2',
      'editor.selectionBackground': '#1d3b53',
      'editorLineNumber.foreground': '4b6479',
      'editorLineNumber.activeForeground': '#c5e4fd',
      'editorIndentGuide.background': '#0e2c45',
    }
  });
}; 