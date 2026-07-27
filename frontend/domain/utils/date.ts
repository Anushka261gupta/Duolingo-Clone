/**
 * Standardizes a date string to a consistent format for comparison (YYYY-MM-DD).
 */
export function toDateString(d: Date | string): string {
  const date = new Date(d)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function isToday(d: Date | string): boolean {
  return toDateString(new Date()) === toDateString(d)
}

export function isYesterday(d: Date | string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return toDateString(yesterday) === toDateString(d)
}

export function differenceInDays(d1: Date | string, d2: Date | string): number {
  const date1 = new Date(toDateString(d1))
  const date2 = new Date(toDateString(d2))
  
  // Calculate difference in milliseconds
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  
  // Convert back to days
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}
