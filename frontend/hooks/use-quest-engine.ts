import { useState, useEffect } from "react"
import { useXP } from "@/providers/xp-provider"
import { useGems } from "@/providers/gems-provider"
import { QUEST_CONFIG } from "@/domain/constants/quests"
import type { Quest, Challenge } from "@/domain/types"
import { useToast } from "@/hooks/use-toast"

export function useQuestEngine() {
  const { dailyXP, weeklyXP, monthlyXP } = useXP()
  const { addGems, gems } = useGems()
  const { notify } = useToast()
  const [claims, setClaims] = useState<Record<string, string>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("quest_claims")
    if (saved) {
      try {
        setClaims(JSON.parse(saved))
      } catch (e) {
        setClaims({})
      }
    }
    setIsLoaded(true)
  }, [])

  const claimReward = (questId: string, rewardAmount: number) => {
    if (claims[questId]) return

    console.log("Before claim: Current Gems", gems)
    console.log("Reward Amount", rewardAmount)

    const newClaims = {
      ...claims,
      [questId]: new Date().toISOString()
    }
    setClaims(newClaims)
    localStorage.setItem("quest_claims", JSON.stringify(newClaims))
    addGems(rewardAmount)
    
    notify({
      title: "Reward Claimed!",
      description: `You earned ${rewardAmount} gems!`,
      icon: "💎",
      type: "success"
    })
    
    window.dispatchEvent(
      new CustomEvent("log-activity", {
        detail: {
          type: "QUEST_CLAIMED",
          metadata: { questId }
        }
      })
    )

    console.log("After addGems(): Updated Gems", gems + rewardAmount)
  }

  const getStatus = (questId: string, current: number, target: number): Quest["status"] => {
    if (!isLoaded) return "in_progress"
    if (claims[questId]) return "claimed"
    if (current >= target) return "completed"
    return "in_progress"
  }

  const dailyQuest: Quest = {
    id: QUEST_CONFIG.DAILY_XP.id,
    label: QUEST_CONFIG.DAILY_XP.title,
    current: Math.min(dailyXP, QUEST_CONFIG.DAILY_XP.target),
    target: QUEST_CONFIG.DAILY_XP.target,
    icon: QUEST_CONFIG.DAILY_XP.icon,
    tint: QUEST_CONFIG.DAILY_XP.tint,
    fill: QUEST_CONFIG.DAILY_XP.fill,
    status: getStatus(QUEST_CONFIG.DAILY_XP.id, dailyXP, QUEST_CONFIG.DAILY_XP.target),
    reward: { type: QUEST_CONFIG.DAILY_XP.rewardType as any, amount: QUEST_CONFIG.DAILY_XP.rewardAmount }
  }

  const weeklyChallenge: Challenge = {
    id: QUEST_CONFIG.WEEKLY_CHALLENGE.id,
    title: QUEST_CONFIG.WEEKLY_CHALLENGE.title,
    description: QUEST_CONFIG.WEEKLY_CHALLENGE.description,
    current: Math.min(weeklyXP, QUEST_CONFIG.WEEKLY_CHALLENGE.target),
    target: QUEST_CONFIG.WEEKLY_CHALLENGE.target,
    status: getStatus(QUEST_CONFIG.WEEKLY_CHALLENGE.id, weeklyXP, QUEST_CONFIG.WEEKLY_CHALLENGE.target),
    timeRemaining: "Ends Sunday",
    reward: { type: QUEST_CONFIG.WEEKLY_CHALLENGE.rewardType as any, amount: QUEST_CONFIG.WEEKLY_CHALLENGE.rewardAmount, icon: QUEST_CONFIG.WEEKLY_CHALLENGE.icon }
  }

  const monthlyChallenge: Challenge = {
    id: QUEST_CONFIG.MONTHLY_CHALLENGE.id,
    title: QUEST_CONFIG.MONTHLY_CHALLENGE.title,
    description: QUEST_CONFIG.MONTHLY_CHALLENGE.description,
    current: Math.min(monthlyXP, QUEST_CONFIG.MONTHLY_CHALLENGE.target),
    target: QUEST_CONFIG.MONTHLY_CHALLENGE.target,
    status: getStatus(QUEST_CONFIG.MONTHLY_CHALLENGE.id, monthlyXP, QUEST_CONFIG.MONTHLY_CHALLENGE.target),
    timeRemaining: "Ends Month",
    reward: { type: QUEST_CONFIG.MONTHLY_CHALLENGE.rewardType as any, amount: QUEST_CONFIG.MONTHLY_CHALLENGE.rewardAmount, icon: QUEST_CONFIG.MONTHLY_CHALLENGE.icon }
  }

  return {
    isLoaded,
    dailyQuest,
    weeklyChallenge,
    monthlyChallenge,
    claimReward
  }
}
