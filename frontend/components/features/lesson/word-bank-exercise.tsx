import { useState, useEffect, useMemo } from "react"
import { WordBankPayload, UserAnswer } from "@/domain/types/lesson-engine"

interface Props {
  payload: WordBankPayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

interface Token {
  id: string
  text: string
}

function shuffle(array: any[]) {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

export function WordBankExercise({ payload, selectedAnswer, answerState, onSelect }: Props) {
  const initialTokens = useMemo(() => {
    const tokens = payload.words.map((w, i) => ({ id: `w-${i}`, text: w }))
    return shuffle(tokens)
  }, [payload.words])
  
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  useEffect(() => {
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) {
      setSelectedIds([])
    }
  }, [selectedAnswer])
  
  const handleSelect = (token: Token) => {
    if (answerState === "correct" || answerState === "incorrect") return
    
    if (selectedIds.includes(token.id)) return
    
    const newSelectedIds = [...selectedIds, token.id]
    setSelectedIds(newSelectedIds)
    
    const newTexts = newSelectedIds.map(id => initialTokens.find(t => t.id === id)!.text)
    onSelect(newTexts)
  }

  const handleDeselect = (tokenId: string) => {
    if (answerState === "correct" || answerState === "incorrect") return
    
    const newSelectedIds = selectedIds.filter(id => id !== tokenId)
    setSelectedIds(newSelectedIds)
    
    const newTexts = newSelectedIds.map(id => initialTokens.find(t => t.id === id)!.text)
    onSelect(newTexts)
  }

  return (
    <div className="flex flex-col gap-6 w-full mt-4">
      {/* Drop Zone */}
      <div className="flex flex-wrap content-start gap-2 min-h-[60px] p-2 border-b-2 border-duo-gray-light border-dashed">
        {selectedIds.map(id => {
          const token = initialTokens.find(t => t.id === id)!
          return (
            <button
              key={`sel-${id}`}
              onClick={() => handleDeselect(id)}
              className="px-4 py-2 bg-white border-2 border-duo-gray-light rounded-xl font-bold text-duo-ink hover:bg-gray-50 active:scale-95 shadow-sm transition-all"
            >
              {token.text}
            </button>
          )
        })}
      </div>
      
      {/* Bank */}
      <div className="flex flex-wrap justify-center gap-3">
        {initialTokens.map(token => {
          const isSelected = selectedIds.includes(token.id)
          return (
            <button
              key={`bank-${token.id}`}
              onClick={() => handleSelect(token)}
              disabled={isSelected}
              className={`px-4 py-2 rounded-xl font-bold transition-all border-2
                ${isSelected 
                  ? 'bg-duo-gray-light border-duo-gray-light text-transparent pointer-events-none shadow-inner' 
                  : 'bg-white border-duo-gray-light text-duo-ink hover:bg-gray-50 active:translate-y-1 shadow-sm cursor-pointer'
                }`}
            >
              {token.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
