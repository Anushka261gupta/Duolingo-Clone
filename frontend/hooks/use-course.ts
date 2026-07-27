import { useState, useEffect } from "react"
import { CourseService, CourseResponse } from "@/services/course-service"
import { MOCK_UNITS } from "@/data/units" // Fallback data

export function useCourse(courseId: string) {
  const [data, setData] = useState<CourseResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // Expose mapped fallback if backend is unavailable
  const [mappedData, setMappedData] = useState<any[]>(MOCK_UNITS)

  useEffect(() => {
    let mounted = true
    
    async function loadCourse() {
      try {
        setIsLoading(true)
        const course = await CourseService.getCourse(courseId)
        if (!mounted) return
        
        setData(course)
        
        // Map backend format to MOCK_UNITS UI format
        const colors = ["bg-green-500", "bg-purple-500", "bg-blue-500"]
        const edges = ["border-green-600", "border-purple-600", "border-blue-600"]
        
        const mapped = course.units.map((unit, index) => {
          const colorIdx = index % colors.length
          return {
            section: index + 1,
            unit: unit.order,
            title: unit.title,
            color: colors[colorIdx],
            edge: edges[colorIdx],
            nodes: unit.skills.map(skill => ({
              kind: "star", // default for skills
              state: "locked", // updated by learning-path dynamically
              mascot: skill.order === 1 // arbitrary logic for mascot
            }))
          }
        })
        
        setMappedData(mapped)
        setError(null)
      } catch (err) {
        console.error("Failed to load course, falling back to mock.", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setMappedData(MOCK_UNITS)
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    
    loadCourse()
    
    return () => {
      mounted = false
    }
  }, [courseId])

  return {
    data: mappedData,
    isLoading,
    error
  }
}
