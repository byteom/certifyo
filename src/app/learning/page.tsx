"use client";

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { BookOpen, Video, Play, ChevronRight, ChevronDown, Clock, Users, Star } from 'lucide-react';
import { courses, type Course, type Unit } from '@/data/courses';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { getAIAssistance } from '@/services/ai-assistance';
import UnitQuickQuiz, { QuizQuestion } from '@/components/learning/UnitQuickQuiz';
import LearningUnitNavigation from '@/components/learning/LearningUnitNavigation';
import { generateQuizQuestions } from '@/services/quiz-service';

export default function LearningPage() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const { user } = useAuthStore();
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [groqApiKey, setGroqApiKey] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setSelectedUnit(null);
    setExpandedChapters(new Set());
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  // Fetch Groq API key on mount
  useEffect(() => {
    async function fetchGroqKey() {
      if (!user?.id) return;
      const { data } = await supabase.from('profiles').select('groq_api_key').eq('id', user.id).single();
      setGroqApiKey(data?.groq_api_key || null);
    }
    fetchGroqKey();
  }, [user]);

  // Helper to get current/next/prev unit
  const flatUnits = selectedCourse ? selectedCourse.chapters.flatMap(ch => ch.units) : [];
  const currentUnitIdx = selectedUnit ? flatUnits.findIndex(u => u.id === selectedUnit.id) : -1;
  const prevUnit = currentUnitIdx > 0 ? flatUnits[currentUnitIdx - 1] : null;
  const nextUnit = currentUnitIdx >= 0 && currentUnitIdx < flatUnits.length - 1 ? flatUnits[currentUnitIdx + 1] : null;

  const handlePrev = () => { if (prevUnit) setSelectedUnit(prevUnit); };
  const handleNext = () => { if (nextUnit) setSelectedUnit(nextUnit); };
  const handleAskAI = () => setAiPanelOpen(true);

  const handleGenerateQuiz = async () => {
    if (!selectedUnit || !groqApiKey) return;
    setQuizLoading(true);
    setQuizError(null);
    try {
      const questions = await generateQuizQuestions(groqApiKey, selectedUnit.title, 3);
      setQuizQuestions(questions.map((q, i) => ({
        id: String(i + 1),
        question: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to generate quiz.';
      setQuizError(msg);
    } finally {
      setQuizLoading(false);
    }
  };

  if (selectedCourse) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-gray-600'}`} />
                </button>
                <div>
                  <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCourse.title}
                  </h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {selectedCourse.instructor}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedCourse.duration}
                </span>
                <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Users className="h-4 w-4 mr-1" />
                  {selectedCourse.students.toLocaleString()}
                </span>
                <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  {selectedCourse.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className={`rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Course Content
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {selectedCourse.chapters.map((chapter) => (
                      <div key={chapter.id}>
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                            isDarkMode 
                              ? 'hover:bg-gray-700 text-white' 
                              : 'hover:bg-gray-50 text-gray-900'
                          }`}
                        >
                          <span className="font-medium">{chapter.title}</span>
                          {expandedChapters.has(chapter.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        
                        {expandedChapters.has(chapter.id) && (
                          <div className="ml-4 mt-2 space-y-1">
                            {chapter.units.map((unit) => (
                              <button
                                key={unit.id}
                                onClick={() => setSelectedUnit(unit)}
                                className={`w-full flex items-center justify-between p-2 rounded text-left text-sm transition-colors ${
                                  selectedUnit?.id === unit.id
                                    ? isDarkMode 
                                      ? 'bg-indigo-600 text-white' 
                                      : 'bg-indigo-100 text-indigo-900'
                                    : isDarkMode 
                                      ? 'hover:bg-gray-700 text-gray-300' 
                                      : 'hover:bg-gray-100 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center">
                                  <Play className="h-3 w-3 mr-2" />
                                  <span className="truncate">{unit.title}</span>
                                </div>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {unit.duration}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedUnit ? (
                <div className="space-y-6">
                  {/* Video Player */}
                  <div className={`rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(selectedUnit.videoUrl)}
                        title={selectedUnit.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Action Buttons Below Video */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {/* Download Notes Button */}
                    <button
                      onClick={() => {
                        // Download a sample notes file (Markdown)
                        const blob = new Blob([
                          `# Notes for: ${selectedUnit.title}\n\n- Key points for this unit...\n- More notes here...`], { type: 'text/markdown' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${selectedUnit.title.replace(/\s+/g, '_').toLowerCase()}_notes.md`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                      Download Notes
                    </button>
                    {/* GitHub Repo Button */}
                    <a
                      href="https://github.com/certifyo/demo-course-repo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" /></svg>
                      GitHub Repo
                    </a>
                    {/* Placeholder Advanced Features */}
                    <button disabled className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      Ask AI (Coming Soon)
                    </button>
                    <button disabled className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Bookmark (Coming Soon)
                    </button>
                  </div>

                  {/* Unit Info */}
                  <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedUnit.title}
                    </h2>
                    <div className={`flex items-center mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock className="h-4 w-4 mr-1" />
                      Duration: {selectedUnit.duration}
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedUnit.description}
                    </p>
                  </div>

                  <LearningUnitNavigation
                    onPrev={handlePrev}
                    onNext={handleNext}
                    onAskAI={handleAskAI}
                    disablePrev={!prevUnit}
                    disableNext={!nextUnit}
                  />

                  <div className="flex flex-col items-center mt-8">
                    <button
                      onClick={handleGenerateQuiz}
                      disabled={quizLoading || !groqApiKey}
                      className="mb-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-purple-700 transition-colors disabled:opacity-50"
                      aria-label="Generate Quiz with AI"
                    >
                      {quizLoading ? (
                        <span className="flex items-center"><span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></span>Generating Quiz...</span>
                      ) : (
                        'Generate Quiz with AI'
                      )}
                    </button>
                    {quizError && <div className="text-red-600 mb-2">{quizError}</div>}
                    {quizQuestions && <UnitQuickQuiz questions={quizQuestions} />}
                  </div>
                </div>
              ) : (
                <div className={`rounded-lg shadow-lg p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <Video className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Select a Unit to Start Learning
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Choose a unit from the sidebar to begin your learning journey.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedUnit && (
          <button
            onClick={() => setAiPanelOpen(true)}
            className="fixed z-50 bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center px-6 py-3 text-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={{ boxShadow: '0 4px 24px rgba(80, 80, 200, 0.15)' }}
          >
            <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Ask AI
          </button>
        )}
        <ChatbotPanel open={aiPanelOpen} onClose={() => setAiPanelOpen(false)} selectedCourse={selectedCourse} selectedUnit={selectedUnit} groqApiKey={groqApiKey} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Interactive Learning Platform
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master new skills with our comprehensive video courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleCourseSelect(course)}
            >
              {/* Course Image */}
              <div className={`h-48 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}> 
                <BookOpen className="h-16 w-16 text-indigo-600" />
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {course.title}
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {course.instructor}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {course.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()}
                  </span>
                </div>

                {/* Enroll Button */}
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${
            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            <Video className="h-4 w-4 mr-2" />
            All courses include HD video content and downloadable resources
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatbotPanel({
  open, onClose, selectedCourse, selectedUnit, groqApiKey
}: {
  open: boolean;
  onClose: () => void;
  selectedCourse: Course | null;
  selectedUnit: Unit | null;
  groqApiKey: string | null;
}) {
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; message: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || !groqApiKey) return;
    setChat((prev) => [...prev, { role: 'user', message: input }]);
    setLoading(true);
    try {
      const prompt = `Course: ${selectedCourse?.title}\nUnit: ${selectedUnit?.title}\nContent: ${selectedUnit?.description}\n\nUser question: ${input}`;
      const res = await getAIAssistance({ prompt, apiKey: groqApiKey });
      if (res.success && res.suggestion) {
        setChat((prev) => [...prev, { role: 'ai', message: res.suggestion! }]);
      } else {
        setChat((prev) => [...prev, { role: 'ai', message: res.error || 'AI could not answer.' }]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to get AI answer.';
      setChat((prev) => [...prev, { role: 'ai', message: msg }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ boxShadow: open ? '0 0 32px rgba(80,80,200,0.15)' : undefined }}
      tabIndex={-1}
      ref={panelRef}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="font-bold text-lg flex items-center gap-2">
            <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            Ask AI
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {chat.length === 0 && (
            <div className="text-gray-400 text-center mt-8">Ask anything about this unit!</div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-lg shadow text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border dark:border-gray-700'}`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <form
          className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 flex gap-2"
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
        >
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading || !groqApiKey}
            autoFocus={open}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading || !input.trim() || !groqApiKey}
          >{loading ? '...' : 'Send'}</button>
        </form>
        {!groqApiKey && (
          <div className="p-4 text-red-600 text-center border-t bg-white dark:bg-gray-900">You need to add your Groq API key in your <a href="/profile" className="underline">profile</a> to use this feature.</div>
        )}
      </div>
    </div>
  );
}