import { CodeExecutionResult } from '@/types/code-editor';
import { SUPPORTED_LANGUAGES } from '@/constants/editor-config';

// Map our language IDs to what Piston API expects
const PISTON_LANGUAGE_MAP: Record<string, string> = {
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'python': 'python',
  'javascript': 'javascript',
  'typescript': 'typescript',
  'go': 'go',
  'rust': 'rust',
  'ruby': 'ruby'
};

export async function executeCode(
  code: string,
  language: string,
  version: string,
  input: string = ''
): Promise<CodeExecutionResult> {
  try {
    // Get the correct language info for the language ID
    const languageInfo = SUPPORTED_LANGUAGES.find(lang => lang.id === language);
    
    if (!languageInfo) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    // Map our language ID to what Piston expects
    const pistonLanguage = PISTON_LANGUAGE_MAP[language] || language;
    
    const payload = {
      language: pistonLanguage,
      version: languageInfo.version,
      files: [
        {
          name: `main.${languageInfo.extension}`,
          content: code,
        },
      ],
      stdin: input,
    };

    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      output: result.run.output,
      error: result.run.stderr,
    };
  } catch (err) {
    console.error('Error executing code:', err);
    return {
      output: '',
      error: err instanceof Error ? err.message : 'An error occurred while executing the code',
    };
  }
} 