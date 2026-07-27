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
        const legacyStyles = [
          { section: "Section 2", unit: "Unit 4", color: "bg-duo-green", edge: "shadow-[0_4px_0_0_#58a700]", kinds: ["star", "star", "trophy", "star", "star", "practice", "star"] },
          { section: "Section 2", unit: "Unit 5", color: "bg-duo-blue", edge: "shadow-[0_4px_0_0_#1899d6]", kinds: ["star", "star", "trophy", "trophy"] },
          { section: "Section 2", unit: "Unit 6", color: "bg-purple-500", edge: "border-purple-600", kinds: ["star", "star"] }
        ]
        
        const mapped = course.units.map((unit, index) => {
          const style = legacyStyles[index % legacyStyles.length]
          
          // Generate nodes based on backend skills, but padded/styled to match legacy
          const nodes: any[] = []
          let nodeIdx = 0
          
          // For each skill, let's create a few nodes so the path looks long enough
          unit.skills.forEach((skill) => {
             nodes.push({
               kind: style.kinds[nodeIdx % style.kinds.length],
               state: "locked", // updated by learning-path dynamically
               mascot: nodeIdx === 3 // arbitrary mascot placement
             })
             nodeIdx++
             nodes.push({
               kind: style.kinds[nodeIdx % style.kinds.length],
               state: "locked",
               mascot: false
             })
             nodeIdx++
          })
          
          // Pad to exactly match the old nodes length if we are Unit 4 or 5
          while (index === 0 && nodes.length < 7) {
             nodes.push({ kind: style.kinds[nodeIdx % style.kinds.length], state: "locked" })
             nodeIdx++
          }
          while (index === 1 && nodes.length < 4) {
             nodes.push({ kind: style.kinds[nodeIdx % style.kinds.length], state: "locked" })
             nodeIdx++
          }

          return {
            section: style.section,
            unit: style.unit,
            title: unit.title,
            color: style.color,
            edge: style.edge,
            nodes
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
