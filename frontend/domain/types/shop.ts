import type { LucideIcon } from "lucide-react"

export type ShopItemCategory = "hearts" | "gems" | "powerups" | "super"
export type ShopItemStatus = "locked" | "available" | "purchased"

export interface ShopItem {
  id: string
  title: string
  description: string
  priceText?: string
  priceAmount?: number
  currencyType?: "gems" | "fiat"
  icon: LucideIcon
  status: ShopItemStatus
  category: ShopItemCategory
  tint: string
  fill: string
}

export interface ShopSectionData {
  title: string
  items: ShopItem[]
}

export interface ShopData {
  gemBalance: number
  featuredOffer?: ShopItem
  sections: {
    super: ShopSectionData
    hearts: ShopSectionData
    powerups: ShopSectionData
    gems: ShopSectionData
  }
}
