"use client"
import  { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { subjects } from '@/data/subjects'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { supabase } from '@/lib/supabase'
import screenfull from 'screenfull'
import { Monitor, CheckCircle, XCircle } from 'lucide-react'
import ExamHeader from '@/components/exam/ExamHeader'
import QuestionNavigation from '@/components/exam/QuestionNavigation'
import QuestionContent from '@/components/exam/QuestionContent'
import ExamWarning from '@/components/exam/ExamWarning'
import ExamResults from '@/components/exam/ExamResults'
import SubmitConfirmation from '@/components/exam/SubmitConfirmation'
import LoginWarning from '@/components/exam/LoginWarning'

// Types
interface ExamQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface _Exam {
  id: number
  title: string
  duration: number
  passingScore: number
  questions: ExamQuestion[]
}

type _ExamPageProps = {
  params: {
    examId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface _CertificateData {
  verification_id?: string
  score?: number
  certificate_url?: string
  id?: string
}

const MAX_WARNINGS = 3

export default function Exam({ params }: { params: { examId: string } }) {
  const { examId } = params
  const router = useRouter()
  const { user } = useAuthStore()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  const exam = subjects
    .flatMap((subject) => subject.exams)
    .find((e) => e.id === Number(examId))

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [examCompleted, setExamCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(exam ? exam.duration * 60 : 0)
  const [certificate, setCertificate] = useState<string>()
  const [_isFullscreen, setIsFullscreen] = useState(false)
  const [warningCount, setWarningCount] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [fullscreenError, setFullscreenError] = useState(false)
  const [showMobileWarning, setShowMobileWarning] = useState(false)
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false)
  const [_showLoginWarning, setShowLoginWarning] = useState(false)

  // Handle window resize for mobile warning
  useEffect(() => {
    const handleResize = () => {
      setShowMobileWarning(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Submit exam handler
  const submitExam = useCallback(async () => {
    if (!exam) return

    if (screenfull.isEnabled && screenfull.isFullscreen) {
      await screenfull.exit()
    }

    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === exam.questions[index].correctAnswer ? 1 : 0)
    }, 0)

    const percentage = Math.round((score / exam.questions.length) * 100)
    const passed = percentage >= exam.passingScore

    if (passed && user) {
      try {
        const { data: existingCert, error: fetchError } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', user.id)
          .eq('exam_id', exam.id)
          .maybeSingle()

        if (fetchError) throw fetchError

        const verificationId = existingCert?.verification_id || crypto.randomUUID()
        const certificateUrl = `${window.location.origin}/verify/${verificationId}`

        if (existingCert) {
          if (percentage > existingCert.score) {
            const { data, error } = await supabase
              .from('certificates')
              .update({
                score: percentage,
                issued_at: new Date().toISOString(),
              })
              .eq('id', existingCert.id)
              .select()
              .single()

            if (error) throw error
            setCertificate(data.certificate_url)
          } else {
            setCertificate(existingCert.certificate_url)
          }
        } else {
          const { data, error } = await supabase
            .from('certificates')
            .insert([
              {
                user_id: user.id,
                exam_id: exam.id,
                score: percentage,
                certificate_url: certificateUrl,
                student_name: user.email,
                verification_id: verificationId,
              },
            ])
            .select()
            .single()

          if (error) throw error
          setCertificate(data.certificate_url)
        }
      } catch (error) {
        console.error('Error handling certificate:', error)
      }
    }

    setExamCompleted(true)
  }, [answers, exam, user])

  // Fullscreen handling
  const enterFullscreen = useCallback(async () => {
    if (screenfull.isEnabled) {
      try {
        await screenfull.request()
        setIsFullscreen(true)
        setFullscreenError(false)
      } catch (error) {
        console.error('Fullscreen request failed:', error)
        setFullscreenError(true)
      }
    } else {
      setFullscreenError(true)
    }
  }, [])

  // Visibility change handler
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && !examCompleted) {
      setWarningCount((prev) => {
        const newCount = prev + 1
        if (newCount >= MAX_WARNINGS) {
          submitExam()
        }
        return newCount
      })
      setShowWarning(true)
    }
  }, [examCompleted, submitExam])

  // Fullscreen change handler
  const handleFullscreenChange = useCallback(() => {
    if (screenfull.isEnabled) {
      setIsFullscreen(screenfull.isFullscreen)
      if (!screenfull.isFullscreen && !examCompleted && !fullscreenError) {
        setWarningCount((prev) => {
          const newCount = prev + 1
          if (newCount >= MAX_WARNINGS) {
            submitExam()
          }
          return newCount
        })
        setShowWarning(true)
      }
    }
  }, [examCompleted, fullscreenError, submitExam])

  // Main exam effect
  useEffect(() => {
    if (!exam || examCompleted) return

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    if (!fullscreenError) {
      enterFullscreen().catch(() => {
        setFullscreenError(true)
      })
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('paste', handleCopy)
    document.addEventListener('contextmenu', handleContextMenu)

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange)
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          submitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('paste', handleCopy)
      document.removeEventListener('contextmenu', handleContextMenu)

      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange)
      }

      clearInterval(timer)
    }
  }, [exam, examCompleted, enterFullscreen, handleVisibilityChange, handleFullscreenChange, fullscreenError, submitExam])

  const handleSubmitClick = () => {
    setShowSubmitConfirmation(true)
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  if (!exam) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        Exam not found
      </div>
    )
  }

  if (!user) {
    return (
      <div
        className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}
      >
        <LoginWarning
          onClose={() => setShowLoginWarning(false)}
          onSignIn={() => router.push('/')}
        />
      </div>
    )
  }

  if (examCompleted) {
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === exam.questions[index].correctAnswer ? 1 : 0)
    }, 0)

    return (
      <ExamResults
        score={score}
        totalQuestions={exam.questions.length}
        passingScore={exam.passingScore}
        certificate={certificate}
      />
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      {showMobileWarning && (
        <div className="fixed inset-x-0 top-0 z-50 bg-yellow-500 text-white p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Monitor className="h-5 w-5" />
            <p>For the best experience, please use a desktop browser.</p>
          </div>
        </div>
      )}

      {showWarning && (
        <ExamWarning
          warningCount={warningCount}
          maxWarnings={MAX_WARNINGS}
          onClose={() => setShowWarning(false)}
          onReturnToExam={() => {
            setShowWarning(false)
            if (!fullscreenError) enterFullscreen()
          }}
        />
      )}

      {showSubmitConfirmation && (
        <SubmitConfirmation
          onClose={() => setShowSubmitConfirmation(false)}
          onConfirm={() => {
            setShowSubmitConfirmation(false)
            submitExam()
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8`}>
          <ExamHeader title={exam.title} timeLeft={timeLeft} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <QuestionNavigation
              totalQuestions={exam.questions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              onQuestionSelect={setCurrentQuestion}
            />

            <div className="md:col-span-3">
              <QuestionContent
                question={exam.questions[currentQuestion]}
                currentQuestion={currentQuestion}
                totalQuestions={exam.questions.length}
                selectedAnswer={answers[currentQuestion]}
                onAnswerSelect={handleAnswer}
              />

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  disabled={currentQuestion === 0}
                  className={`px-4 py-2 rounded-md ${isDarkMode ? 'text-indigo-400 disabled:text-gray-600' : 'text-indigo-600 disabled:text-gray-400'
                    }`}
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentQuestion < exam.questions.length - 1 && (
                    <button
                      onClick={() => setCurrentQuestion((prev) => prev + 1)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Next
                    </button>
                  )}
                  <button
                    onClick={handleSubmitClick}
                    className={`px-6 py-2 rounded-md ${answers.length === exam.questions.length
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      }`}
                  >
                    {answers.length === exam.questions.length ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Submit Exam
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <XCircle className="h-5 w-5 mr-2" />
                        Submit Incomplete
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}