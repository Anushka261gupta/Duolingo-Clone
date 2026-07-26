"use client"

import { MainContent } from "@/components/layout"
import { useShop } from "@/hooks/use-shop"
import {
  ShopLoading,
  ShopEmptyState,
  ShopHeader,
  SuperCard,
  FeaturedOffers,
  ShopSection
} from "@/components/features/shop"

export default function ShopPage() {
  const { data, isLoading, isEmpty } = useShop()

  if (isLoading) {
    return (
      <MainContent>
        <ShopLoading />
      </MainContent>
    )
  }

  if (isEmpty || !data) {
    return (
      <MainContent>
        <ShopEmptyState />
      </MainContent>
    )
  }

  return (
    <MainContent>
      <div className="flex flex-col pb-24">
        <ShopHeader gemBalance={data.gemBalance} />
        
        {/* Featured / Super Duolingo Section */}
        {data.sections.super && data.sections.super.items.length > 0 && (
          <SuperCard item={data.sections.super.items[0]} />
        )}
        
        {/* Featured Offer */}
        {data.featuredOffer && (
          <FeaturedOffers offer={data.featuredOffer} />
        )}

        {/* Hearts Section */}
        <ShopSection section={data.sections.hearts} />

        {/* Power-Ups Section */}
        <ShopSection section={data.sections.powerups} />

        {/* Gems Section */}
        <ShopSection section={data.sections.gems} />
      </div>
    </MainContent>
  )
}
