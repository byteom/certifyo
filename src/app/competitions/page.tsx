"use client"
import { useState, useEffect, useCallback } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import {
  Trophy, Timer, ArrowRight,
  Calendar, Star, ExternalLink, CheckCircle, Lock,
  Code, History, AlertCircle,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface DSACompetition {
  id: string;
  title: string;
  description: string;


  start_date: string;
  end_date: string;
  duration_days: number;
  status: string;
}

interface DSAQuestion {
  id: string;
  day_number: number;
  title: string;
  description: string;
  difficulty: string;
  leetcode_url: string;
  points: number;
}

interface UserProgress {
  id: string;
  started_at: string;
  current_day: number;
  total_points: number;
  status: string;
}

interface Submission {
  id: string;
  solution: string;
  submitted_at: string;
  status: string;
  points: number;
}

interface SubmissionHistory {
  id: string;
  solution: string;
  submitted_at: string;
  status: string;
  points: number;
  execution_time?: number;
  memory_usage?: number;
  feedback?: string;
  graded_at?: string;
}

interface SubmissionWarning {
  show: boolean;
  questionId: string | null;
  solution: string;
}

export default function CompetitionPage() {
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  const { user } = useAuthStore();
  const router = useRouter();
  const [competition, setCompetition] = useState<DSACompetition | null>(null);
  const [questions, setQuestions] = useState<DSAQuestion[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  const [selectedQuestion, setSelectedQuestion] = useState<DSAQuestion | null>(null);
  const [solution, setSolution] = useState('');
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSubmissionHistory, setSelectedSubmissionHistory] = useState<SubmissionHistory[]>([]);
  const [submissionWarning, setSubmissionWarning] = useState<SubmissionWarning>({
    show: false,
    questionId: null,
    solution: ''
  });
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  useEffect(() => {
    loadCompetition();
  }, []);
  const updateCurrentDay = useCallback(async (newDay: number) => {
    if (!user || !competition || !userProgress) return;

    try {
      const { error } = await supabase
        .from('dsa_user_progress')
        .update({ current_day: newDay })
        .eq('user_id', user.id)
        .eq('competition_id', competition.id);

      if (error) throw error;

      setUserProgress(prev => prev ? { ...prev, current_day: newDay } : null);
    } catch (error) {
      console.error('Error updating current day:', error);
    }
  }, [competition, user, userProgress]);


  const loadQuestions = useCallback(async () => {
    if (!competition) return;

    try {
      const { data, error } = await supabase
        .from('dsa_questions')
        .select('*')
        .eq('competition_id', competition.id)
        .order('day_number');

      if (error) throw error;
      setQuestions(data || []);

      // Load submissions for questions
      if (user) {
        const { data: submissionData, error: submissionError } = await supabase
          .from('dsa_submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('competition_id', competition.id);

        if (submissionError) throw submissionError;

        const submissionMap = (submissionData || []).reduce((acc, submission) => {
          acc[submission.question_id] = submission;
          return acc;
        }, {} as Record<string, Submission>);

        setSubmissions(submissionMap);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  }, [user, competition]);

  const loadUserProgress = useCallback(async () => {
    if (!competition || !user) return;

    try {
      const { data, error } = await supabase
        .from('dsa_user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('competition_id', competition.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setUserProgress(data);

      // If user has progress, check if we need to update the current day
      if (data) {
        const startDate = new Date(data.started_at);
        const currentDate = new Date();
        const daysDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysDiff > data.current_day && daysDiff <= competition.duration_days) {
          updateCurrentDay(daysDiff);
        }
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  }, [user, competition, updateCurrentDay]);
  useEffect(() => {
    if (competition && user) {
      loadUserProgress();
      loadQuestions();
    }
  }, [competition, user, loadQuestions, loadUserProgress]);

  useEffect(() => {
    if (userProgress && competition) {
      const startDate = new Date(userProgress.started_at);
      const currentDate = new Date();

      // Reset time components to compare just dates
      startDate.setHours(0, 0, 0, 0);
      const today = new Date(currentDate);
      today.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      // Only update if we're within competition duration and the calculated day is different
      if (daysDiff !== userProgress.current_day && daysDiff <= competition.duration_days) {
        updateCurrentDay(daysDiff);
      }
    }
  }, [userProgress, competition, updateCurrentDay]);


  const loadCompetition = async () => {
    try {
      const { data, error } = await supabase
        .from('dsa_competitions')
        .select('*')
        .eq('status', 'active')
        .single();

      if (error) throw error;
      setCompetition(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error loading competition:', error);
        setError(error.message);
      } else {
        console.error('Unexpected error', error);
        setError('An unexpected error occurred');
      }
    
  } finally {
    setLoading(false);
  }
};



const startCompetition = async () => {
  if (!competition || !user) return;

  try {
    const { data, error } = await supabase
      .from('dsa_user_progress')
      .insert([{
        user_id: user.id,
        competition_id: competition.id,
        started_at: new Date().toISOString(),
        current_day: 1,
        status: 'active'
      }])
      .select()
      .single();

    if (error) throw error;
    setUserProgress(data);
    setShowStartDialog(false);
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error loading competition:', error);
    setError(error.message);
  } else {
    console.error('Unexpected error', error);
    setError('An unexpected error occurred');
  }
}

};

const handleQuestionClick = (question: DSAQuestion) => {
  if (!user) {
    setShowLoginWarning(true);
    return;
  }

  if (!userProgress) {
    setShowStartDialog(true);
    return;
  }

  const isLocked = question.day_number > userProgress.current_day;
  if (!isLocked) {
    setSelectedQuestion(question);
  }
};

const handleSubmitClick = (question: DSAQuestion) => {
  if (!user) {
    setShowLoginWarning(true);
    return;
  }

  if (!userProgress) {
    setShowStartDialog(true);
    return;
  }

  if (!solution.trim()) {
    return;
  }

  setSubmissionWarning({
    show: true,
    questionId: question.id,
    solution: solution
  });
  setSelectedQuestion(null);
};

const confirmSubmission = async () => {
  if (!submissionWarning.questionId || !user || !competition) return;

  try {
    const { data, error } = await supabase
      .from('dsa_submissions')
      .insert([{
        user_id: user.id,
        competition_id: competition.id,
        question_id: submissionWarning.questionId,
        solution: submissionWarning.solution,
        status: 'submitted'
      }])
      .select()
      .single();

    if (error) throw error;

    // Update submissions map
    setSubmissions(prev => ({
      ...prev,
      [submissionWarning.questionId!]: data
    }));

    // Show success message
    setSubmissionSuccess(`Question ${questions.find(q => q.id === submissionWarning.questionId)?.day_number} submitted successfully!`);
    setTimeout(() => setSubmissionSuccess(null), 3000);

    // Clear warning state
    setSubmissionWarning({
      show: false,
      questionId: null,
      solution: ''
    });

    // Update user progress
    await loadUserProgress();
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error loading competition:', error);
    setError(error.message);
  } else {
    console.error('Unexpected error', error);
    setError('An unexpected error occurred');
  }
}

};

const loadSubmissionHistory = async (questionId: string) => {
  if (!user || !competition) return;

  try {
    const { data, error } = await supabase
      .from('dsa_submissions')
      .select('*')
      .eq('user_id', user.id)
      .eq('question_id', questionId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    setSelectedSubmissionHistory(data || []);
    setShowHistory(true);
  } catch (error) {
    console.error('Error loading submission history:', error);
  }
};

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString();
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return isDarkMode ? 'text-green-400' : 'text-green-600';
    case 'medium':
      return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    case 'hard':
      return isDarkMode ? 'text-red-400' : 'text-red-600';
    default:
      return '';
  }
};

if (loading) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}

if (!competition) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg text-center`}>
        <Trophy className={`h-16 w-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          No Active Competitions
        </h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Check back later for new competitions!
        </p>
      </div>
    </div>
  );
}

return (
  <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    {/* Success Message */}
    {submissionSuccess && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
        <CheckCircle className="h-5 w-5 mr-2" />
        {submissionSuccess}
      </div>
    )}

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Competition Header */}
      <div className="text-center mb-12">
        <Trophy className={`h-16 w-16 mx-auto mb-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {competition.title}
        </h1>
        <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {competition.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <Calendar className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Duration</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{competition.duration_days} Days</p>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <Timer className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Time Left</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {userProgress
                ? `${competition.duration_days - userProgress.current_day + 1} Days`
                : '45 Days to Start'
              }
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <Star className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Points</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {userProgress?.total_points || 0} Points
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <Code className={`h-8 w-8 mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Questions</h3>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {questions.length} Problems
            </p>
          </div>
        </div>

        {!userProgress && (
          <Button
            onClick={() => user ? setShowStartDialog(true) : setShowLoginWarning(true)}
            className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            Start Challenge
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => {
          const isLocked = userProgress && question.day_number > userProgress.current_day;
          const submission = submissions[question.id];
          const isSubmitted = submission !== undefined;

          return (
            <Card
              key={question.id}
              className={`${isDarkMode
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white'
                } ${isLocked ? 'opacity-75' : ''
                }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      Day {question.day_number}
                    </CardTitle>
                    <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {question.points} Points
                    </CardDescription>
                  </div>
                  {isLocked ? (
                    <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  ) : isSubmitted ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-5 w-5" />
                      <span className="ml-2 text-sm">Submitted</span>
                    </div>
                  ) : null}
                </div>
              </CardHeader>
              <CardContent>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {question.title}
                </h3>
                <p className={`mb-4 ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>
                  {question.description}
                </p>
              </CardContent>
              <CardFooter>
                {isLocked ? (
                  <Button disabled className="w-full opacity-50">
                    Locked
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(question.leetcode_url, '_blank')}
                    >
                      LeetCode
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    {isSubmitted ? (
                      <Button
                        variant="outline"
                        onClick={() => loadSubmissionHistory(question.id)}
                        className="flex-1"
                      >
                        View Submission
                        <History className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => handleQuestionClick(question)}
                      >
                        Submit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Login Warning Dialog */}
      <Dialog open={showLoginWarning} onOpenChange={setShowLoginWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <LogIn className="h-6 w-6 text-indigo-500 mr-2" />
              Sign In Required
            </DialogTitle>
            <DialogDescription>
              Please sign in to participate in the DSA Challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setShowLoginWarning(false)}>
              Cancel
            </Button>
            <Button onClick={() => router.push('/')}>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit Solution Dialog */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="max-w-3xl">
          {selectedQuestion && (
            <>
              <DialogHeader>
                <DialogTitle>Submit Solution - Day {selectedQuestion.day_number}</DialogTitle>
                <DialogDescription>
                  {selectedQuestion.title} ({selectedQuestion.points} Points)
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Problem Description:
                  </h4>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {selectedQuestion.description}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Solution:
                  </label>
                  <Textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Paste your solution here..."
                    className="h-64 font-mono"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedQuestion(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSubmitClick(selectedQuestion)}
                  disabled={!solution.trim()}
                >
                  Submit Solution
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Submission Warning Dialog */}
      <Dialog open={submissionWarning.show} onOpenChange={(open) => !open && setSubmissionWarning({ show: false, questionId: null, solution: '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
              Confirm Submission
            </DialogTitle>
            <DialogDescription>
              Please note that you can only submit once for each question. Make sure your solution is correct before submitting.
            </DialogDescription>
          </DialogHeader>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>You cannot modify your solution after submission</li>
              <li>Make sure your code passes all test cases on LeetCode</li>
              <li>Double-check your solution before confirming</li>
            </ul>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSubmissionWarning({ show: false, questionId: null, solution: '' })}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSubmission}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Confirm Submission
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Start Competition Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start 15-Day DSA Challenge</DialogTitle>
            <DialogDescription>
              Are you ready to begin? Once you start, you&apos;ll have 15 days to complete all questions.
              You can only solve one question per day.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Challenge Rules:
              </h4>
              <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>One question per day for 15 days</li>
                <li>Questions must be solved in order</li>
                <li>Submit your solution for verification</li>
                <li>Complete within 45 days window</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>
              Cancel
            </Button>
            <Button onClick={startCompetition}>
              Start Challenge
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submission History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submission History</DialogTitle>
            <DialogDescription>
              View your previous submissions and their results
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSubmissionHistory.map((submission, index) => (
              <div
                key={submission.id}
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Submission {selectedSubmissionHistory.length - index}
                    </span>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {formatDateTime(submission.submitted_at)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {submission.graded_at ? (
                      <span className={`flex items-center text-green-500`}>
                        <Star className="h-4 w-4 mr-1" />
                        {submission.points} points
                      </span>
                    ) : (
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
                        <Timer className="h-4 w-4 mr-1" />
                        Grading in progress...
                      </span>
                    )}
                  </div>
                </div>

                <div className={`mt-2 font-mono text-sm p-2 rounded ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                  }`}>
                  <pre className="whitespace-pre-wrap">{submission.solution}</pre>
                </div>

                {submission.graded_at && (
                  <>
                    {submission.feedback && (
                      <div className="mt-4 p-3 rounded-lg bg-opacity-10 border">
                        <h4 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Feedback:
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {submission.execution_time && (
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                          }`}>
                          <div className="flex items-center">
                            <Timer className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                              Runtime: {submission.execution_time}ms
                            </span>
                          </div>
                        </div>
                      )}
                      {submission.memory_usage && (
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                          }`}>
                          <div className="flex items-center">
                            <Code className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`} />
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                              Memory: {submission.memory_usage}KB
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHistory(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
);
}