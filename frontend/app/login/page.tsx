"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuthContext } from "@/providers/auth-provider"
import { AuthCard, LoginForm, SocialButtons } from "@/components/features/auth"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, login } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) return null // Prevent flash before redirect

  const handleGoogleLogin = async () => {
    // TODO: FUTURE OAUTH INTEGRATION
    await login({ email: "", provider: "google" })
  }

  const handleAppleLogin = async () => {
    // TODO: FUTURE OAUTH INTEGRATION
    await login({ email: "", provider: "apple" })
  }

  return (
    <AuthCard title="Log in" subtitle="Enter your details to get back to learning">
      <LoginForm />
      <SocialButtons 
        isLoading={isLoading} 
        onGoogleLogin={handleGoogleLogin} 
        onAppleLogin={handleAppleLogin} 
      />
      <p className="mt-8 text-center font-bold text-duo-gray">
        Don't have an account?{" "}
        <Link href="/signup" className="text-duo-blue hover:underline">
          Sign up
        </Link>
      </p>
    </AuthCard>
  )
}
