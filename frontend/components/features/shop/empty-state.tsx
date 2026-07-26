export function ShopEmptyState() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-extrabold text-foreground">
        Shop Unavailable
      </h2>
      <p className="text-duo-gray font-bold">Please check back later.</p>
    </div>
  )
}
