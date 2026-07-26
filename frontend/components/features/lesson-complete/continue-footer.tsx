import Link from "next/link"

interface ContinueFooterProps {
  href?: string
  label?: string
}

export function ContinueFooter({ href = "/", label = "Continue" }: ContinueFooterProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-duo-gray-light bg-background px-4 py-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href={href}
          className="flex w-full items-center justify-center rounded-2xl bg-duo-green py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_#58a700] transition-transform active:translate-y-1 active:shadow-none"
        >
          {label}
        </Link>
      </div>
    </div>
  )
}
