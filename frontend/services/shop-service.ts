import { fetchApi } from "./api"

export interface ShopItemResponse {
  id: string
  title: string
  description: string | null
  category: string
  price: number
  is_consumable: boolean
  effect_type: string | null
  effect_value: number | null
}

export const ShopService = {
  async getShopItems(): Promise<ShopItemResponse[]> {
    return fetchApi<ShopItemResponse[]>("/shop")
  }
}
