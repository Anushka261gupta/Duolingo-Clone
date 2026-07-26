import { useState, useMemo } from "react"
import { QuestionStatus } from "@/domain/types/lesson-engine"
import { MOCK_LESSONS } from "@/data/lesson-engine"

export function useLesson(lessonId: string) {
  const lessonData = MOCK_LESSONS[lessonId]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>("idle")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  const currentQuestion = lessonData?.questions[currentIndex]
  
  const progress = lessonData 
    ? (currentIndex / lessonData.questions.length) * 100 
    : 0

  const selectAnswer = (id: string) => {
    if (questionStatus === "submitted") return
    setSelectedAnswer(id)
    setQuestionStatus("selected")
  }

  const submitAnswer = () => {
    if (questionStatus === "submitted" || !selectedAnswer || !currentQuestion) return

    let correct = false
    if (currentQuestion.type === "MULTIPLE_CHOICE") {
      correct = selectedAnswer === currentQuestion.payload.correctAnswerId
    }

    setIsCorrect(correct)
    setQuestionStatus("submitted")
  }

  const nextQuestion = () => {
    if (!lessonData) return

    const nextIndex = currentIndex + 1
    if (nextIndex >= lessonData.questions.length) {
      setLessonCompleted(true)
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
  }

  return {
    currentQuestion,
    currentIndex,
    selectedAnswer,
    questionStatus,
    isCorrect,
    progress,
    lessonCompleted,
    totalQuestions: lessonData?.questions.length || 0,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    restartLesson,
  }
}
