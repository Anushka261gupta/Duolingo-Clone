interface DuoCardProps {
  children: React.ReactNode
  className?: string
}

export function DuoCard({ children, className = "" }: DuoCardProps) {
  return (
    <div className={`rounded-2xl border-2 border-duo-gray-light bg-background p-5 ${className}`}>
      {children}
    </div>
  )
}
