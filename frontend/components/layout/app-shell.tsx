import { TopNav } from "./top-nav"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <main className="mx-auto flex max-w-6xl gap-8 px-4 py-6 md:px-6">{children}</main>
    </div>
  )
}
