"use client"

import { X, BookOpen, MessageSquare, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DuoCard } from "./duo-card"

interface GuidebookModalProps {
  isOpen: boolean
  onClose: () => void
  unit: number
  title: string
  section: string
}

export function GuidebookModal({ isOpen, onClose, unit, title, section }: GuidebookModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto rounded-2xl no-scrollbar">
        <DuoCard className="p-0 overflow-hidden border-2 border-duo-green shadow-[0_4px_0_0_#58a700]">
          <div className="bg-duo-green px-6 py-6 text-white relative flex flex-col items-center justify-center text-center">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="size-6" strokeWidth={2.5} />
            </button>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">
              {section} · Unit {unit}
            </p>
            <h2 className="text-2xl font-extrabold text-balance">Guidebook: {title}</h2>
          </div>
          
          <div className="px-6 py-6 space-y-8 bg-white dark:bg-slate-900">
            {/* Key Phrases */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="size-6 text-duo-green" strokeWidth={2.5} />
                <h3 className="text-xl font-extrabold text-foreground">Key Phrases</h3>
              </div>
              <div className="space-y-3">
                {[
                  { lang: "Hola, ¿cómo estás?", en: "Hello, how are you?" },
                  { lang: "Me gustaría un café, por favor.", en: "I would like a coffee, please." },
                  { lang: "¿Dónde está el baño?", en: "Where is the bathroom?" }
                ].map((phrase, i) => (
                  <div key={i} className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-4">
                    <p className="font-extrabold text-lg text-foreground mb-1">{phrase.lang}</p>
                    <p className="font-medium text-duo-gray">{phrase.en}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="size-6 text-duo-blue" strokeWidth={2.5} />
                <h3 className="text-xl font-extrabold text-foreground">Grammar Notes</h3>
              </div>
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-4">
                <h4 className="font-bold text-foreground mb-2">The verb 'to be'</h4>
                <p className="text-sm font-medium leading-relaxed text-duo-gray">
                  In many languages, there are different ways to express the verb "to be" depending on whether you are talking about a permanent characteristic or a temporary state.
                </p>
              </div>
            </div>

            {/* Vocabulary */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="size-6 text-amber-500" strokeWidth={2.5} />
                <h3 className="text-xl font-extrabold text-foreground">Vocabulary</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { word: "Hola", en: "Hello" },
                  { word: "Adiós", en: "Goodbye" },
                  { word: "Por favor", en: "Please" },
                  { word: "Gracias", en: "Thank you" }
                ].map((vocab, i) => (
                  <div key={i} className="flex justify-between items-center rounded-xl border-2 border-slate-200 dark:border-slate-800 p-3">
                    <span className="font-bold text-foreground">{vocab.word}</span>
                    <span className="text-sm font-medium text-duo-gray">{vocab.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4 bg-white dark:bg-slate-900">
            <Button 
              size="lg"
              className="w-full bg-duo-green font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#58a700] transition-all hover:bg-duo-green hover:brightness-110 active:shadow-none active:translate-y-1" 
              onClick={onClose}
            >
              Got it
            </Button>
          </div>
        </DuoCard>
      </div>
    </div>
  )
}
