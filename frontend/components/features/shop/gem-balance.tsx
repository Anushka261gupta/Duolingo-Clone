import { Gem } from "lucide-react"

interface GemBalanceProps {
  balance: number
}

export function GemBalance({ balance }: GemBalanceProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border-2 border-duo-gray-light px-4 py-2">
      <Gem className="size-5 text-[#cd7f32]" strokeWidth={2.5} />
      <span className="font-extrabold text-[#cd7f32]">{balance}</span>
    </div>
  )
}
