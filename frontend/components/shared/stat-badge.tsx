interface StatBadgeProps {
  icon: React.ReactNode
  value: string | number
  color: string
  label: string
}

export function StatBadge({ icon, value, color, label }: StatBadgeProps) {
  return (
    <button
      className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-black/5"
      aria-label={`${label}: ${value}`}
    >
      {icon}
      <span className={`text-base font-extrabold ${color}`}>{value}</span>
    </button>
  )
}
