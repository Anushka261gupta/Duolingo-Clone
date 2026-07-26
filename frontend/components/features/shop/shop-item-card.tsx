import type { ShopItem } from "@/domain/types"
import { PurchaseButton } from "./purchase-button"

interface ShopItemCardProps {
  item: ShopItem
}

export function ShopItemCard({ item }: ShopItemCardProps) {
  const Icon = item.icon
  const isLocked = item.status === "locked"

  return (
    <div className={`flex flex-col items-start gap-4 py-6 md:flex-row md:items-center ${isLocked ? 'opacity-70 grayscale' : ''}`}>
      {/* Icon Area */}
      <div className="flex shrink-0 items-center gap-4">
        <Icon className={`size-12 ${item.tint}`} strokeWidth={2} />
      </div>

      {/* Content Area */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-lg font-extrabold text-foreground">{item.title}</h3>
        <p className="text-sm font-medium text-duo-gray">{item.description}</p>
      </div>

      {/* Action Area */}
      <div className="mt-2 w-full shrink-0 md:mt-0 md:w-auto">
        <PurchaseButton 
          itemId={item.id}
          status={item.status}
          priceAmount={item.priceAmount}
          priceText={item.priceText}
          currencyType={item.currencyType}
        />
      </div>
    </div>
  )
}
