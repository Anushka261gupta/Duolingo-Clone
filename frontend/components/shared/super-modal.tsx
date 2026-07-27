"use client"

import { Zap, Heart, ShieldX, Trophy, ArrowUpCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DuoCard } from "./duo-card"

interface SuperModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuperModal({ isOpen, onClose }: SuperModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <DuoCard className="p-0 overflow-hidden">
          <div className="bg-duo-purple/10 px-6 py-8 text-center relative">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-duo-gray hover:text-foreground transition-colors"
            >
              <X className="size-6" strokeWidth={2.5} />
            </button>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-duo-purple">
              <Zap className="size-8 fill-white text-white" strokeWidth={0} />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">Try Super Duolingo</h2>
            <p className="font-bold text-duo-gray">2 weeks free, then $6.99/month.</p>
          </div>
          
          <div className="px-6 py-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10">
                <Heart className="size-5 fill-rose-500 text-rose-500" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-bold">Unlimited Hearts</p>
                <p className="text-sm font-medium text-duo-gray">Make mistakes without limits</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-duo-gray/10">
                <ShieldX className="size-5 text-duo-gray" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-bold">No Ads</p>
                <p className="text-sm font-medium text-duo-gray">Learn without interruptions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10">
                <Trophy className="size-5 text-amber-500" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-bold">Unlimited Legendary</p>
                <p className="text-sm font-medium text-duo-gray">Prove your skills in tough lessons</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-duo-green/10">
                <ArrowUpCircle className="size-5 text-duo-green" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="font-bold">Monthly Streak Repair</p>
                <p className="text-sm font-medium text-duo-gray">Keep your streak alive</p>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 space-y-3">
            <Button 
              size="lg"
              className="w-full bg-duo-purple font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#a568cc] transition-all hover:bg-duo-purple hover:brightness-110 active:shadow-none active:translate-y-1" 
              onClick={onClose}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="w-full font-extrabold uppercase tracking-wide text-duo-gray hover:bg-transparent hover:text-duo-gray" 
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>
        </DuoCard>
      </div>
    </div>
  )
}
