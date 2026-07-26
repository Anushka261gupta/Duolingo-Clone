import { Loader2 } from "lucide-react"

export function LeaderboardLoading() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Loader2 className="size-8 animate-spin text-duo-gray" />
    </div>
  )
}
