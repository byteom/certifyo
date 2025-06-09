import { AIResponse } from '@/types/code-editor';

interface AIRequestParams {
    prompt: string;
    code?: string;
    language?: string;
}

// Gemini API endpoint
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Get API key from localStorage or fallback to env variable
const getGeminiApiKey = (): string => {
    const localStorageKey = typeof window !== 'undefined' ? localStorage.getItem('gemini-api-key') : null;
    // Use localStorage key if available, otherwise use the one from .env (Next.js format)
    return localStorageKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
};

export async function getAIAssistance({
    prompt,
    code = '',
    language = 'typescript'
}: AIRequestParams): Promise<AIResponse> {
    const apiKey = getGeminiApiKey();

    if (!apiKey || apiKey === 'your-key-here') {
        // Return mock/demo response if API key is missing or invalid
        return {
            success: true,
            suggestion: `// Demo AI response\n// Your prompt: ${prompt}\n// Your code:\n${code}\n// Language: ${language}\n\n// This is a mock response. Set a valid Gemini API key for real AI suggestions.`,
            error: null,
            explanation: null
        };
    }

    try {
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `You are a helpful coding assistant specialized in ${language}. \n                                Provide concise, working code examples and explanations.\n                                \n                                ${prompt}\n                                \n                                Here's my current code:\n                                \`\`\`${language}\n                                ${code}\n                                \`\`\``
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        return {
            success: true,
            suggestion: result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated",
            error: null,
            explanation: null
        };
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        return {
            success: false,
            error: errorMsg,
            suggestion: null,
            explanation: null
        };
    }
}

// Function to generate code completions
export async function getCodeCompletions({
    code,
    language = 'typescript'
}: {
    code: string;
    language?: string;
}): Promise<AIResponse> {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
        return {
            success: false,
            error: 'Gemini API key not found. Please set your API key in settings.',
            suggestion: null,
            explanation: null
        };
    }

    try {
        const prompt = `Complete the following ${language} code:\n\n${code}`;

        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `You are a helpful ${language} coding assistant. Complete the code below in a concise way. \n                                Only respond with the completed code that would naturally continue from what I provided, with no explanations.\n                                \n                                ${prompt}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 500
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const result = await response.json();
        return {
            success: true,
            suggestion: result.candidates?.[0]?.content?.parts?.[0]?.text || "No completion generated",
            error: null,
            explanation: null
        };
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        return {
            success: false,
            error: errorMsg,
            suggestion: null,
            explanation: null
        };
    }
}

// Function for explaining code
export async function explainCode({
    code,
    language = 'typescript'
}: {
    code: string;
    language?: string;
}): Promise<AIResponse> {
    const apiKey = getGeminiApiKey();

    if (!apiKey) {
        return {
            success: false,
            error: 'Gemini API key not found. Please set your API key in settings.',
            suggestion: null,
            explanation: null
        };
    }

    try {
        const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `You are a helpful coding tutor. Explain the following code in a clear, concise way.\n                                \n                                Please explain this ${language} code:\n                                \n                                \`\`\`${language}\n                                ${code}\n\`\`\``
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const result = await response.json();
        return {
            success: true,
            suggestion: result.candidates?.[0]?.content?.parts?.[0]?.text || "No explanation generated",
            error: null,
            explanation: null
        };
    } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        return {
            success: false,
            error: errorMsg,
            suggestion: null,
            explanation: null
        };
    }
}