import { LessonData } from "@/domain/types/lesson-engine"

export const MOCK_LESSONS: Record<string, LessonData> = {
  "lesson-1": {
    id: "lesson-1",
    questions: [
      {
        id: "q1",
        type: "MULTIPLE_CHOICE",
        prompt: "Select the correct meaning",
        question: "manzana",
        payload: {
          options: [
            { id: "a", text: "apple" },
            { id: "b", text: "bread" },
            { id: "c", text: "water" },
            { id: "d", text: "milk" },
          ],
          correctAnswerId: "a",
          correctFeedback: "Nice! Manzana means apple.",
          incorrectFeedback: "Not quite. Manzana means apple.",
        }
      },
      {
        id: "q2",
        type: "MULTIPLE_CHOICE",
        prompt: "Select the correct meaning",
        question: "gracias",
        payload: {
          options: [
            { id: "a", text: "hello" },
            { id: "b", text: "please" },
            { id: "c", text: "thank you" },
            { id: "d", text: "goodbye" },
          ],
          correctAnswerId: "c",
          correctFeedback: "Great job! Gracias means thank you.",
          incorrectFeedback: "Incorrect. Gracias means thank you.",
        }
      },
      {
        id: "q3",
        type: "MULTIPLE_CHOICE",
        prompt: "Select the correct meaning",
        question: "leche",
        payload: {
          options: [
            { id: "a", text: "milk" },
            { id: "b", text: "cheese" },
            { id: "c", text: "egg" },
            { id: "d", text: "rice" },
          ],
          correctAnswerId: "a",
          correctFeedback: "Excellent! Leche means milk.",
          incorrectFeedback: "Wrong answer. Leche means milk.",
        }
      },
    ]
  }
}
