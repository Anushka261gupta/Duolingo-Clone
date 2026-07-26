"use client"

import { Gift } from "lucide-react"

import { DuoCard, ProgressBar } from "@/components/shared"
import { MOCK_DAILY_QUESTS } from "@/data/quests"

export function DailyQuests() {
  return (
    <DuoCard>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-duo-ink">Daily Quests</h3>
        <button className="text-sm font-bold uppercase tracking-wide text-duo-blue hover:opacity-80">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {MOCK_DAILY_QUESTS.map((q) => {
          const Icon = q.icon
          return (
            <div key={q.label} className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-duo-gray-lighter">
                <Icon className={`size-6 ${q.tint}`} strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm font-bold text-duo-ink">{q.label}</p>
                <ProgressBar current={q.current} target={q.target} fillClassName={q.fill} />
              </div>
              <Gift className="size-6 shrink-0 text-duo-gray-light" strokeWidth={2.5} />
            </div>
          )
        })}
      </div>
    </DuoCard>
  )
}
