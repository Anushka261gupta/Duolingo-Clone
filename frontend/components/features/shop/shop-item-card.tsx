import { useState } from "react"
import { ShopItemDef } from "@/domain/constants/shop"
import { ShopItemStatus } from "@/hooks/use-shop"
import { PurchaseButton } from "./purchase-button"
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog"
import { useShop } from "@/hooks/use-shop"
import { useDoubleXP } from "@/providers/double-xp-provider"

interface ShopItemCardProps {
  item: ShopItemDef & { status: ShopItemStatus, instanceId?: string }
}

export function ShopItemCard({ item }: ShopItemCardProps) {
  const Icon = item.icon
  const isLocked = item.status === "locked"
  const { purchaseItem } = useShop()
  const { isDoubleXPActive, activateDoubleXP } = useDoubleXP()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  // Determine if this is an activatable item
  const isActivatable = item.status === "owned" && item.actionType === "double_xp"
  const isActive = isActivatable && isDoubleXPActive

  const handlePurchaseClick = () => {
    if (isActivatable && item.instanceId) {
      if (!isActive) {
        activateDoubleXP(item.instanceId)
      }
      return
    }
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    setIsConfirmOpen(false)
    purchaseItem(item.id)
  }

  return (
    <>
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
            status={item.status}
            priceAmount={item.price}
            currencyType={item.currencyType}
            isActivatable={isActivatable}
            isActive={isActive}
            onClick={handlePurchaseClick}
          />
        </div>
      </div>

      <ConfirmationDialog 
        isOpen={isConfirmOpen}
        title={`Buy ${item.title}?`}
        description={`This will cost ${item.price} ${item.currencyType}. Are you sure you want to proceed?`}
        confirmText="Buy"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  )
}
