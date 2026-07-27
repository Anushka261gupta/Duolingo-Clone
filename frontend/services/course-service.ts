import { fetchApi } from "./api"

export interface CourseUnitResponse {
  id: string
  title: string
  order: number
  skills: {
    id: string
    title: string
    icon: string
    order: number
  }[]
}

export interface CourseResponse {
  id: string
  title: string
  language: string
  units: CourseUnitResponse[]
}

export const CourseService = {
  async getCourse(courseId: string): Promise<CourseResponse> {
    return fetchApi<CourseResponse>(`/courses/${courseId}`)
  }
}
