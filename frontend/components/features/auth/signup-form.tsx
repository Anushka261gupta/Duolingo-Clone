import { useState } from "react"
import { useAuthContext } from "@/providers/auth-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "./form-error"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function SignupForm() {
  const { signup, isLoading } = useAuthContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; global?: string }>({})

  const validate = () => {
    const newErrors: typeof errors = {}
    
    if (!name) newErrors.name = "Name is required"

    if (!email) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email"
    
    if (!password) {
      newErrors.password = "Password is required"
    } else {
      if (password.length < 8) newErrors.password = "Must be at least 8 characters"
      else if (!/[A-Z]/.test(password)) newErrors.password = "Must contain an uppercase letter"
      else if (!/[a-z]/.test(password)) newErrors.password = "Must contain a lowercase letter"
      else if (!/[0-9]/.test(password)) newErrors.password = "Must contain a number"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const res = await signup({ name, email, password })
    if (res.error) {
      setErrors({ global: res.error })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errors.global && (
        <div className="rounded-xl border-2 border-rose-500/20 bg-rose-500/10 p-4 text-center font-bold text-rose-500">
          {errors.global}
        </div>
      )}

      <div>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <FormError message={errors.name} />
      </div>

      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <FormError message={errors.email} />
      </div>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3.5 text-duo-gray hover:text-foreground"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
        <FormError message={errors.password} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full font-extrabold uppercase tracking-wide"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="size-5 animate-spin" /> : "Create Account"}
      </Button>
    </form>
  )
}
