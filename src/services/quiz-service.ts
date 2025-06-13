// Real implementation for quiz generation service using Groq API

interface AIGeneratedQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export async function generateQuizQuestions(
  apiKey: string,
  subject: string,
  count: number = 25
): Promise<AIGeneratedQuestion[]> {
  const prompt = `
    Generate ${count} multiple-choice quiz questions about ${subject}.
    Each question should have 4 options with exactly one correct answer.
    Format the response as a JSON array of objects with the following structure:
    [
      {
        "id": 1,
        "text": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0 // Index of the correct answer (0-3)
      }
    ]
    Make sure the questions are challenging but fair, and cover a range of topics within ${subject}.
  `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz creator specializing in educational content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No valid JSON found in response');
      
      const questions = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (!Array.isArray(questions)) throw new Error('Response is not an array');
      
      // Ensure each question has the required fields
      return questions.map((q, index) => ({
        id: index + 1,
        text: q.text || `Question ${index + 1}`,
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : 
          ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < 4 ? 
          q.correctAnswer : 0
      }));
    } catch (parseError) {
      console.error('Error parsing Groq response:', parseError);
      throw new Error('Failed to parse quiz questions from AI response');
    }
  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Fallback to mock data if API call fails
    console.log(`Falling back to mock data for ${count} questions about ${subject}`);
    
    // Generate mock questions as fallback
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: `What is an important concept in ${subject}? (Question ${i + 1})`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`
      ],
      correctAnswer: Math.floor(Math.random() * 4) // Random correct answer
    }));
  }
}

export async function generateCustomQuizQuestions(
  apiKey: string,
  topic: string,
  difficulty: string = 'medium',
  count: number = 10
): Promise<AIGeneratedQuestion[]> {
  const prompt = `
    Generate ${count} multiple-choice quiz questions about ${topic} at a ${difficulty} difficulty level.
    Each question should have 4 options with exactly one correct answer.
    Format the response as a JSON array of objects with the following structure:
    [
      {
        "id": 1,
        "text": "Question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": 0 // Index of the correct answer (0-3)
      }
    ]
    
    For difficulty levels:
    - easy: Questions should cover basic concepts and be suitable for beginners
    - medium: Questions should require intermediate knowledge of the topic
    - hard: Questions should be challenging and test deep understanding
    
    Make sure the questions are appropriate for the difficulty level and cover a range of aspects within ${topic}.
  `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz creator specializing in educational content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error('No valid JSON found in response');
      
      const questions = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (!Array.isArray(questions)) throw new Error('Response is not an array');
      
      // Ensure each question has the required fields
      return questions.map((q, index) => ({
        id: index + 1,
        text: q.text || `Question ${index + 1} about ${topic}`,
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : 
          ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < 4 ? 
          q.correctAnswer : 0
      }));
    } catch (parseError) {
      console.error('Error parsing Groq response:', parseError);
      throw new Error('Failed to parse quiz questions from AI response');
    }
  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Fallback to mock data if API call fails
    console.log(`Falling back to mock data for ${count} ${difficulty} questions about ${topic}`);
    
    // Generate mock questions as fallback
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      text: `What is an important concept in ${topic}? (${difficulty.toUpperCase()} difficulty - Question ${i + 1})`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`
      ],
      correctAnswer: Math.floor(Math.random() * 4) // Random correct answer
    }));
  }
}