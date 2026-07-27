import { LessonQuestion, UserAnswer } from "../types/lesson-engine"

export function validateExerciseAnswer(exercise: LessonQuestion, answer: UserAnswer): boolean {
  if (exercise.type === "MULTIPLE_CHOICE") {
    return answer === exercise.payload.correctAnswerId
  }
  
  if (exercise.type === "WORD_BANK") {
    if (!Array.isArray(answer)) return false
    
    // Normalize user answer array to a single string, stripping redundant spaces
    const userAnswerStr = answer.join(" ").trim().replace(/\s+/g, " ").toLowerCase()
    
    // Normalize correct answer string, stripping redundant spaces
    const correctAnswerStr = exercise.payload.correctAnswer.trim().replace(/\s+/g, " ").toLowerCase()
    
    return userAnswerStr === correctAnswerStr
  }
  
  if (exercise.type === "TYPE_ANSWER" || exercise.type === "TRANSLATE" || exercise.type === "LISTENING") {
    if (typeof answer !== "string") return false
    
    const normalize = (str: string) => str
      .replace(/[.,!?]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      
    return normalize(answer) === normalize(exercise.payload.correctAnswer)
  }
  if (exercise.type === "MATCH_PAIRS") {
    return answer !== null && typeof answer === 'object' && !Array.isArray(answer) && (answer as any).complete === true
  }
  
  return false
}
