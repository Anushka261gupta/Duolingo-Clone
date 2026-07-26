import { HeartCrack } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function OutOfHearts() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 bg-white gap-8 max-w-[400px] mx-auto">
      <HeartCrack size={120} className="text-[#ff4b4b] mb-4 stroke-[1.5]" />
      
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-duo-ink text-center">
          You're out of hearts!
        </h1>
        <p className="text-duo-gray font-bold text-lg">
          You need hearts to start new lessons.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mt-8">
        <Button variant="secondary" className="w-full h-14 uppercase text-base font-bold disabled:opacity-50" disabled>
          Practice to Earn (Coming Soon)
        </Button>
        
        <Button variant="secondary" className="w-full h-14 uppercase text-base font-bold disabled:opacity-50" disabled>
          Go to Shop (Coming Soon)
        </Button>
        
        <Button className="w-full h-14 uppercase text-base font-bold" asChild>
          <Link href="/learn">
            Return to Learn
          </Link>
        </Button>
      </div>
    </div>
  )
}
