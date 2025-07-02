import React from 'react';
import { CheckCircle, XCircle, ArrowLeft, Award, Share2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  onReturnToQuizzes: () => void;
  isDarkMode: boolean;
  subject: string;
  questions?: { id: number; text: string; options: string[]; correctAnswer: number; }[];
  selectedAnswers?: number[];
}

export default function QuizResults({ 
  correctAnswers, 
  totalQuestions, 
  onReturnToQuizzes,
  isDarkMode,
  subject,
  questions,
  selectedAnswers
}: QuizResultsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassing = percentage >= 70;
  
  // Determine feedback based on score
  const getFeedback = () => {
    if (percentage >= 90) return "Excellent! You've mastered this subject.";
    if (percentage >= 80) return "Great job! You have a strong understanding of this topic.";
    if (percentage >= 70) return "Good work! You've passed with a solid score.";
    if (percentage >= 60) return "Not bad, but there's room for improvement.";
    if (percentage >= 50) return "You're on the right track, but need more practice.";
    return "Keep studying! You'll improve with more practice.";
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                isPassing
                  ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                  : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
              }`}
            >
              {isPassing ? (
                <CheckCircle className="h-12 w-12" />
              ) : (
                <XCircle className="h-12 w-12" />
              )}
            </motion.div>
            
            <h2 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {isPassing ? 'Congratulations!' : 'Quiz Completed'}
            </h2>
            
            <p className={`text-xl mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {getFeedback()}
            </p>
            
            <div className="flex justify-center items-center mt-4">
              <Award className={`h-6 w-6 mr-2 ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
              <p className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {subject} Quiz
              </p>
            </div>
          </div>
          
          <div className={`flex justify-center mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className={`stroke-current ${
                    isDarkMode ? 'text-gray-700' : 'text-gray-200'
                  }`}
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className={`stroke-current ${
                    isPassing
                      ? isDarkMode ? 'text-green-500' : 'text-green-600'
                      : isDarkMode ? 'text-red-500' : 'text-red-600'
                  }`}
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (percentage / 100) * 251.2}
                  style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`fill-current ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } text-2xl font-bold`}
                >
                  {percentage}%
                </text>
              </svg>
            </div>
          </div>
          
          <div className={`flex justify-center mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <div className="text-center">
              <p className="text-lg">
                You answered <span className="font-bold">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReturnToQuizzes}
              className={`flex items-center justify-center px-6 py-3 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              } transition-colors`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return to Quizzes
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center px-6 py-3 rounded-lg ${
                isDarkMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Results
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center px-6 py-3 rounded-lg ${
                isDarkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } transition-colors`}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Certificate
            </motion.button>
          </div>
          
          {/* Detailed per-question report */}
          {questions && selectedAnswers && (
            <div className="mt-12">
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Detailed Report</h3>
              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const userAnswerIdx = selectedAnswers[idx];
                  const isCorrect = userAnswerIdx === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-lg p-6 border shadow-sm ${
                        isDarkMode
                          ? isCorrect
                            ? 'bg-green-900/20 border-green-700'
                            : userAnswerIdx === undefined
                              ? 'bg-gray-800 border-gray-700'
                              : 'bg-red-900/20 border-red-700'
                          : isCorrect
                            ? 'bg-green-50 border-green-300'
                            : userAnswerIdx === undefined
                              ? 'bg-gray-100 border-gray-300'
                              : 'bg-red-50 border-red-300'
                      }`}
                    >
                      <div className="mb-2 flex items-center">
                        <span className={`font-semibold mr-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Q{idx + 1}:</span>
                        <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{q.text}</span>
                      </div>
                      <div className="space-y-1 ml-6">
                        {q.options.map((opt, optIdx) => {
                          const isUser = userAnswerIdx === optIdx;
                          const isAns = q.correctAnswer === optIdx;
                          return (
                            <div
                              key={optIdx}
                              className={`px-3 py-2 rounded flex items-center gap-2 text-sm font-medium
                                ${isAns && isUser ? (isDarkMode ? 'bg-green-700 text-white' : 'bg-green-200 text-green-900')
                                  : isAns ? (isDarkMode ? 'bg-green-900/40 text-green-300' : 'bg-green-50 text-green-700')
                                  : isUser && !isAns ? (isDarkMode ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-700')
                                  : isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}
                              `}
                            >
                              {isUser && isAns && <span>✅</span>}
                              {isUser && !isAns && <span>❌</span>}
                              {isAns && !isUser && <span>✔</span>}
                              <span>{opt}</span>
                              {isUser && <span className="ml-2 italic">(Your answer)</span>}
                              {isAns && <span className="ml-2 italic">(Correct answer)</span>}
                            </div>
                          );
                        })}
                        {userAnswerIdx === undefined && (
                          <div className="text-xs text-gray-400 italic mt-1">Not answered</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}