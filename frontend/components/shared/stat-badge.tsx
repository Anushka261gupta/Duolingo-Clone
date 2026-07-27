interface StatBadgeProps {
  icon: React.ReactNode
  value: React.ReactNode
  color: string
  label: string
  subLabel?: string | null
}

export function StatBadge({ icon, value, color, label, subLabel }: StatBadgeProps) {
  return (
    <button
      className="flex items-center gap-1.5 rounded-xl px-2 py-1 transition-colors hover:bg-black/5"
      aria-label={`${label}: ${value}`}
    >
      {icon}
      <div className="flex flex-col items-start leading-none">
        <span className={`text-base font-extrabold ${color}`}>{value}</span>
        {subLabel && (
          <span className={`text-[10px] font-extrabold opacity-70 ${color}`}>{subLabel}</span>
        )}
      </div>
    </button>
  )
}
