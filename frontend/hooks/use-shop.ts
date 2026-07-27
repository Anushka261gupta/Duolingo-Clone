"use client"
import { useState, useEffect, useMemo } from "react"
import { SHOP_ITEMS, SHOP_CATEGORIES, ShopItemDef, ShopCategory } from "@/domain/constants/shop"
import { useGems } from "@/providers/gems-provider"
import { useHearts } from "@/providers/hearts-provider"
import { useStreak } from "@/providers/streak-provider"
import { useDoubleXP } from "@/providers/double-xp-provider"
import { useToast } from "@/hooks/use-toast"

export type ShopItemStatus = "available" | "locked" | "owned"

export interface ShopSectionData {
  title: string
  items: (ShopItemDef & { status: ShopItemStatus })[]
}

export interface InventoryItem {
  instanceId: string
  itemId: string
  status: "owned" | "expired"
  purchasedAt: string
  expiresAt?: string
}

export function useShop() {
  const { gems, spendGems } = useGems()
  const { maxHearts, hearts, restoreAllHearts, restoreHeart } = useHearts()
  const { currentStreak, repairStreak } = useStreak()
  const { isDoubleXPActive } = useDoubleXP()
  const { notify } = useToast()

  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const loadInventory = () => {
    const saved = localStorage.getItem("shop_inventory")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "string") {
          const migrated: InventoryItem[] = parsed.map((id: string) => ({
            instanceId: Math.random().toString(36).substring(2, 15),
            itemId: id,
            status: "owned",
            purchasedAt: new Date().toISOString()
          }))
          setInventory(migrated)
          localStorage.setItem("shop_inventory", JSON.stringify(migrated))
        } else {
          setInventory(parsed)
        }
      } catch (e) {
        setInventory([])
      }
    }
  }

  useEffect(() => {
    loadInventory()
    setIsLoaded(true)

    const handleInventoryUpdated = () => {
      loadInventory()
    }
    
    window.addEventListener("inventory-updated", handleInventoryUpdated)
    return () => window.removeEventListener("inventory-updated", handleInventoryUpdated)
  }, [])

  const saveInventory = (newInv: InventoryItem[]) => {
    setInventory(newInv)
    localStorage.setItem("shop_inventory", JSON.stringify(newInv))
    window.dispatchEvent(new Event("inventory-updated"))
  }

  const sections = useMemo(() => {
    return SHOP_CATEGORIES.map(category => {
      const items = SHOP_ITEMS.filter(item => item.category === category.id).map(item => {
        let status: ShopItemStatus = "available"
        const ownedInstance = inventory.find(i => i.itemId === item.id && i.status === "owned")
        
        if (ownedInstance) {
          status = "owned"
        }

        // Heart logic locks
        if (item.id === "item_heart_refill" && hearts >= maxHearts) status = "locked"
        if (item.id === "item_single_heart" && hearts >= maxHearts) status = "locked"

        // Streak logic locks
        if (item.id === "item_streak_repair" && currentStreak > 0) status = "locked" // only allow if they have a broken streak

        return { ...item, status, instanceId: ownedInstance?.instanceId }
      })
      return { ...category, items }
    }).filter(section => section.items.length > 0)
  }, [inventory, hearts, maxHearts, currentStreak])

  const purchaseItem = (itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId)
    if (!item) return false

    if (item.currencyType === "gems") {
      if (gems < item.price) {
        notify({ title: "Not enough gems", description: "Earn more gems by completing lessons!", type: "error" })
        return false
      }
      spendGems(item.price)
    }

    if (item.isConsumable) {
      if (itemId === "item_heart_refill") restoreAllHearts()
      if (itemId === "item_single_heart") restoreHeart()
      if (itemId === "item_streak_repair") repairStreak()
      notify({ title: "Purchase successful!", icon: item.icon.name })
    } else {
      const newItem: InventoryItem = {
        instanceId: Math.random().toString(36).substring(2, 15),
        itemId,
        status: "owned",
        purchasedAt: new Date().toISOString()
      }
      saveInventory([...inventory, newItem])
      notify({ title: "Item added to inventory", icon: item.icon.name, type: "success" })
    }

    // Track history
    try {
      const historyStr = localStorage.getItem("shop_history")
      const history = historyStr ? JSON.parse(historyStr) : []
      history.push({ itemId, date: new Date().toISOString(), price: item.price })
      localStorage.setItem("shop_history", JSON.stringify(history))
    } catch(e) {}

    window.dispatchEvent(
      new CustomEvent("log-activity", {
        detail: {
          type: "SHOP_PURCHASE",
          metadata: { shopItemId: itemId }
        }
      })
    )

    return true
  }

  const markItemExpired = (instanceId: string) => {
    saveInventory(inventory.map(item => 
      item.instanceId === instanceId 
        ? { ...item, status: "expired", expiresAt: new Date().toISOString() } 
        : item
    ))
    return true
  }

  return {
    sections,
    isLoading: !isLoaded,
    isEmpty: false, // The shop is config-driven so it's never truly empty
    purchaseItem,
    markItemExpired,
    inventory
  }
}
