import type * as monaco from 'monaco-editor';
import { SupportedLanguage } from '@/types/code-editor';

export const DEFAULT_CODE: Record<string, string> = {
    typescript: `console.log("Welcome to CertifyO Code Editor");`,
    javascript: `console.log("Welcome to CertifyO Code Editor");`,
    python: `print("Welcome to CertifyO Code Editor")`,
    java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Welcome to CertifyO Code Editor");\n    }\n}`,
    go: `package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Welcome to CertifyO Code Editor\")\n}`,
    rust: `fn main() {\n    println!(\"Welcome to CertifyO Code Editor\");\n}`,
    ruby: `puts \"Welcome to CertifyO Code Editor\"`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Welcome to CertifyO Code Editor\";\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf(\"Welcome to CertifyO Code Editor\\n\");\n    return 0;\n}`
};

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    { id: 'java', name: 'Java', extension: 'java', version: '15.0.2', monacoLanguage: 'java' },
    { id: 'cpp', name: 'C++', extension: 'cpp', version: '10.2.0', monacoLanguage: 'cpp' },
    { id: 'c', name: 'C', extension: 'c', version: '10.2.0', monacoLanguage: 'c' },
    { id: 'python', name: 'Python', extension: 'py', version: '3.10.0', monacoLanguage: 'python' },
    { id: 'javascript', name: 'JavaScript', extension: 'js', version: '18.15.0', monacoLanguage: 'javascript' },
    { id: 'typescript', name: 'TypeScript', extension: 'ts', version: '5.0.3', monacoLanguage: 'typescript' },
    { id: 'go', name: 'Go', extension: 'go', version: '1.16.2', monacoLanguage: 'go' },
    { id: 'rust', name: 'Rust', extension: 'rs', version: '1.68.2', monacoLanguage: 'rust' },
    { id: 'ruby', name: 'Ruby', extension: 'rb', version: '3.0.1', monacoLanguage: 'ruby' }
];

export const EDITOR_THEMES = [
    { id: 'neo-dark', name: 'Neo Dark', theme: 'neo-dark' },
    { id: 'github-dark', name: 'GitHub Dark', theme: 'github-dark' },
    { id: 'vs-dark', name: 'VS Code Dark', theme: 'vs-dark' },
    { id: 'dracula', name: 'Dracula Dark', theme: 'dracula' },
    { id: 'night-owl', name: 'Night Owl', theme: 'night-owl' },
    { id: 'hc-black', name: 'High Contrast Dark', theme: 'hc-black' },
    { id: 'vs-light', name: 'VS Code Light', theme: 'light' },
    { id: 'hc-light', name: 'High Contrast Light', theme: 'hc-light' },
];

export const EDITOR_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true,
    cursorBlinking: 'phase',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
}; 