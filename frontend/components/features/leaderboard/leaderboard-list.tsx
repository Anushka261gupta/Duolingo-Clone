import type { LeaderboardEntry } from "@/domain/types"
import { LeaderboardRow } from "./leaderboard-row"
import { PromotionZone } from "./promotion-zone"
import { DemotionZone } from "./demotion-zone"

interface LeaderboardListProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardList({ entries }: LeaderboardListProps) {
  // Filter out top 3, they are in the podium
  const listEntries = entries.filter(e => e.rank > 3)

  return (
    <div className="flex flex-col gap-1">
      {/* 
        This list supports pagination / infinite scrolling. 
        As more entries are added to `entries`, they will render below. 
      */}
      {listEntries.map((entry, index) => {
        // Determine if we need to show a zone divider BEFORE this entry
        const prevEntry = index > 0 ? listEntries[index - 1] : entries[2] // Previous entry might be rank 3
        
        let showPromotionDivider = false;
        let showDemotionDivider = false;

        if (prevEntry) {
          if (prevEntry.zone === "promotion" && entry.zone === "safe") {
            showPromotionDivider = true;
          }
          if (prevEntry.zone === "safe" && entry.zone === "demotion") {
            showDemotionDivider = true;
          }
        }

        return (
          <div key={entry.id || entry.rank}>
            {showPromotionDivider && <PromotionZone />}
            {showDemotionDivider && <DemotionZone />}
            <LeaderboardRow entry={entry} />
          </div>
        )
      })}
    </div>
  )
}
