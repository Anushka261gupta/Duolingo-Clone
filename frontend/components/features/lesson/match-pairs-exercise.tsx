import { useState, useEffect } from "react"
import { UserAnswer, MatchPairsPayload } from "@/domain/types/lesson-engine"
import { cn } from "@/lib/utils"

interface MatchPairsExerciseProps {
  payload: MatchPairsPayload
  selectedAnswer: UserAnswer
  answerState: "idle" | "selected" | "correct" | "incorrect"
  onSelect: (answer: UserAnswer) => void
}

interface CardState {
  id: string
  text: string
  pairId: string
  side: "left" | "right"
}

export function MatchPairsExercise({
  payload,
  answerState,
  onSelect,
}: MatchPairsExerciseProps) {
  const [leftCards, setLeftCards] = useState<CardState[]>([])
  const [rightCards, setRightCards] = useState<CardState[]>([])
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [mismatchedIds, setMismatchedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Initialize and shuffle cards
    const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)
    
    const left: CardState[] = payload.pairs.map(p => ({
      id: `${p.id}-left`,
      text: p.left,
      pairId: p.id,
      side: "left"
    }))
    
    const right: CardState[] = payload.pairs.map(p => ({
      id: `${p.id}-right`,
      text: p.right,
      pairId: p.id,
      side: "right"
    }))
    
    setLeftCards(shuffle(left))
    setRightCards(shuffle(right))
    setMatchedPairs(new Set())
    setMismatchedIds(new Set())
    setSelectedLeft(null)
    setSelectedRight(null)
  }, [payload])

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const leftCard = leftCards.find(c => c.id === selectedLeft)
      const rightCard = rightCards.find(c => c.id === selectedRight)
      
      if (leftCard && rightCard) {
        if (leftCard.pairId === rightCard.pairId) {
          // Match!
          const newMatched = new Set(matchedPairs)
          newMatched.add(leftCard.pairId)
          setMatchedPairs(newMatched)
          setSelectedLeft(null)
          setSelectedRight(null)
          
          if (newMatched.size === payload.pairs.length) {
             onSelect({ complete: true })
          }
        } else {
          // Mismatch
          setMismatchedIds(new Set([selectedLeft, selectedRight]))
          setSelectedLeft(null)
          setSelectedRight(null)
          
          setTimeout(() => {
            setMismatchedIds(new Set())
          }, 800) // Brief red flash
        }
      }
    }
  }, [selectedLeft, selectedRight, leftCards, rightCards, matchedPairs, payload.pairs.length, onSelect])

  const handleCardClick = (card: CardState) => {
    if (matchedPairs.has(card.pairId) || mismatchedIds.size > 0 || answerState !== "idle") return
    
    if (card.side === "left") {
      setSelectedLeft(prev => prev === card.id ? null : card.id)
    } else {
      setSelectedRight(prev => prev === card.id ? null : card.id)
    }
  }

  const renderCard = (card: CardState) => {
    const isSelected = selectedLeft === card.id || selectedRight === card.id
    const isMatched = matchedPairs.has(card.pairId)
    const isMismatched = mismatchedIds.has(card.id)
    
    return (
      <button
        key={card.id}
        onClick={() => handleCardClick(card)}
        disabled={isMatched || mismatchedIds.size > 0 || answerState !== "idle"}
        className={cn(
          "w-full rounded-xl border-2 p-4 text-center text-lg font-bold transition-all shadow-[0_2px_0_0_rgba(0,0,0,0.1)]",
          isMatched 
            ? "border-duo-gray-light bg-duo-gray-lighter text-duo-gray opacity-50 shadow-none scale-[0.98]" 
            : isMismatched 
              ? "border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b] animate-shake"
              : isSelected 
                ? "border-[#84d8ff] bg-[#ddf4ff] text-[#1cb0f6]"
                : "border-duo-gray-light bg-white text-duo-ink hover:bg-duo-gray-lighter active:border-b-0 active:translate-y-[2px]"
        )}
      >
        {card.text}
      </button>
    )
  }

  return (
    <div className="flex w-full max-w-lg gap-4 mx-auto">
      <div className="flex flex-1 flex-col gap-3">
        {leftCards.map(renderCard)}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {rightCards.map(renderCard)}
      </div>
    </div>
  )
}
