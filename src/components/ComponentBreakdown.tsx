"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { spring } from "@/lib/animation"

export type ComponentItem = {
  title: string
  category: string
  weight: string
  material: string
  description: string
  image?: string
}

type Props = {
  components: ComponentItem[]
  accent: string
}

function ComponentRow({
  item,
  index,
  accent,
}: {
  item: ComponentItem
  index: number
  accent: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ ...spring.gentle, delay: index * 0.06 }}
      style={{
        backgroundColor: index % 2 !== 0 ? "rgba(0,0,0,0.02)" : "transparent",
        padding: "24px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left: category + title */}
        <div className="flex-1">
          <p
            className="text-xs uppercase tracking-[0.1em] mb-1 font-heading font-medium"
            style={{ color: accent }}
          >
            {item.category}
          </p>
          <h3
            className="font-heading font-bold"
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "var(--color-text)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {item.title}
          </h3>
        </div>

        {/* Right: meta pills */}
        <div className="flex flex-row lg:flex-col gap-2 shrink-0">
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: `1px solid ${accent}`,
              color: accent,
            }}
          >
            {item.weight}
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              border: "1px solid var(--color-border)",
              color: "var(--color-muted)",
            }}
          >
            {item.material}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="mt-4 text-sm leading-[1.75] max-w-3xl"
        style={{ color: "var(--color-muted)" }}
      >
        {item.description}
      </p>
    </motion.div>
  )
}

export default function ComponentBreakdown({ components, accent }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={spring.gentle}
          className="mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.1em] mb-3 font-heading font-medium"
            style={{ color: accent }}
          >
            Component Breakdown
          </p>
          <div className="w-8 h-px" style={{ backgroundColor: accent }} />
        </motion.div>

        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          {components.map((item, i) => (
            <ComponentRow key={i} item={item} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  )
}
