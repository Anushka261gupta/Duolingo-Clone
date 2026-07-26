export function LeaderboardEmptyState() {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-2 text-2xl font-extrabold text-foreground">
        No Data Found
      </h2>
      <p className="text-duo-gray">We couldn't load the leaderboard right now.</p>
    </div>
  )
}
