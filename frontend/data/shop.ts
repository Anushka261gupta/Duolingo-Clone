import { Heart, Gem, Zap, Snowflake, Crown, Clock } from "lucide-react"
import type { ShopData } from "@/domain/types"

export const MOCK_SHOP_DATA: ShopData = {
  gemBalance: 1250,
  featuredOffer: {
    id: "offer-1",
    title: "Weekend Amulet",
    description: "Protect your streak from weekend misses.",
    priceAmount: 200,
    currencyType: "gems",
    icon: Snowflake,
    status: "available",
    category: "powerups",
    tint: "text-duo-purple",
    fill: "bg-duo-purple"
  },
  sections: {
    super: {
      title: "Super Duolingo",
      items: [
        {
          id: "super-1",
          title: "1 Month Super",
          description: "No ads, unlimited hearts, and personalized practice.",
          priceText: "$9.99/mo",
          currencyType: "fiat",
          icon: Crown,
          status: "available",
          category: "super",
          tint: "text-duo-orange",
          fill: "bg-duo-orange"
        }
      ]
    },
    hearts: {
      title: "Hearts",
      items: [
        {
          id: "hearts-1",
          title: "Refill Hearts",
          description: "Get full hearts to keep learning.",
          priceAmount: 350,
          currencyType: "gems",
          icon: Heart,
          status: "available",
          category: "hearts",
          tint: "text-rose-500",
          fill: "bg-rose-500"
        },
        {
          id: "hearts-2",
          title: "Unlimited Hearts",
          description: "Never run out of hearts with Super.",
          icon: Heart,
          status: "locked",
          category: "hearts",
          tint: "text-duo-gray",
          fill: "bg-duo-gray"
        }
      ]
    },
    powerups: {
      title: "Power-Ups",
      items: [
        {
          id: "power-1",
          title: "Streak Freeze",
          description: "Keep your streak safe for one day.",
          priceAmount: 200,
          currencyType: "gems",
          icon: Snowflake,
          status: "purchased",
          category: "powerups",
          tint: "text-duo-blue",
          fill: "bg-duo-blue"
        },
        {
          id: "power-2",
          title: "Double XP Boost",
          description: "Double your XP for the next 15 minutes.",
          priceAmount: 100,
          currencyType: "gems",
          icon: Zap,
          status: "available",
          category: "powerups",
          tint: "text-duo-gold",
          fill: "bg-duo-gold"
        },
        {
          id: "power-3",
          title: "Timer Boost",
          description: "Add extra time during timed challenges.",
          priceAmount: 450,
          currencyType: "gems",
          icon: Clock,
          status: "available",
          category: "powerups",
          tint: "text-duo-purple",
          fill: "bg-duo-purple"
        }
      ]
    },
    gems: {
      title: "Gems",
      items: [
        {
          id: "gems-1",
          title: "Pile of Gems",
          description: "1200 Gems",
          priceText: "$4.99",
          currencyType: "fiat",
          icon: Gem,
          status: "available",
          category: "gems",
          tint: "text-[#cd7f32]",
          fill: "bg-[#cd7f32]"
        },
        {
          id: "gems-2",
          title: "Chest of Gems",
          description: "3000 Gems",
          priceText: "$9.99",
          currencyType: "fiat",
          icon: Gem,
          status: "available",
          category: "gems",
          tint: "text-duo-gray",
          fill: "bg-duo-gray"
        },
        {
          id: "gems-3",
          title: "Hoard of Gems",
          description: "6500 Gems",
          priceText: "$19.99",
          currencyType: "fiat",
          icon: Gem,
          status: "available",
          category: "gems",
          tint: "text-duo-gold",
          fill: "bg-duo-gold"
        }
      ]
    }
  }
}
