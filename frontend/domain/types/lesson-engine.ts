export type ExerciseType = "MULTIPLE_CHOICE" | "WORD_BANK" | "MATCH_PAIRS" | "FILL_BLANK" | "TYPE_ANSWER" | "TRANSLATE" | "LISTENING"

export type QuestionStatus = "idle" | "selected" | "submitted"

export type UserAnswer = string | string[] | number | Record<string, unknown> | null

export interface AnswerOption {
  id: string
  text: string
}

export interface MultipleChoicePayload {
  options: AnswerOption[]
  correctAnswerId: string
  correctFeedback: string
  incorrectFeedback: string
}

export interface WordBankPayload {
  words: string[]
  correctAnswer: string
  correctFeedback: string
  incorrectFeedback: string
}

export interface TypeAnswerPayload {
  correctAnswer: string
  correctFeedback: string
  incorrectFeedback: string
}

export interface TranslatePayload {
  sentence: string
  correctAnswer: string
  correctFeedback: string
  incorrectFeedback: string
}

export interface ListeningPayload {
  audioText: string
  audioUrl?: string
  correctAnswer: string
  correctFeedback: string
  incorrectFeedback: string
}

export interface MatchPair {
  id: string
  left: string
  right: string
}

export interface MatchPairsPayload {
  pairs: MatchPair[]
  correctFeedback: string
  incorrectFeedback: string
}

export type LessonExercisePayload =
  | { type: "MULTIPLE_CHOICE"; payload: MultipleChoicePayload }
  | { type: "WORD_BANK"; payload: WordBankPayload }
  | { type: "TYPE_ANSWER"; payload: TypeAnswerPayload }
  | { type: "TRANSLATE"; payload: TranslatePayload }
  | { type: "LISTENING"; payload: ListeningPayload }
  | { type: "MATCH_PAIRS"; payload: MatchPairsPayload }

export type LessonQuestion = {
  id: string
  prompt: string
  question: string
} & LessonExercisePayload

export interface LessonData {
  id: string
  questions: LessonQuestion[]
}

export interface LessonMetadata {
  lessonId: string
  completedAt: string
  accuracy: number
  heartsRemaining: number
  xpEarned: number
  xpBreakdown?: {
    baseLesson: number
    exercise: number
    doubleXpBonus: number
    total: number
  }
  correctAnswers: number
  incorrectAnswers: number
  mode?: "learn" | "practice"
  restoredHeart?: boolean
}
