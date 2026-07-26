export type NodeState = "completed" | "current" | "locked" | "legendary"
export type NodeKind = "star" | "practice" | "trophy"

export interface PathNode {
  state: NodeState
  kind?: NodeKind
  progress?: number
  showStart?: boolean
  mascot?: boolean
}

export interface Unit {
  section: string
  unit: string
  title: string
  color: string
  edge: string
  nodes: PathNode[]
}

export interface LessonNodeProps {
  state: NodeState
  kind?: NodeKind
  /** progress 0-1 for the ring on the current node */
  progress?: number
  /** horizontal offset in pixels to create the snaking path */
  offset?: number
  showStart?: boolean
}

export interface UnitBannerProps {
  section: string
  unit: string
  title: string
  color?: string
  edge?: string
}
