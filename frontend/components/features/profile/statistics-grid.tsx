import { StatBadge } from "@/components/shared"

interface StatItem {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
}

interface StatisticsGridProps {
  stats: StatItem[]
}

export function StatisticsGrid({ stats }: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-2xl border-2 border-duo-gray-light p-4">
          <StatBadge
            icon={stat.icon}
            value={stat.value}
            color="text-foreground"
            label={stat.label}
          />
        </div>
      ))}
    </div>
  )
}
