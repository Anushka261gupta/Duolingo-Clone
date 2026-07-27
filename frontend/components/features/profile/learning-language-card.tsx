import { DuoCard } from "@/components/shared"
import type { Language } from "@/domain/types/profile"

interface LearningLanguageCardProps {
  language: Language
}

export function LearningLanguageCard({ language }: LearningLanguageCardProps) {
  return (
    <DuoCard>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-extrabold text-foreground">Learning</h3>
      </div>
      <div className="flex items-center gap-4 rounded-xl border-2 border-duo-gray-light p-4 transition-colors hover:bg-black/5">
        <span className="text-3xl">{language.flagIcon}</span>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">{language.name}</span>
          <span className="text-sm font-semibold text-duo-gray">Current Course</span>
        </div>
      </div>
    </DuoCard>
  )
}
