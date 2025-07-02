import { AIResponse } from '@/types/code-editor';

interface AIRequestParams {
    prompt: string;
    code?: string;
    language?: string;
    apiKey: string;
}

// Groq API endpoint
const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export async function getAIAssistance({
    prompt,
    code = '',
    language = 'typescript',
    apiKey
}: AIRequestParams): Promise<AIResponse> {
    if (!apiKey) {
        return {
            success: false,
            suggestion: null,
            explanation: null,
            error: 'Groq API key not found. Please set your API key in your profile.'
        };
    }

    try {
        const response = await fetch(GROQ_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful AI assistant specialized in ${language}. Provide concise, working code examples and explanations.`
                    },
                    {
                        role: 'user',
                        content: `${prompt}\n\n${code ? `Here is my code:\n\n${code}` : ''}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Groq API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const suggestion = data.choices?.[0]?.message?.content || 'No response generated.';
        return {
            success: true,
            suggestion,
            explanation: null,
            error: null
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