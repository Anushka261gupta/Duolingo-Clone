import { DuoCard } from "@/components/shared"
import { ReactNode } from "react"
import Link from "next/link"

interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold text-duo-green tracking-tight">duolingo</h1>
          </Link>
        </div>
        <DuoCard className="p-6 sm:p-10">
          <h2 className="mb-2 text-2xl font-extrabold text-foreground text-center">{title}</h2>
          <p className="mb-8 font-bold text-duo-gray text-center">{subtitle}</p>
          {children}
        </DuoCard>
      </div>
    </div>
  )
}
