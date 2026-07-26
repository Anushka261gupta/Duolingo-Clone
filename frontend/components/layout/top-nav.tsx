"use client"

import { Flame, Gem, Heart } from "lucide-react"

import { CourseFlag, StatBadge } from "@/components/shared"
import { MAIN_NAV_ITEMS } from "@/domain/constants/navigation"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-duo-gray-light bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" aria-label="Duolingo home">
          <span className="text-2xl font-extrabold tracking-tight text-duo-green">duolingo</span>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                  item.active
                    ? "border-duo-blue/40 bg-duo-blue/10 text-duo-blue"
                    : "border-transparent text-duo-gray hover:bg-black/5"
                }`}
                aria-current={item.active ? "page" : undefined}
              >
                <Icon className="size-5" strokeWidth={2.5} />
                <span className="hidden xl:inline">{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Stats */}
        <div className="flex items-center gap-1 md:gap-2">
          <button
            className="mr-1 flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-black/5"
            aria-label="Current course: Spanish"
          >
            <CourseFlag />
          </button>
          <StatBadge
            icon={<Flame className="size-6 fill-duo-gold text-duo-gold" strokeWidth={0} />}
            value={7}
            color="text-duo-gold"
            label="Day streak"
          />
          <StatBadge
            icon={<Gem className="size-6 fill-duo-blue text-duo-blue" strokeWidth={0} />}
            value={505}
            color="text-duo-blue"
            label="Gems"
          />
          <StatBadge
            icon={<Heart className="size-6 fill-duo-red text-duo-red" strokeWidth={0} />}
            value={5}
            color="text-duo-red"
            label="Hearts"
          />
        </div>
      </div>
    </header>
  )
}
