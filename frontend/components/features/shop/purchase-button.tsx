import { Gem } from "lucide-react"
import { ShopItemStatus } from "@/hooks/use-shop"

interface PurchaseButtonProps {
  status: ShopItemStatus
  priceAmount?: number
  priceText?: string
  currencyType?: "gems" | "fiat"
  isActivatable?: boolean
  isActive?: boolean
  onClick: () => void
}

export function PurchaseButton({
  status,
  priceAmount,
  priceText,
  currencyType,
  isActivatable,
  isActive,
  onClick
}: PurchaseButtonProps) {
  const isLocked = status === "locked"
  const isOwned = status === "owned"

  const handleClick = () => {
    if (isLocked) return
    if (isOwned && !isActivatable) return
    onClick()
  }

  if (isActive) {
    return (
      <div className="flex w-full items-center justify-center rounded-xl border-2 border-duo-gray-light bg-duo-gray-lighter px-4 py-3 font-extrabold text-duo-gray uppercase md:w-auto">
        Active
      </div>
    )
  }

  if (isActivatable) {
    return (
      <button 
        onClick={handleClick}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-duo-blue px-4 py-3 font-extrabold uppercase tracking-wide text-white transition-opacity hover:opacity-80 active:opacity-100 shadow-[0_4px_0_0_#1cb0f6] md:w-auto md:min-w-[120px]"
      >
        <span>Activate</span>
      </button>
    )
  }

  if (isOwned) {
    return (
      <div className="flex w-full items-center justify-center rounded-xl border-2 border-duo-gray-light bg-duo-gray-lighter px-4 py-3 font-extrabold text-duo-gray uppercase md:w-auto">
        Owned
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
