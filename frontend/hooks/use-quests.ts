import { useState, useEffect } from "react"
import { QuestData } from "@/domain/types"
import { MOCK_QUEST_DATA } from "@/data/quests"

export function useQuests() {
  const [data, setData] = useState<QuestData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // TODO: FUTURE API INTEGRATION (FETCH QUESTS)
    // fetch('/api/quests')
    //   .then(res => res.json())
    //   .then(setData)
    //   .catch(setError)
    //   .finally(() => setIsLoading(false))

    const timer = setTimeout(() => {
      setData(MOCK_QUEST_DATA)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // TODO: FUTURE API INTEGRATION (CLAIM REWARD)
  // const claimReward = async (questId: string) => {
  //   await fetch(`/api/quests/${questId}/claim`, { method: 'POST' })
  //   // Trigger re-fetch or optimistically update local state
  // }

  return {
    data,
    isLoading,
    isEmpty: !isLoading && !data,
    error
  }
}
