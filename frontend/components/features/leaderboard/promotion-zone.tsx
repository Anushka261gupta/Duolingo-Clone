import { ArrowUp } from "lucide-react"

export function PromotionZone() {
  return (
    <div className="flex items-center gap-4 py-2 opacity-80">
      <div className="h-[2px] flex-1 bg-duo-green" />
      <div className="flex items-center gap-1 font-bold text-duo-green text-sm uppercase tracking-wide">
        <ArrowUp className="size-4" />
        Promotion Zone
      </div>
      <div className="h-[2px] flex-1 bg-duo-green" />
    </div>
  )
}
