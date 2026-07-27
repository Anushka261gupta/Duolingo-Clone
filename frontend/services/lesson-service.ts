import { fetchApi } from "./api"
import { LessonSchema } from "@/domain/types/lesson-engine" // We'll map backend to frontend types

export const LessonService = {
  async getLesson(lessonId: string): Promise<any> {
    return fetchApi<any>(`/lessons/${lessonId}`)
  }
}
