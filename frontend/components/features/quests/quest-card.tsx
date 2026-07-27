import { ProgressBar } from "@/components/shared"
import type { LucideIcon } from "lucide-react"
import { Check, Lock } from "lucide-react"

export interface QuestCardProps {
  id: string
  title: string
  description?: string
  current: number
  target: number
  icon: LucideIcon
  status: 'locked' | 'in_progress' | 'completed' | 'claimed'
  tint?: string
  fill?: string
  rewardText?: string
  timeRemaining?: string
  onClaim?: (id: string) => void
}

export function QuestCard({
  id,
  title,
  description,
  current,
  target,
  icon: Icon,
  status,
  tint = "text-duo-orange",
  fill = "bg-duo-orange",
  rewardText,
  timeRemaining,
  onClaim
}: QuestCardProps) {
  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const isClaimed = status === 'claimed'
  
  const activeTint = isLocked ? "text-duo-gray" : tint
  const activeFill = isLocked ? "bg-duo-gray-light" : fill
  const opacity = isClaimed ? "opacity-50" : "opacity-100"

  const label = isClaimed ? "Claimed" : isCompleted ? "Completed ✓" : `${current} / ${target}`

  return (
    <div className={`flex flex-col gap-4 py-4 md:flex-row md:items-center ${opacity}`}>
      {/* Icon Area */}
      <div className="flex shrink-0 items-center gap-4 md:w-16 md:flex-col md:justify-center">
        <div className={`flex size-14 items-center justify-center rounded-2xl ${isLocked ? 'bg-duo-gray-lighter' : 'bg-duo-gray-lighter'}`}>
           {isLocked ? (
             <Lock className="size-7 text-duo-gray" strokeWidth={2.5} />
           ) : isClaimed ? (
             <Check className="size-7 text-duo-green" strokeWidth={3} />
           ) : (
             <Icon className={`size-7 ${activeTint}`} strokeWidth={2.5} />
           )}
        </div>
        {timeRemaining && !isCompleted && !isClaimed && (
           <div className="hidden text-xs font-extrabold text-duo-orange uppercase tracking-wide md:block">
             {timeRemaining}
           </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <h3 className={`font-extrabold ${isLocked ? 'text-duo-gray' : 'text-foreground'}`}>
            {title}
          </h3>
          {description && (
            <p className="text-sm font-medium text-duo-gray">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar current={current} target={target} fillClassName={activeFill} label={label} />
          </div>
          {rewardText && (
            <div className="shrink-0 text-sm font-extrabold text-duo-gray">
              {rewardText}
            </div>
          )}
        </div>
        {timeRemaining && !isCompleted && !isClaimed && (
           <div className="text-xs font-extrabold text-duo-orange uppercase tracking-wide md:hidden">
             {timeRemaining}
           </div>
        )}
      </div>

      {/* Action Area */}
      {isCompleted && (
        <div className="mt-2 flex shrink-0 justify-end md:mt-0 md:ml-4">
          <button 
            onClick={() => onClaim?.(id)}
            className="rounded-xl bg-duo-blue px-6 py-3 font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-80 active:opacity-100 shadow-[0_4px_0_0_#1cb0f6]"
          >
            Claim
          </button>
        </div>
      )}
    </div>
  )
}
