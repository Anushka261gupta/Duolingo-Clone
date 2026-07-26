import type { Unit } from "@/domain/types"

export const MOCK_UNITS: Unit[] = [
  {
    section: "Section 2",
    unit: "Unit 4",
    title: "Order food, describe people",
    color: "bg-duo-green",
    edge: "shadow-[0_4px_0_0_#58a700]",
    nodes: [
      { state: "completed", kind: "star" },
      { state: "completed", kind: "star" },
      { state: "completed", kind: "trophy" },
      { state: "current", kind: "star", progress: 0.4, showStart: true, mascot: true },
      { state: "locked", kind: "star" },
      { state: "locked", kind: "practice" },
      { state: "locked", kind: "star" },
    ],
  },
  {
    section: "Section 2",
    unit: "Unit 5",
    title: "Talk about the past",
    color: "bg-duo-blue",
    edge: "shadow-[0_4px_0_0_#1899d6]",
    nodes: [
      { state: "locked", kind: "star" },
      { state: "locked", kind: "star" },
      { state: "locked", kind: "trophy" },
      { state: "legendary", kind: "trophy" },
    ],
  },
]
