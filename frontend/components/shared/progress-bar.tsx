interface ProgressBarProps {
  current: number
  target: number
  fillClassName: string
  label?: React.ReactNode
}

export function ProgressBar({
  current,
  target,
  fillClassName,
  label,
}: ProgressBarProps) {
  // Purely visual clamp for the bar width
  const pct = Math.min(100, Math.max(0, Math.round((current / target) * 100)))

  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-duo-gray-light">
      <div
        className={`h-full rounded-full ${fillClassName} transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
      {label && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-white/90 drop-shadow-md">
          {label}
        </span>
      )}
    </div>
  )
}
