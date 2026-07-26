import { useState } from "react"
import { QuestionStatus, LessonMetadata, UserAnswer } from "@/domain/types/lesson-engine"
import { MOCK_LESSONS } from "@/data/lesson-engine"
import { validateExerciseAnswer } from "@/domain/utils/exercise-validators"
import { useHearts } from "@/providers/hearts-provider"

export function useLesson(lessonId: string) {
  const { loseHeart, isOutOfHearts, hearts } = useHearts()
  
  // Fallback to "fallback-lesson" only if the requested lesson doesn't exist
  const lessonData = MOCK_LESSONS[lessonId] || MOCK_LESSONS["fallback-lesson"]
  
  if (!MOCK_LESSONS[lessonId]) {
    console.warn(`[useLesson] Warning: Invalid lessonId "${lessonId}". Using fallback lesson.`)
  } else {
    console.log(`[useLesson] Successfully loaded lessonData for: ${lessonId}`)
  }
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<UserAnswer>(null)
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>("idle")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  // Track correct answers for accuracy metadata
  const [correctCount, setCorrectCount] = useState(0)

  const currentQuestion = lessonData?.questions[currentIndex]
  
  const progress = lessonData 
    ? (currentIndex / lessonData.questions.length) * 100 
    : 0

  const selectAnswer = (answer: UserAnswer) => {
    if (questionStatus === "submitted") return
    setSelectedAnswer(answer)
    setQuestionStatus("selected")
  }

  const submitAnswer = () => {
    if (questionStatus === "submitted" || selectedAnswer === null || !currentQuestion) return

    const correct = validateExerciseAnswer(currentQuestion, selectedAnswer)

    if (correct) {
      setCorrectCount(prev => prev + 1)
    } else {
      loseHeart()
    }

    setIsCorrect(correct)
    setQuestionStatus("submitted")
  }

  const nextQuestion = () => {
    if (isOutOfHearts) {
      setGameOver(true)
      return
    }

    if (!lessonData) return

    const nextIndex = currentIndex + 1
    if (nextIndex >= lessonData.questions.length) {
      setLessonCompleted(true)
      
      // Save completed lesson to localStorage
      const storedLessons = localStorage.getItem("completedLessons")
      const completed = storedLessons ? JSON.parse(storedLessons) : []
      if (!completed.includes(lessonId)) {
        completed.push(lessonId)
        localStorage.setItem("completedLessons", JSON.stringify(completed))
      }
      
      // Save lesson metadata
      const storedMetadata = localStorage.getItem("lessonMetadata")
      const metadataDict = storedMetadata ? JSON.parse(storedMetadata) : {}
      
      const newMetadata: LessonMetadata = {
        lessonId,
        completedAt: new Date().toISOString(),
        accuracy: correctCount / lessonData.questions.length,
        heartsRemaining: hearts, 
        xpEarned: 15        // Static XP for now
      }
      
      metadataDict[lessonId] = newMetadata
      localStorage.setItem("lessonMetadata", JSON.stringify(metadataDict))
      
      return
    }

    setCurrentIndex(nextIndex)
    setSelectedAnswer(null)
    setQuestionStatus("idle")
    setIsCorrect(null)
  }

  const restartLesson = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setQuestionStatus("idle")
    setIsCorrect(null)
    setLessonCompleted(false)
    setGameOver(false)
    setCorrectCount(0)
  }

  return {
    currentQuestion,
    currentIndex,
    selectedAnswer,
    questionStatus,
    isCorrect,
    progress,
    lessonCompleted,
    gameOver,
    totalQuestions: lessonData?.questions.length || 0,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartLesson,
  }
}
