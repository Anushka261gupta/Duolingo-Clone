import { DuoCard } from "@/components/shared"
import type { ShopSectionData } from "@/domain/types"
import { ShopItemCard } from "./shop-item-card"
import { Fragment } from "react"

interface ShopSectionProps {
  section: ShopSectionData
}

export function ShopSection({ section }: ShopSectionProps) {
  if (!section.items || section.items.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-extrabold text-foreground">{section.title}</h2>
      <DuoCard className="p-2 sm:p-6">
        <div className="flex flex-col">
          {section.items.map((item, index) => (
            <Fragment key={item.id}>
              <ShopItemCard item={item} />
              {index < section.items.length - 1 && (
                <div className="mx-2 my-2 h-[2px] bg-duo-gray-lighter" />
              )}
            </Fragment>
          ))}
        </div>
      </DuoCard>
    </div>
  )
}
