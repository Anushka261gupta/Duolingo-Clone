export interface ToastOptions {
  title: string
  description?: string
  icon?: string | React.ReactNode
  type?: "success" | "error" | "info"
}

export function notify(options: ToastOptions) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("app-toast", { detail: options })
    )
  }
}

export function useToast() {
  return { notify }
}
