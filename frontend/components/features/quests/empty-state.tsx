export function QuestsEmptyState() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-extrabold text-foreground">
        No Quests Found
      </h2>
      <p className="text-duo-gray font-bold">Check back later for more challenges.</p>
    </div>
  )
}
