import { useState, useEffect } from "react"
import type { ShopData } from "@/domain/types"
import { MOCK_SHOP_DATA } from "@/data/shop"

export function useShop() {
  const [data, setData] = useState<ShopData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // TODO: FUTURE API INTEGRATION (FETCH SHOP INVENTORY)
    // fetch('/api/shop')
    //   .then(res => res.json())
    //   .then(setData)
    //   .catch(setError)
    //   .finally(() => setIsLoading(false))

    const timer = setTimeout(() => {
      setData(MOCK_SHOP_DATA)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // TODO: FUTURE API INTEGRATION (PURCHASE ITEM)
  // const purchaseItem = async (itemId: string) => {
  //   try {
  //     // 1. Show processing state
  //     // 2. Call purchase endpoint
  //     // await fetch(`/api/shop/purchase/${itemId}`, { method: 'POST' })
  //     // 3. Trigger inventory refresh or optimistically update
  //     // setData(newData)
  //   } catch (e) {
  //     // Handle insufficient funds or errors
  //   }
  // }

  return {
    data,
    isLoading,
    isEmpty: !isLoading && !data,
    error,
    // purchaseItem
  }
}
