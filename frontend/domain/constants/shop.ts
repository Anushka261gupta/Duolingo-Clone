import { Heart, Zap, Snowflake, Crown, Clock } from "lucide-react"

export type ShopCategory = "featured" | "hearts" | "streak" | "xp" | "inventory"

export interface ShopItemDef {
  id: string
  title: string
  description: string
  price: number
  currencyType: "gems" | "fiat"
  icon: any
  category: ShopCategory
  tint: string
  fill: string
  isConsumable: boolean
  actionType: "restore_all_hearts" | "restore_single_heart" | "streak_freeze" | "double_xp"
}

export const SHOP_ITEMS: ShopItemDef[] = [
  {
    id: "item_heart_refill",
    title: "Heart Refill",
    description: "Get full hearts to keep learning without waiting.",
    price: 100,
    currencyType: "gems",
    icon: Heart,
    category: "hearts",
    tint: "text-rose-500",
    fill: "bg-rose-500",
    isConsumable: true,
    actionType: "restore_all_hearts"
  },
  {
    id: "item_single_heart",
    title: "Single Heart",
    description: "Buy one heart to keep your lesson going.",
    price: 30,
    currencyType: "gems",
    icon: Heart,
    category: "hearts",
    tint: "text-rose-500",
    fill: "bg-rose-500",
    isConsumable: true,
    actionType: "restore_single_heart"
  },
  {
    id: "item_streak_freeze",
    title: "Streak Freeze",
    description: "Protect your streak for one day of inactivity.",
    price: 200,
    currencyType: "gems",
    icon: Snowflake,
    category: "streak",
    tint: "text-duo-blue",
    fill: "bg-duo-blue",
    isConsumable: false, // Owned until consumed by the streak engine
    actionType: "streak_freeze"
  },
  {
    id: "item_double_xp",
    title: "Double XP Boost",
    description: "Double your XP for the next 15 minutes of learning.",
    price: 300,
    currencyType: "gems",
    icon: Zap,
    category: "xp",
    tint: "text-duo-gold",
    fill: "bg-duo-gold",
    isConsumable: false, // Once purchased, sits in inventory (or activates)
    actionType: "double_xp"
  }
]

export const SHOP_CATEGORIES: { id: ShopCategory, label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "hearts", label: "Hearts" },
  { id: "streak", label: "Streak" },
  { id: "xp", label: "Power-Ups" },
  { id: "inventory", label: "Inventory" }
]
