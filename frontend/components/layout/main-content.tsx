interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return <div className="mx-auto w-full max-w-xl flex-1">{children}</div>
}

interface SidebarSlotProps {
  children: React.ReactNode
}

export function SidebarSlot({ children }: SidebarSlotProps) {
  return (
    <div className="hidden w-[340px] shrink-0 lg:block">
      <div className="sticky top-24">{children}</div>
    </div>
  )
}
