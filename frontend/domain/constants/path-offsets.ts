/** Snaking horizontal offsets that repeat like a sine wave for the learning path. */
export const PATH_OFFSETS = [0, -50, -80, -50, 0, 50, 80, 50] as const

export function offsetFor(index: number): number {
  return PATH_OFFSETS[index % PATH_OFFSETS.length]
}
