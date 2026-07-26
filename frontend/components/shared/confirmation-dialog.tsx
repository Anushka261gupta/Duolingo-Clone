"use client"

import { Button } from "@/components/ui/button"
import { DuoCard } from "./duo-card"
import { AlertCircle, X } from "lucide-react"

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationDialog({
  isOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <DuoCard className="p-6">
           <div className="mb-4 flex items-start justify-between">
             <div className="flex items-center gap-3 text-rose-500">
                <AlertCircle className="size-6" />
                <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
             </div>
             <button onClick={onCancel} className="text-duo-gray hover:text-foreground">
               <X className="size-6" strokeWidth={2.5} />
             </button>
           </div>
           
           <p className="mb-8 font-bold text-duo-gray">{description}</p>
           
           <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 font-extrabold uppercase tracking-wide text-duo-gray" 
                onClick={onCancel}
              >
                {cancelText}
              </Button>
              <Button 
                size="lg"
                className="flex-1 bg-rose-500 font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#be123c] transition-opacity hover:bg-rose-500 hover:opacity-80 active:shadow-none active:translate-y-1" 
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
           </div>
        </DuoCard>
      </div>
    </div>
  )
}
