import type { LeaderboardEntry, WeeklyLeaderboard } from "@/domain/types"

export const MOCK_LEADERBOARD: LeaderboardEntry[] = Array.from({ length: 30 }, (_, i) => {
  const rank = i + 1;
  const isYou = rank === 14;
  
  let zone: "promotion" | "demotion" | "safe" = "safe";
  if (rank <= 7) zone = "promotion";
  else if (rank >= 25) zone = "demotion";
  
  let trend: "up" | "down" | "same" = "same";
  if (rank % 3 === 0) trend = "up";
  else if (rank % 5 === 0) trend = "down";

  // Base names
  const names = ["Sofia", "Liam", "Emma", "Noah", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia", "Benjamin", "Mia", "Elijah", "Charlotte", "Lucas", "Amelia", "Mason", "Harper", "Logan", "Evelyn", "Alexander", "Abigail", "Ethan", "Emily", "Jacob", "Elizabeth", "Michael", "Mila", "Daniel"];

  return {
    id: `user-${rank}`,
    rank,
    name: isYou ? "You" : names[i],
    xp: 2000 - (rank * 45) + Math.floor(Math.random() * 20),
    color: rank === 1 ? "text-duo-gold" : rank <= 3 ? "text-duo-gray" : isYou ? "text-[#cd7f32]" : "text-foreground",
    medal: rank === 1 ? "bg-duo-gold" : rank === 2 ? "bg-duo-gray" : rank === 3 ? "bg-[#cd7f32]" : "bg-transparent",
    you: isYou,
    avatarUrl: isYou ? "https://github.com/shadcn.png" : undefined,
    trend,
    zone,
  };
});

export const MOCK_WEEKLY_LEADERBOARD: WeeklyLeaderboard = {
  league: {
    name: "Gold League",
    icon: "🏆",
    color: "text-duo-gold",
  },
  resetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
  entries: MOCK_LEADERBOARD,
}
