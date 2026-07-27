import { DuoCard } from "@/components/shared"
import { useActivity } from "@/providers/activity-provider"
import { getRelativeTime } from "@/lib/utils/date"
import { ACTIVITY_CONFIG } from "@/domain/constants/activity"

export function RecentActivity() {
  const { activities } = useActivity()

  return (
    <DuoCard>
      <h3 className="mb-4 text-xl font-extrabold text-foreground">Recent Activity</h3>
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-duo-gray-light rounded-2xl">
          <div className="text-4xl mb-4">🌱</div>
          <p className="text-duo-gray font-bold">No activity yet.</p>
          <p className="text-sm text-duo-gray">Complete your first lesson to begin your journey.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activities.map((item) => {
            const config = ACTIVITY_CONFIG[item.type]
            
            // Build contextual description from metadata
            let contextText = ""
            if (item.metadata?.xpEarned) {
              contextText = `Earned ${item.metadata.xpEarned} XP`
            } else if (item.metadata?.shopItemId) {
              contextText = `Purchased item: ${item.metadata.shopItemId}`
            } else if (item.metadata?.achievementId) {
              contextText = `Unlocked: ${item.metadata.achievementId}`
            } else if (item.metadata?.questId) {
              contextText = `Claimed quest reward`
            }

            return (
              <div key={item.id} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-duo-blue/10 text-xl">
                  {config?.icon || "📝"}
                </div>
                <div>
                  <p className="font-bold text-foreground">{item.title}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-duo-gray">
                    <span>{getRelativeTime(item.timestamp)}</span>
                    {contextText && (
                      <>
                        <span className="text-duo-gray-light">•</span>
                        <span>{contextText}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DuoCard>
  )
}
