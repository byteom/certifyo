'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import dynamic from 'next/dynamic';
import { Play, CheckCircle } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

const mockQuestion = {
  id: '1',
  title: 'Create a React Counter Component',
  description: 'Build a simple counter component',
  category: 'react',
  difficulty: 'easy',
  initialCode: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(Math.max(0, count - 1))}>Decrement</button>
    </div>
  );
}

export default Counter;`,
};

export default function QuestionPageClient({
  params,
}: {
  params: { category: string; questionId: string };
}) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [code, setCode] = useState(mockQuestion.initialCode);
  const [output, setOutput] = useState('');
  const [iframeSrcDoc, setIframeSrcDoc] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    updateIframeContent(code);
  }, [code]);

  const updateIframeContent = (htmlCode: string) => {
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Live Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: ${isDarkMode ? '#202131' : '#ffffff'};
            color: ${isDarkMode ? '#d4d4d4' : '#1e1e1e'};
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${htmlCode}
          ReactDOM.render(<Counter />, document.getElementById('root'));
        </script>
      </body>
      </html>
    `;
    setIframeSrcDoc(fullHtml);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    updateIframeContent(code);
    setIsRunning(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50}>
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="javascript"
                  theme={isDarkMode ? 'vs-dark' : 'light'}
                  value={code}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                  }}
                />
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={isRunning}
                  >
                    <Play size={16} />
                    Run Code
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={isSubmitted}
                  >
                    <CheckCircle size={16} />
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-1 bg-gray-200 dark:bg-gray-700" />
          <Panel defaultSize={50}>
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <iframe
                  srcDoc={iframeSrcDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
              <div className="p-4 border-t">
                <div className="font-mono text-sm whitespace-pre-wrap">{output}</div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
} 