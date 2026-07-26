"use client"

import { NotebookText } from "lucide-react"

import type { UnitBannerProps } from "@/domain/types"

export function UnitBanner({
  section,
  unit,
  title,
  color = "bg-duo-green",
  edge = "shadow-[0_4px_0_0_#58a700]",
}: UnitBannerProps) {
  return (
    <div className={`flex items-center justify-between rounded-2xl ${color} ${edge} px-5 py-4 text-white`}>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80">
          {section} · {unit}
        </p>
        <h2 className="truncate text-xl font-extrabold text-balance">{title}</h2>
      </div>
      <button className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-white/25 bg-black/10 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-black/20">
        <NotebookText className="size-5" strokeWidth={2.5} />
        <span className="hidden sm:inline">Guidebook</span>
      </button>
    </div>
  )
}
