import { StatisticsGrid } from "./statistics-grid"

interface ProfileStatsProps {
  streak: number
  totalXp: number
  hearts: number
  gems: number
  completedLessons: number
  completedUnits: number
}

export function ProfileStats(props: ProfileStatsProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-extrabold text-foreground">Statistics</h2>
      <StatisticsGrid {...props} />
    </div>
  )
}
