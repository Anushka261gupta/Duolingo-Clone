"use client"

import Link from "next/link"
import { Check, Crown, Dumbbell, Lock, Star } from "lucide-react"

import type { LessonNodeProps, NodeKind, NodeState } from "@/domain/types"

export type { NodeState, NodeKind, LessonNodeProps }

const RING_SIZE = 108
const RING_RADIUS = 48
const RING_CIRC = 2 * Math.PI * RING_RADIUS

function nodeColors(state: NodeState) {
  switch (state) {
    case "completed":
      return { face: "bg-duo-gold", edge: "shadow-[0_6px_0_0_#e6a600]", ink: "text-white" }
    case "current":
      return { face: "bg-duo-green", edge: "shadow-[0_6px_0_0_#58a700]", ink: "text-white" }
    case "legendary":
      return { face: "bg-duo-purple", edge: "shadow-[0_6px_0_0_#a568cc]", ink: "text-white" }
    case "locked":
    default:
      return { face: "bg-duo-gray-light", edge: "shadow-[0_6px_0_0_#c9c9c9]", ink: "text-duo-gray" }
  }
}

function NodeIcon({ state, kind }: { state: NodeState; kind: NodeKind }) {
  if (state === "locked") return <Lock className="size-9" strokeWidth={2.75} />
  if (state === "legendary") return <Crown className="size-10 fill-current" strokeWidth={2} />
  if (kind === "practice") return <Dumbbell className="size-9" strokeWidth={2.75} />
  if (kind === "trophy") return <Crown className="size-10 fill-current" strokeWidth={2} />
  if (state === "completed") return <Check className="size-10" strokeWidth={4} />
  return <Star className="size-11 fill-current" strokeWidth={1.5} />
}

export function LessonNode({
  state,
  kind = "star",
  progress = 0,
  offset = 0,
  showStart = false,
  href,
}: LessonNodeProps) {
  const { face, edge, ink } = nodeColors(state)
  const isCurrent = state === "current"

  const NodeContent = (
    <span className="transition-transform duration-100 group-hover:scale-110">
      <NodeIcon state={state} kind={kind} />
    </span>
  )

  const buttonClasses = `group flex size-[74px] items-center justify-center rounded-full ${face} ${edge} ${ink} transition-transform duration-100 active:translate-y-1 active:shadow-none`

  return (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {showStart && (
        <div className="animate-duo-bounce absolute -top-12 z-20 select-none">
          {href ? (
            <Link
              href={href}
              className="relative block rounded-2xl border-2 border-duo-gray-light bg-background px-4 py-1.5 shadow-sm transition-transform active:scale-95 active:shadow-none"
            >
              <span className="text-sm font-extrabold uppercase tracking-wide text-duo-green">Start</span>
              <span className="absolute -bottom-[9px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-duo-gray-light bg-background" />
            </Link>
          ) : (
            <div className="relative rounded-2xl border-2 border-duo-gray-light bg-background px-4 py-1.5 shadow-sm">
              <span className="text-sm font-extrabold uppercase tracking-wide text-duo-green">Start</span>
              <span className="absolute -bottom-[9px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-duo-gray-light bg-background" />
            </div>
          )}
        </div>
      )}

      <div className="relative flex items-center justify-center" style={{ width: RING_SIZE, height: RING_SIZE }}>
        {isCurrent && (
          <svg
            className="absolute inset-0 -rotate-90 pointer-events-none"
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            aria-hidden="true"
          >
            <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" stroke="#e5e5e5" strokeWidth={8} />
            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_RADIUS}
              fill="none"
              stroke="#ffc800"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={RING_CIRC}
              strokeDashoffset={RING_CIRC * (1 - progress)}
            />
          </svg>
        )}

        {href ? (
          <Link href={href} className={buttonClasses} aria-label={`${state} lesson`}>
            {NodeContent}
          </Link>
        ) : (
          <button className={buttonClasses} aria-label={`${state} lesson`}>
            {NodeContent}
          </button>
        )}
      </div>
    </div>
  )
}

