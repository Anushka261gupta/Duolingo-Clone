"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthContext } from "@/providers/auth-provider"
import { AuthCard, SignupForm, SocialButtons } from "@/components/features/auth"

export default function SignupPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, signup } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) return null // Prevent flash before redirect

  const handleGoogleLogin = async () => {
    // TODO: FUTURE OAUTH INTEGRATION
    await signup({ name: "Google User", email: "", provider: "google" })
  }

  const handleAppleLogin = async () => {
    // TODO: FUTURE OAUTH INTEGRATION
    await signup({ name: "Apple User", email: "", provider: "apple" })
  }

  return (
    <AuthCard title="Create your profile" subtitle="Join millions of learners today">
      <SignupForm />
      <SocialButtons 
        isLoading={isLoading} 
        onGoogleLogin={handleGoogleLogin} 
        onAppleLogin={handleAppleLogin} 
      />
      <p className="mt-8 text-center font-bold text-duo-gray">
        Already have an account?{" "}
        <Link href="/login" className="text-duo-blue hover:underline">
          Log in
        </Link>
      </p>
    </AuthCard>
  )
}
