import type { ShopItem } from "@/domain/types"
import { PurchaseButton } from "./purchase-button"
import { Sparkles } from "lucide-react"

interface FeaturedOffersProps {
  offer?: ShopItem
}

export function FeaturedOffers({ offer }: FeaturedOffersProps) {
  if (!offer) return null
  
  const Icon = offer.icon

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-5 text-duo-purple" strokeWidth={2.5} />
        <h2 className="text-xl font-extrabold text-foreground">Featured Offer</h2>
      </div>
      
      <div className="flex flex-col items-start gap-4 rounded-2xl border-2 border-duo-gray-light bg-duo-purple/10 p-6 md:flex-row md:items-center">
        {/* Icon */}
        <div className="flex shrink-0 items-center justify-center rounded-xl bg-duo-purple p-4">
          <Icon className="size-10 text-white" strokeWidth={2} />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="text-lg font-extrabold text-foreground">{offer.title}</h3>
          <p className="font-medium text-duo-gray">{offer.description}</p>
        </div>

        {/* Action */}
        <div className="mt-2 w-full shrink-0 md:mt-0 md:w-auto">
          <PurchaseButton 
            itemId={offer.id}
            status={offer.status}
            priceAmount={offer.priceAmount}
            priceText={offer.priceText}
            currencyType={offer.currencyType}
          />
        </div>
      </div>
    </div>
  )
}
