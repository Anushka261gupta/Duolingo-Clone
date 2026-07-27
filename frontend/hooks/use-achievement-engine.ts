import { useState, useEffect, useMemo } from "react"
import { useXP } from "@/providers/xp-provider"
import { useGems } from "@/providers/gems-provider"
import { useStreak } from "@/providers/streak-provider"
import { useProgress } from "@/hooks/use-progress"
import { ACHIEVEMENT_REWARDS } from "@/domain/constants/rewards"
import { Flame, Award } from "lucide-react"

export function useAchievementEngine() {
  const { totalXP } = useXP()
  const { addGems, gems } = useGems()
  const { currentStreak } = useStreak()
  const { completedLessonCount: completedLessons } = useProgress()
  const [claims, setClaims] = useState<Record<string, string>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedClaims = localStorage.getItem("achievement_claims")
    if (savedClaims) {
      try {
        setClaims(JSON.parse(savedClaims))
      } catch (e) {
        setClaims({})
      }
    }

    setIsLoaded(true)
  }, [])

  const claimReward = (id: string, amount: number) => {
    if (claims[id]) return
    
    console.log("Before claim: Current Gems", gems)
    console.log("Reward Amount", amount)

    const newClaims = { ...claims, [id]: new Date().toISOString() }
    setClaims(newClaims)
    localStorage.setItem("achievement_claims", JSON.stringify(newClaims))
    addGems(amount)
    
    console.log("After addGems(): Updated Gems", gems + amount)
  }

  const getStatus = (id: string, current: number, target: number) => {
    if (!isLoaded) return "locked"
    if (claims[id]) return "claimed"
    if (current >= target) return "completed"
    if (current > 0) return "in_progress"
    return "locked"
  }

  const achievements = useMemo(() => {
    return [
      {
        id: "ach-wildfire",
        title: "Wildfire",
        description: "Reach a 30 day streak",
        current: Math.min(currentStreak, 30),
        target: 30,
        status: getStatus("ach-wildfire", currentStreak, 30),
        reward: { type: "gems", amount: ACHIEVEMENT_REWARDS.WILDFIRE, icon: Flame }
      },
      {
        id: "ach-sage",
        title: "Sage",
        description: "Earn 1000 XP",
        current: Math.min(totalXP, 1000),
        target: 1000,
        status: getStatus("ach-sage", totalXP, 1000),
        reward: { type: "gems", amount: ACHIEVEMENT_REWARDS.SAGE, icon: Award }
      },
      {
        id: "ach-scholar",
        title: "Scholar",
        description: "Complete 50 lessons",
        current: Math.min(completedLessons, 50),
        target: 50,
        status: getStatus("ach-scholar", completedLessons, 50),
        reward: { type: "gems", amount: ACHIEVEMENT_REWARDS.SCHOLAR, icon: Award }
      }
    ]
  }, [totalXP, completedLessons, currentStreak, claims, isLoaded])

  return {
    isLoaded,
    achievements,
    claimReward
  }
}
