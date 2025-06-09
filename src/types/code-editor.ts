// Remove unused import
// import { User } from '@supabase/supabase-js';

// Types for Code Execution
export interface CodeExecutionResult {
  output: string;
  error?: string;
  language?: string; // Added language and version based on neocompiler
  version?: string;
}

export interface PistonResponse {
  language: string;
  version: string;
  run: {
    output: string;
    stderr: string;
    code: number;
    signal: string | null;
  };
}

// Types for Editor Configuration
export interface SupportedLanguage {
  id: string;
  name: string;
  extension: string;
  version: string;
  monacoLanguage: string;
}

export interface EditorTheme {
  id: string;
  name: string;
  theme: string;
}

// Types for AI Assistance
export interface AIResponse {
  success: boolean; // Added success flag from neocompiler type
  suggestion: string | null;
  explanation: string | null; // Changed from string to string | null
  strengths?: string[]; // Added strengths and improvements
  improvements?: string[];
  score?: number; // Added score
  error?: string | null; // Added error from neocompiler type
}

export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  onInsertCode: (code: string) => void;
}

export type AIAssistanceMode = 'chat' | 'complete' | 'explain' | 'optimize' | 'debug';

// Type for Custom Input component
export interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
}

// Type for Output Panel component
export interface OutputPanelProps {
  output: string;
  error?: string;
  customInput: string;
  onInputChange: (input: string) => void;
  isExecuting: boolean;
}

// Type for Language Selector component
export interface LanguageSelectorProps {
  selectedLanguageId: string;
  onSelectLanguage: (languageId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  maxHeight?: number | string; // For vertical scroll container
  showTitle?: boolean;
}

// Types for Code Snippets (Adjusted for CertifyO's Supabase user)
export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  version?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string; // Use Supabase user ID
  isPublic: boolean;
  likes: number;
  views: number;
  tags: string[];
  shareableLink?: string | null;
  // Additional creator information (optional, depending on how you fetch this)
  creatorName?: string | null;
  creatorPhotoURL?: string | null;
  creatorUsername?: string | null;
}

export interface ShareableLink {
  id: string;
  snippetId: string;
  expiresAt: Date | null;
  accessCount: number;
}

// Adjusted EditorState based on Compiler.tsx and neocompiler types
export interface EditorState {
  code: string;
  language: string;
  input: string;
  output: string;
  error: string | null | undefined; // Error can be undefined from executeCode
  isExecuting: boolean;
  isAiAssisting: boolean; // Retained AI assistance state
  isSaveDialogOpen: boolean; // Added save dialog state
  loadingSnippet: boolean; // Added snippet loading state
  loadingError: string | null; // Added snippet loading error state
  showSuggestion: boolean; // Added AI suggestion panel state
  suggestionLoading: boolean; // Added AI suggestion loading state
  suggestionData: {
    suggestion: string;
    strengths: string[];
    improvements: string[];
    score?: number;
  } | null; // Added AI suggestion data
}

export type _User = {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}; 