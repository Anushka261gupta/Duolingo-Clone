import { DuoCard } from "@/components/shared"
import type { Language } from "@/domain/types/profile"

interface LearningLanguageCardProps {
  language: Language
}

export function LearningLanguageCard({ language }: LearningLanguageCardProps) {
  return (
    <DuoCard>
      <h3 className="mb-4 text-xl font-extrabold text-foreground">Learning</h3>
      <div className="flex items-center gap-4 rounded-xl border-2 border-duo-gray-light p-4 transition-colors hover:bg-black/5">
        <span className="text-3xl">{language.flagIcon}</span>
        <span className="text-lg font-bold text-foreground">{language.name}</span>
      </div>
    </DuoCard>
  )
}
