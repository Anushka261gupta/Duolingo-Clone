import { useState, useEffect } from "react"
import { ShopService } from "@/services/shop-service"
import { SHOP_ITEMS as MOCK_SHOP_ITEMS } from "@/domain/constants/shop"

export function useShopCatalog() {
  const [data, setData] = useState<any[]>(MOCK_SHOP_ITEMS)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadCatalog() {
      try {
        setIsLoading(true)
        const items = await ShopService.getShopItems()
        if (!mounted) return
        
        // Merge backend price/availability into frontend UI config
        const merged = MOCK_SHOP_ITEMS.map(mockItem => {
          // Attempt to match IDs like item_heart_refill with shop-heart-refill
          const searchId = mockItem.id.replace("item_", "shop-").replace(/_/g, "-")
          const backendItem = items.find(i => i.id === searchId || i.id === mockItem.id)
          
          if (backendItem) {
            return {
              ...mockItem,
              price: backendItem.price,
              isConsumable: backendItem.is_consumable,
            }
          }
          return mockItem
        })
        
        setData(merged)
        setError(null)
      } catch (err) {
        console.error("Failed to load shop catalog, using mock", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setData(MOCK_SHOP_ITEMS)
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    
    loadCatalog()
    return () => { mounted = false }
  }, [])

  return { data, isLoading, error }
}
