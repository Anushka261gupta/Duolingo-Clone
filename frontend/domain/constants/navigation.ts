import { Dumbbell, House, Shield, ShoppingBag, User } from "lucide-react"

import type { NavItem } from "@/domain/types"

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Learn", icon: House, href: "/" },
  { label: "Leaderboards", icon: Shield, href: "/leaderboards" },
  { label: "Quests", icon: Dumbbell, href: "/quests" },
  { label: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "Profile", icon: User, href: "/profile" },
]
