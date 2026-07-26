import { GemBalance } from "./gem-balance"

interface ShopHeaderProps {
  gemBalance: number
}

export function ShopHeader({ gemBalance }: ShopHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b-2 border-duo-gray-light pb-4">
      <h1 className="text-2xl font-extrabold text-foreground">Shop</h1>
      <GemBalance balance={gemBalance} />
    </div>
  )
}
