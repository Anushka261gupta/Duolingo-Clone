interface ProgressBarProps {
  current: number
  target: number
  fillClassName: string
  showLabel?: boolean
}

export function ProgressBar({
  current,
  target,
  fillClassName,
  showLabel = true,
}: ProgressBarProps) {
  const pct = Math.round((current / target) * 100)

  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-duo-gray-light">
      <div
        className={`h-full rounded-full ${fillClassName} transition-all`}
        style={{ width: `${pct}%` }}
      />
      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-white/90">
          {current} / {target}
        </span>
      )}
    </div>
  )
}
