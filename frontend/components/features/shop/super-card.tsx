import { DuoCard } from "@/components/shared"
import type { ShopItem } from "@/domain/types"
import { PurchaseButton } from "./purchase-button"
import Image from "next/image"

interface SuperCardProps {
  item?: ShopItem
}

export function SuperCard({ item }: SuperCardProps) {
  if (!item) return null
  
  const Icon = item.icon

  return (
    <div className="mb-8">
      <div className="relative overflow-hidden rounded-2xl border-2 border-duo-gray-light bg-gradient-to-r from-duo-blue/20 to-duo-purple/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col items-center text-center">
          <Icon className="mb-4 size-16 text-duo-purple" strokeWidth={2} />
          <h2 className="mb-2 text-2xl font-extrabold text-foreground">{item.title}</h2>
          <p className="mb-6 font-medium text-duo-gray max-w-[250px]">{item.description}</p>
          
          <PurchaseButton 
            itemId={item.id}
            status={item.status}
            priceText={item.priceText}
            currencyType={item.currencyType}
          />
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute -left-8 -top-8 size-32 rounded-full bg-duo-blue/10 blur-2xl" />
        <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-duo-purple/10 blur-2xl" />
      </div>
    </div>
  )
}
