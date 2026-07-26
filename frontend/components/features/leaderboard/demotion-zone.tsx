import { ArrowDown } from "lucide-react"

export function DemotionZone() {
  return (
    <div className="flex items-center gap-4 py-2 opacity-80">
      <div className="h-[2px] flex-1 bg-rose-500" />
      <div className="flex items-center gap-1 font-bold text-rose-500 text-sm uppercase tracking-wide">
        <ArrowDown className="size-4" />
        Demotion Zone
      </div>
      <div className="h-[2px] flex-1 bg-rose-500" />
    </div>
  )
}
