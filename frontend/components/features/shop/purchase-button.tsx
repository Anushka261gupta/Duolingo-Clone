import { Gem } from "lucide-react"

interface PurchaseButtonProps {
  itemId: string
  status: "locked" | "available" | "purchased"
  priceAmount?: number
  priceText?: string
  currencyType?: "gems" | "fiat"
}

export function PurchaseButton({
  itemId,
  status,
  priceAmount,
  priceText,
  currencyType
}: PurchaseButtonProps) {
  const isLocked = status === "locked"
  const isPurchased = status === "purchased"

  const handleClick = () => {
    if (isLocked || isPurchased) return
    
    // TODO: FUTURE API INTEGRATION
    // 1. Open purchase confirmation modal here
    // 2. On confirm, call useShop().purchaseItem(itemId)
    console.log(`Initiated purchase for ${itemId}`)
  }

  if (isPurchased) {
    return (
      <div className="flex w-full items-center justify-center rounded-xl border-2 border-duo-gray-light bg-duo-gray-lighter px-4 py-3 font-extrabold text-duo-gray uppercase md:w-auto">
        Equipped
      </div>
    )
  }

  if (isLocked) {
    return (
      <div className="flex w-full items-center justify-center rounded-xl border-2 border-duo-gray-light bg-duo-gray-lighter px-4 py-3 font-extrabold text-duo-gray uppercase md:w-auto">
        Locked
      </div>
    )
  }

  return (
    <button 
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-duo-blue px-4 py-3 font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-80 active:opacity-100 shadow-[0_4px_0_0_#1cb0f6] md:w-auto md:min-w-[120px]"
    >
      {currencyType === "gems" && priceAmount && (
        <>
          <Gem className="size-5" />
          <span>{priceAmount}</span>
        </>
      )}
      {currencyType === "fiat" && priceText && (
        <span>{priceText}</span>
      )}
      {!currencyType && (
        <span>Get</span>
      )}
    </button>
  )
}
