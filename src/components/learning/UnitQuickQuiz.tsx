import React, { useState } from 'react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface UnitQuickQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

const UnitQuickQuiz: React.FC<UnitQuickQuizProps> = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(a => a.map((ans, i) => (i === qIdx ? optIdx : ans)));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (onComplete) {
      const score = answers.reduce((acc: number, ans: number, i: number) => acc + (ans === questions[i].correctAnswer ? 1 : 0), 0);
      onComplete(score);
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto rounded-2xl shadow-xl bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-gray-700 overflow-hidden" aria-label="Quick Quiz">
      <div className="bg-indigo-600 text-white px-6 py-4 text-xl font-bold tracking-wide">Quick Quiz</div>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="p-6 space-y-6">
        {questions.map((q, i) => (
          <fieldset key={q.id} className="mb-4" aria-labelledby={`question-${q.id}`}> 
            <legend id={`question-${q.id}`} className="font-medium mb-2 text-gray-900 dark:text-gray-100">{i + 1}. {q.question}</legend>
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <label key={j} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition-colors ${submitted ? (j === q.correctAnswer ? 'bg-green-50 dark:bg-green-900/30' : answers[i] === j ? 'bg-red-50 dark:bg-red-900/30' : '') : 'hover:bg-indigo-50 dark:hover:bg-gray-800'}`}>
                  <input
                    type="radio"
                    name={`quiz-q${i}`}
                    value={j}
                    checked={answers[i] === j}
                    onChange={() => handleSelect(i, j)}
                    disabled={submitted}
                    aria-checked={answers[i] === j}
                    aria-label={opt}
                    className="accent-indigo-600"
                  />
                  <span className="flex-1">{opt}</span>
                  {submitted && j === q.correctAnswer && <span className="ml-1 text-green-600 font-bold">✓</span>}
                  {submitted && answers[i] === j && answers[i] !== q.correctAnswer && <span className="ml-1 text-red-600 font-bold">✗</span>}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        {!submitted ? (
          <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition-colors w-full" aria-label="Submit Quiz">Submit</button>
        ) : (
          <div className="mt-4 font-semibold text-center text-lg text-indigo-700 dark:text-indigo-300">Score: {answers.reduce((acc: number, ans: number, i: number) => acc + (ans === questions[i].correctAnswer ? 1 : 0), 0)} / {questions.length}</div>
        )}
      </form>
    </div>
  );
};

export default UnitQuickQuiz; 