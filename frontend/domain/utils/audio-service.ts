export class AudioService {
  static play(audioUrl?: string, audioText?: string, lang: string = 'es-ES') {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play().catch(e => {
        console.warn("Failed to play audioUrl, falling back to SpeechSynthesis", e)
        this.speak(audioText, lang)
      })
    } else if (audioText) {
      this.speak(audioText, lang)
    }
  }

  private static speak(text?: string, lang: string = 'es-ES') {
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return
    
    // Cancel any ongoing speech to avoid queueing delays
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    window.speechSynthesis.speak(utterance)
  }
}
