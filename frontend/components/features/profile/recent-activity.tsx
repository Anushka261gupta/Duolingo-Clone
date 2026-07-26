import { DuoCard } from "@/components/shared"
import type { Activity } from "@/domain/types/profile"

interface RecentActivityProps {
  activity: Activity[]
}

export function RecentActivity({ activity }: RecentActivityProps) {
  return (
    <DuoCard>
      <h3 className="mb-4 text-xl font-extrabold text-foreground">Recent Activity</h3>
      <div className="flex flex-col gap-4">
        {activity.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-duo-blue/10 text-xl">
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-foreground">{item.title}</p>
              <p className="text-sm font-semibold text-duo-gray">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </DuoCard>
  )
}
