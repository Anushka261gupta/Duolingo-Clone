import { Clock } from "lucide-react"

interface CountdownCardProps {
  resetDate: string
}

export function CountdownCard({ resetDate }: CountdownCardProps) {
  // In a real app, use a date library or custom hook to format the time left.
  // We'll use a mocked static visual to prevent hydration mismatches for now.
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-duo-gray-light p-4 text-center">
      <div className="flex items-center justify-center gap-2 text-duo-orange font-bold uppercase tracking-wide">
        <Clock className="size-5" />
        Time Remaining
      </div>
      <div className="text-xl font-extrabold text-foreground">
        2d 15h 30m
      </div>
    </div>
  )
}
