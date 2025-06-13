'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import dynamic from 'next/dynamic';
import { Play, CheckCircle, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

// Mock question data - will be replaced with actual data later
const mockQuestion = {
  id: '1',
  title: 'Create a React Counter Component',
  description: `
### Problem Statement

Build a simple counter component with the following requirements:

1.  **Display a number** starting from 0.
2.  Add an **increment button** that increases the number by 1.
3.  Add a **decrement button** that decreases the number by 1.
4.  The counter **should not go below 0**.

### Example

\`\`\`
// Initial state
Counter: 0

// After clicking increment
Counter: 1

// After clicking decrement
Counter: 0

// After clicking decrement when counter is 0
Counter: 0
\`\`\`

### Instructions

*   Write your React component in the editor below.
*   Ensure your component handles state and renders correctly.
*   Test your component using the 'Run Code' button and check the live preview.
*   Submit your solution when you are confident it meets all requirements.
`,
  category: 'react',
  difficulty: 'easy',
  initialCode: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - 1));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Counter: {count}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >Increment</button>
        <button 
          onClick={decrement}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >Decrement</button>
      </div>
    </div>
  );
}

export default Counter;

// To run this in the live preview, the code needs to be wrapped like this:
// ReactDOM.render(<Counter />, document.getElementById('root'));
`,
  testCases: [
    {
      input: 'click increment',
      expectedOutput: '1',
    },
    {
      input: 'click decrement',
      expectedOutput: '0',
    },
  ],
};

export default function QuestionPage({
  params,
}: {
  params: { category: string; questionId: string };
}) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [code, setCode] = useState(mockQuestion.initialCode);
  const [output, setOutput] = useState(''); // This will now be for console logs/test results
  const [iframeSrcDoc, setIframeSrcDoc] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initial render of the code in the iframe
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
          // Capture console logs and errors from iframe
          const originalConsoleLog = console.log;
          console.log = (...args) => {
            originalConsoleLog(...args);
            parent.postMessage({ type: 'log', message: args.map(arg => String(arg)).join(' ') }, '*');
          };
          window.addEventListener('error', (e) => {
            parent.postMessage({ type: 'error', message: e.message }, '*');
          });
          window.addEventListener('unhandledrejection', (e) => {
            parent.postMessage({ type: 'error', message: e.reason }, '*');
          });
          
          try {
            ${htmlCode}
          } catch (error) {
            parent.postMessage({ type: 'error', message: error.message }, '*');
          }
        </script>
      </body>
      </html>
    `;
    setIframeSrcDoc(fullHtml);
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure the message is from our iframe and not other sources
      if (event.origin === window.location.origin && event.source) {
        // You might need a more robust way to check if it's *our* iframe
        // For now, checking origin and existence of source is a start
        if (event.data.type === 'log') {
          setOutput(prev => prev + event.data.message + '\n');
        } else if (event.data.type === 'error') {
          setOutput(prev => prev + `Error: ${event.data.message}\n`);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      updateIframeContent(value);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(''); // Clear previous console output
    updateIframeContent(code); // Trigger iframe re-render to execute code
    setTimeout(() => {
      setOutput(prev => prev + 'Code executed. Check live preview and console output.\n');
      setIsRunning(false);
    }, 500);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // TODO: Implement actual submission logic (e.g., send code to backend for evaluation)
    setTimeout(() => {
      setOutput(prev => prev + '\nSubmission simulated.');
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-[#1A1A2E]' : 'bg-gray-100'}`}>
      {/* Main content area: Three vertical panels */}
      <PanelGroup direction="horizontal" className="flex-1">
        {/* Problem Statement Section (Left Panel) */}
        <Panel defaultSize={30} minSize={20} className={`p-6 overflow-y-auto ${isDarkMode ? 'bg-[#282844] border-[#3A3A5A] text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}>
          <h2 className="text-xl font-bold mb-4">Problem Statement</h2>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {mockQuestion.description}
            </ReactMarkdown>
          </div>
        </Panel>

        <PanelResizeHandle className={`w-2 h-full cursor-col-resize ${
          isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
        }`} />

        {/* Code Editor Section (Middle Panel) */}
        <Panel defaultSize={40} minSize={20} className={`flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <MonacoEditor
            height="100%"
            language="javascript"
            theme={isDarkMode ? 'vs-dark' : 'light'}
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Panel>

        <PanelResizeHandle className={`w-2 h-full cursor-col-resize ${
          isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
        }`} />

        {/* Browser Preview + Console Section (Right Panel) */}
        <Panel defaultSize={30} minSize={20} className="flex flex-col">
          {/* Header for Browser and Console with buttons */}
          <div className={`p-3 border-b flex justify-between items-center ${
            isDarkMode ? 'border-[#3A3A5A] bg-[#222238]' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center space-x-2">
              <h3 className={`text-md font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Browser</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                mockQuestion.difficulty === 'easy'
                  ? isDarkMode
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-green-100 text-green-800'
                  : mockQuestion.difficulty === 'medium'
                  ? isDarkMode
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-yellow-100 text-yellow-800'
                  : isDarkMode
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-red-100 text-red-800'
              }`}>
                {mockQuestion.difficulty.charAt(0).toUpperCase() + mockQuestion.difficulty.slice(1)}
              </span>
            </div>
            {/* Run and Submit Buttons here */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-[#6C5CE7] text-white hover:bg-[#7b6be7]'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <Play className="h-4 w-4 mr-1" />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className={`flex items-center px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-[#28A745] text-white hover:bg-[#2fb84a]'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {isSubmitted ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          <PanelGroup direction="vertical" className="flex-1">
            <Panel defaultSize={70} minSize={30} className={`overflow-hidden ${
              isDarkMode ? 'bg-[#222238]' : 'bg-white'
            }`}>
              <iframe
                srcDoc={iframeSrcDoc}
                title="Live Preview"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-forms allow-modals allow-popups allow-presentation allow-same-origin"
              ></iframe>
            </Panel>

            <PanelResizeHandle className={`h-2 w-full cursor-row-resize ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
            }`} />

            {/* Console Output */}
            <Panel defaultSize={30} minSize={20} className={`overflow-y-auto font-mono text-xs p-3 ${
              isDarkMode ? 'bg-[#202131] text-gray-300' : 'bg-gray-50 text-gray-600'
            }`}>
              <h4 className={`font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Console Output:
              </h4>
              <pre>{output || '// Console output will appear here.'}</pre>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
} 