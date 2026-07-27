"use client"

import { MainContent } from "@/components/layout"
import { useShop } from "@/hooks/use-shop"
import { useGems } from "@/providers/gems-provider"
import {
  ShopLoading,
  ShopEmptyState,
  ShopHeader,
  ShopSection
} from "@/components/features/shop"
import { SHOP_CATEGORIES } from "@/domain/constants/shop"

export default function ShopPage() {
  const { sections, isLoading, isEmpty } = useShop()
  const { gems } = useGems()

  if (isLoading) {
    return (
      <MainContent>
        <ShopLoading />
      </MainContent>
    )
  }

  if (isEmpty || !sections) {
    return (
      <MainContent>
        <ShopEmptyState />
      </MainContent>
    )
  }

  return (
    <MainContent>
      <div className="flex flex-col pb-24">
        <ShopHeader gemBalance={gems} />

        {sections.map(sectionData => (
          <ShopSection 
            key={sectionData.id} 
            section={sectionData} 
          />
        ))}
      </div>
    </MainContent>
  )
}
