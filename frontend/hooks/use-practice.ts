import { useMemo, useState, useEffect } from "react"
import { LessonData, LessonQuestion } from "@/domain/types/lesson-engine"
import { MOCK_LESSONS } from "@/data/lesson-engine"
import { PRACTICE_CONFIG } from "@/domain/constants/practice"

export function usePractice() {
  const [generatedLesson, setGeneratedLesson] = useState<LessonData | null>(null)

  useEffect(() => {
    // Collect all available questions from completed lessons
    const storedLessons = localStorage.getItem("completedLessons")
    const completedLessonIds: string[] = storedLessons ? JSON.parse(storedLessons) : []

    // Fallback if no lessons completed
    if (completedLessonIds.length === 0) {
      completedLessonIds.push("lesson-1")
    }

    let allCompletedQuestions: LessonQuestion[] = []
    completedLessonIds.forEach(id => {
      const lesson = MOCK_LESSONS[id]
      if (lesson) {
        allCompletedQuestions = [...allCompletedQuestions, ...lesson.questions]
      }
    })

    // Retrieve mistakes
    const storedMistakes = localStorage.getItem("mistakes_history")
    const mistakes: LessonQuestion[] = storedMistakes ? JSON.parse(storedMistakes) : []

    // Deduplicate questions by ID
    const uniqueMistakes = mistakes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)
    const uniqueCompleted = allCompletedQuestions.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

    // Select questions based on priority: Mistakes first, then random completed questions
    let selectedQuestions: LessonQuestion[] = []

    // Shuffle uniquely
    const shuffle = (array: LessonQuestion[]) => [...array].sort(() => 0.5 - Math.random())

    const shuffledMistakes = shuffle(uniqueMistakes)
    const shuffledCompleted = shuffle(uniqueCompleted)

    selectedQuestions = [...shuffledMistakes]

    if (selectedQuestions.length < PRACTICE_CONFIG.QUESTION_COUNT) {
      const remaining = PRACTICE_CONFIG.QUESTION_COUNT - selectedQuestions.length
      const validCompleted = shuffledCompleted.filter(cq => !selectedQuestions.some(sq => sq.id === cq.id))
      selectedQuestions = [...selectedQuestions, ...validCompleted.slice(0, remaining)]
    }

    // If still not enough (very rare), just pad with whatever
    if (selectedQuestions.length < PRACTICE_CONFIG.QUESTION_COUNT) {
       const fallbackLesson = MOCK_LESSONS["fallback-lesson"]
       const validFallback = fallbackLesson.questions.filter(cq => !selectedQuestions.some(sq => sq.id === cq.id))
       const remaining = PRACTICE_CONFIG.QUESTION_COUNT - selectedQuestions.length
       selectedQuestions = [...selectedQuestions, ...validFallback.slice(0, remaining)]
    }

    // Trim just in case
    selectedQuestions = selectedQuestions.slice(0, PRACTICE_CONFIG.QUESTION_COUNT)

    // Shuffle the final list so mistakes aren't always exactly at the start
    selectedQuestions = shuffle(selectedQuestions)

    setGeneratedLesson({
      id: "practice-lesson",
      questions: selectedQuestions
    })

  }, [])

  return { generatedLesson }
}
