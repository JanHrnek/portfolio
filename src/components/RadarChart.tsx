"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const CX = 170
const CY = 148
const R = 92
const N = 5

const skills = [
  { label: "SolidWorks", sublabel: "CSWP certified", level: 0.80 },
  { label: "Fusion 360",  sublabel: null,             level: 0.75 },
  { label: "AutoCAD",     sublabel: null,             level: 0.70 },
  { label: "SW Visualize",sublabel: null,             level: 0.65 },
  { label: "Excel / VBA", sublabel: null,             level: 0.70 },
]

const RINGS = [0.25, 0.5, 0.75, 1.0]

function axisAngle(i: number) {
  return -Math.PI / 2 + (2 * Math.PI * i) / N
}

function pt(r: number, i: number): [number, number] {
  const a = axisAngle(i)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function ringPoints(r: number): string {
  return Array.from({ length: N }, (_, i) => pt(r, i).join(",")).join(" ")
}

function dataPoints(): string {
  return skills.map((s, i) => pt(R * s.level, i).join(",")).join(" ")
}

function labelAnchor(i: number): "middle" | "start" | "end" {
  if (i === 0) return "middle"
  if (i === 1 || i === 2) return "start"
  return "end"
}

export default function RadarChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref}>
      <svg
        viewBox="0 0 340 285"
        width="100%"
        aria-hidden
        style={{ overflow: "visible" }}
      >
        {/* Background rings */}
        {RINGS.map((ratio, ri) => (
          <motion.polygon
            key={ri}
            points={ringPoints(R * ratio)}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={ratio === 1 ? 1 : 0.8}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: ri * 0.08, duration: 0.35 }}
          />
        ))}

        {/* Ring percentage labels (25 / 50 / 75) */}
        {[0.25, 0.5, 0.75].map((ratio, ri) => {
          const [x, y] = pt(R * ratio, 0)
          return (
            <motion.text
              key={ri}
              x={x + 5}
              y={y - 2}
              fontSize="7"
              fontFamily="var(--font-heading)"
              fill="var(--color-subtle)"
              textAnchor="start"
              dominantBaseline="auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.75 } : { opacity: 0 }}
              transition={{ delay: 0.25 + ri * 0.08 }}
            >
              {ratio * 100}%
            </motion.text>
          )
        })}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const [x, y] = pt(R, i)
          return (
            <motion.line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="var(--color-border)"
              strokeWidth="0.9"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
            />
          )
        })}

        {/* Data polygon + dots — scaled from center */}
        <motion.g
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          initial={{ scale: 0.35, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.35, opacity: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 150, damping: 22 }}
        >
          <polygon
            points={dataPoints()}
            fill="var(--color-accent)"
            fillOpacity="0.13"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {skills.map((s, i) => {
            const [x, y] = pt(R * s.level, i)
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3.2}
                fill="var(--color-accent)"
              />
            )
          })}
        </motion.g>

        {/* Skill labels */}
        {skills.map((s, i) => {
          const LOFF = 22
          const [lx, ly] = pt(R + LOFF, i)
          const anchor = labelAnchor(i)

          // Nudge bottom labels down a bit, top label up a bit
          const dyMain = i === 0 ? -5 : i === 2 || i === 3 ? 5 : 0

          return (
            <motion.g
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 + i * 0.09 }}
            >
              <text
                x={lx}
                y={ly + dyMain}
                textAnchor={anchor}
                dominantBaseline="central"
                fontSize="10"
                fontFamily="var(--font-heading)"
                fontWeight="500"
                fill="var(--color-text)"
              >
                {s.label}
              </text>
              {s.sublabel && (
                <text
                  x={lx}
                  y={ly + dyMain + 13}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  fontSize="8"
                  fontFamily="var(--font-body)"
                  fill="var(--color-subtle)"
                >
                  {s.sublabel}
                </text>
              )}
            </motion.g>
          )
        })}
      </svg>

    </div>
  )
}
