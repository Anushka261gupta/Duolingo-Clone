"use client"

interface ContinueButtonProps {
  disabled: boolean
  onClick: () => void
}

export function ContinueButton({ disabled, onClick }: ContinueButtonProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-duo-gray-light bg-background px-4 py-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`w-full rounded-2xl py-3.5 text-sm font-extrabold uppercase tracking-wide transition-all duration-200 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed ${
            disabled
              ? "bg-duo-gray-light text-duo-gray shadow-[0_4px_0_0_#c9c9c9]"
              : "bg-duo-green text-white shadow-[0_4px_0_0_#58a700] hover:brightness-105"
          }`}
        >
          Check
        </button>
      </div>
    </div>
  )
}
