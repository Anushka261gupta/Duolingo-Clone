import { Dumbbell, House, Shield, ShoppingBag, User } from "lucide-react"

import type { NavItem } from "@/domain/types"

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Learn", icon: House, href: "/", active: true },
  { label: "Leaderboards", icon: Shield, href: "/leaderboards", active: false },
  { label: "Quests", icon: Dumbbell, href: "/quests", active: false },
  { label: "Shop", icon: ShoppingBag, href: "/shop", active: false },
  { label: "Profile", icon: User, href: "/profile", active: false },
]
