"use client"

import Image from "next/image"

import { offsetFor } from "@/domain/constants/path-offsets"
import { MOCK_UNITS } from "@/data/units"

import { LessonNode } from "./lesson-node"
import { UnitBanner } from "./unit-banner"

export function LearningPath() {
  return (
    <div className="flex flex-col gap-6">
      {MOCK_UNITS.map((unit, ui) => (
        <section key={`${unit.unit}-${ui}`} className="flex flex-col gap-2">
          <UnitBanner
            section={unit.section}
            unit={unit.unit}
            title={unit.title}
            color={unit.color}
            edge={unit.edge}
          />

          <div className="relative flex flex-col items-center gap-4 py-6">
            {unit.nodes.map((node, i) => {
              const offset = offsetFor(i)
              return (
                <div key={i} className="relative flex w-full items-center justify-center">
                  <LessonNode
                    state={node.state}
                    kind={node.kind}
                    progress={node.progress}
                    offset={offset}
                    showStart={node.showStart}
                  />
                  {node.mascot && (
                    <div
                      className="animate-duo-pop absolute top-1/2 hidden -translate-y-1/2 sm:block"
                      style={{ left: `calc(50% + ${offset + 96}px)` }}
                    >
                      <Image
                        src="/duo-owl.png"
                        alt="Duo the owl mascot"
                        width={110}
                        height={110}
                        className="drop-shadow-sm"
                        priority
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
