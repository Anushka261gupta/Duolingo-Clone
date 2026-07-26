import type { LessonQuestion } from "@/domain/types/lesson-question"

export const MOCK_LESSON_QUESTIONS: LessonQuestion[] = [
  {
    id: "q1",
    prompt: "Select the correct meaning",
    question: "manzana",
    options: [
      { id: "a", text: "apple" },
      { id: "b", text: "bread" },
      { id: "c", text: "water" },
      { id: "d", text: "milk" },
    ],
    correctAnswerId: "a",
    correctFeedback: "Nice! Manzana means apple.",
    incorrectFeedback: "Not quite. Manzana means apple.",
  },
  {
    id: "q2",
    prompt: "Select the correct meaning",
    question: "gracias",
    options: [
      { id: "a", text: "hello" },
      { id: "b", text: "please" },
      { id: "c", text: "thank you" },
      { id: "d", text: "goodbye" },
    ],
    correctAnswerId: "c",
    correctFeedback: "Great job! Gracias means thank you.",
    incorrectFeedback: "Incorrect. Gracias means thank you.",
  },
  {
    id: "q3",
    prompt: "Select the correct meaning",
    question: "leche",
    options: [
      { id: "a", text: "milk" },
      { id: "b", text: "cheese" },
      { id: "c", text: "egg" },
      { id: "d", text: "rice" },
    ],
    correctAnswerId: "a",
    correctFeedback: "Excellent! Leche means milk.",
    incorrectFeedback: "Wrong answer. Leche means milk.",
  },
]

export const LESSON_TOTAL_QUESTIONS = MOCK_LESSON_QUESTIONS.length
