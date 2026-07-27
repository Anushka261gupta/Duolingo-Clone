"use client"

import { useState } from "react"
import { Zap } from "lucide-react"
import { SuperModal } from "@/components/shared/super-modal"

export function SuperCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="overflow-hidden rounded-2xl border-2 border-duo-purple/30 bg-duo-purple/5 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Zap className="size-5 fill-duo-purple text-duo-purple" strokeWidth={0} />
          <span className="text-lg font-extrabold text-duo-purple">Super Duolingo</span>
        </div>
        <p className="mb-4 text-sm font-medium leading-relaxed text-duo-gray">
          Try Super for free and learn without ads, plus get unlimited hearts and legendary lessons.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full rounded-2xl bg-duo-purple px-4 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#a568cc] transition-transform active:translate-y-1 active:shadow-none"
        >
          Try 2 weeks free
        </button>
      </div>

      <SuperModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
