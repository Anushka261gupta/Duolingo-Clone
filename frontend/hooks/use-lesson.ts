import { useState, useEffect } from "react"
import { QuestionStatus, LessonMetadata, UserAnswer, LessonQuestion } from "@/domain/types/lesson-engine"
import { MOCK_LESSONS } from "@/data/lesson-engine"
import { validateExerciseAnswer } from "@/domain/utils/exercise-validators"
import { useHearts } from "@/providers/hearts-provider"
import { useXP } from "@/providers/xp-provider"
import { useDoubleXP } from "@/providers/double-xp-provider"
import { XP_REWARDS } from "@/domain/constants/xp"
import { PRACTICE_CONFIG } from "@/domain/constants/practice"
import { useStreak } from "@/providers/streak-provider"
import { usePractice } from "@/hooks/use-practice"
import { useProgress } from "@/hooks/use-progress"

export function useLesson(lessonId: string, mode: "learn" | "practice" = "learn") {
  const { loseHeart, isOutOfHearts, hearts, restoreHeart, maxHearts } = useHearts()
  const { addXP, commitLessonRewards, resetLessonXP, currentLessonXP } = useXP()
  const { isDoubleXPActive } = useDoubleXP()
  const { completeLesson } = useStreak()
  const { generatedLesson } = usePractice()
  const { markLessonCompleted, markPracticeCompleted } = useProgress()
  
  const [lessonData, setLessonData] = useState<any>(null)
  
  useEffect(() => {
    resetLessonXP()
  }, [lessonId, mode])

  useEffect(() => {
    let mounted = true
    if (mode === "practice") {
      setLessonData(generatedLesson)
      return
    }
    
    fetch(`http://localhost:8000/api/v1/lessons/${lessonId}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then(data => {
        if (!mounted) return
        // Transform backend exercises directly back into frontend shape
        const questions = data.exercises.map((ex: any) => ({
          id: ex.id,
          type: ex.type,
          prompt: ex.hint,
          question: ex.question,
          payload: ex.payload
        }))
        setLessonData({
          id: data.id,
          questions
        })
      })
      .catch(() => {
        if (!mounted) return
        setLessonData(MOCK_LESSONS[lessonId] || MOCK_LESSONS["fallback-lesson"])
      })
      
    return () => { mounted = false }
  }, [lessonId, mode, generatedLesson])
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<UserAnswer>(null)
  const [questionStatus, setQuestionStatus] = useState<QuestionStatus>("idle")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  // Track correct answers for accuracy metadata
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [sessionXP, setSessionXP] = useState(0)

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
      const baseRaw = mode === "practice" ? PRACTICE_CONFIG.QUESTION_XP : (XP_REWARDS.EXERCISE_BASE[currentQuestion.type] || 5)
      const xp = isDoubleXPActive ? baseRaw * 2 : baseRaw
      setSessionXP(prev => prev + xp)
      
      // If practice mode and correct, we can remove it from mistakes
      if (mode === "practice") {
        try {
          const storedMistakes = localStorage.getItem("mistakes_history")
          if (storedMistakes) {
            const mistakes: LessonQuestion[] = JSON.parse(storedMistakes)
            const filtered = mistakes.filter(m => m.id !== currentQuestion.id)
            localStorage.setItem("mistakes_history", JSON.stringify(filtered))
          }
        } catch(e) {}
      }
    } else {
      setIncorrectCount(prev => prev + 1)
      
      // Append the failed question to the end of the lesson so the user must retry it
      if (lessonData) {
        setLessonData((prev: any) => ({
          ...prev,
          questions: [...prev.questions, { ...currentQuestion, id: `${currentQuestion.id}-retry-${Date.now()}` }]
        }))
      }

      if (mode === "learn") {
        loseHeart()
        // Record mistake for future practice
        try {
          const storedMistakes = localStorage.getItem("mistakes_history")
          const mistakes: LessonQuestion[] = storedMistakes ? JSON.parse(storedMistakes) : []
          mistakes.push(currentQuestion)
          localStorage.setItem("mistakes_history", JSON.stringify(mistakes))
        } catch(e) {}
      }
    }

    setIsCorrect(correct)
    setQuestionStatus("submitted")
  }

  const nextQuestion = () => {
    if (mode === "learn" && isOutOfHearts) {
      setGameOver(true)
      return
    }

    if (!lessonData) return

    const nextIndex = currentIndex + 1
    if (nextIndex >= lessonData.questions.length) {
      setLessonCompleted(true)
      
      // Update the global streak
      completeLesson()
      
      let restoredHeart = false

      if (mode === "learn") {
        markLessonCompleted(lessonId)
      } else if (mode === "practice") {
        if (hearts < maxHearts) {
           restoreHeart()
           restoredHeart = true
        }
        markPracticeCompleted()
      }
      
      // Save lesson metadata
      const storedMetadata = localStorage.getItem("lessonMetadata")
      const metadataDict = storedMetadata ? JSON.parse(storedMetadata) : {}
      
      const isPerfect = incorrectCount === 0
      
      const baseRaw = mode === "practice" ? PRACTICE_CONFIG.COMPLETION_XP : XP_REWARDS.LESSON_COMPLETE_BASE
      const perfectBonusRaw = (mode === "practice" || !isPerfect) ? 0 : XP_REWARDS.PERFECT_LESSON_BONUS
      
      const base = isDoubleXPActive ? baseRaw * 2 : baseRaw
      const perfectBonus = isDoubleXPActive ? perfectBonusRaw * 2 : perfectBonusRaw
      
      // Award all accumulated session XP only upon successful completion
      if (sessionXP > 0) {
        addXP(sessionXP, isDoubleXPActive)
      }
      
      commitLessonRewards({ base, perfectBonus })
      const finalXP = sessionXP + base + perfectBonus

      const newMetadata: LessonMetadata = {
        lessonId: mode === "practice" ? "practice-lesson" : lessonId,
        completedAt: new Date().toISOString(),
        accuracy: correctCount / lessonData.questions.length,
        heartsRemaining: hearts + (restoredHeart ? 1 : 0), 
        xpEarned: finalXP,
        xpBreakdown: {
          baseLesson: baseRaw + perfectBonusRaw,
          exercise: sessionXP / (isDoubleXPActive ? 2 : 1),
          doubleXpBonus: isDoubleXPActive ? ((sessionXP / 2) + baseRaw + perfectBonusRaw) : 0,
          total: finalXP
        },
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        mode,
        restoredHeart
      }
      
      metadataDict[newMetadata.lessonId] = newMetadata
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
    setIncorrectCount(0)
    setSessionXP(0)
    resetLessonXP()
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
