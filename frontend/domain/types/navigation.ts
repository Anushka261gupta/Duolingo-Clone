import type { LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  icon: LucideIcon
  href: string
  active?: boolean
}

export interface UserStats {
  streak: number
  gems: number
  hearts: number
}
