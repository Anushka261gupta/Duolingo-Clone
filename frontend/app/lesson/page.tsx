import { LessonView } from "@/components/features/lesson"

interface LessonPageProps {
  searchParams: Promise<{ lessonId?: string }>
}

export default async function LessonPage({ searchParams }: LessonPageProps) {
  const params = await searchParams
  const lessonId = params.lessonId || "fallback-lesson"
  return <LessonView lessonId={lessonId} />
}
