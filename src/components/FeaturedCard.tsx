"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { spring } from "@/lib/animation"

interface Props {
  index: number
  title: string
  description: string
  gradientClass?: string
  gradientStyle?: string
  accentColor?: string
  href?: string
  size?: "large" | "small"
}

export default function FeaturedCard({
  index,
  title,
  description,
  gradientClass = "",
  gradientStyle,
  accentColor = "var(--color-accent)",
  href,
  size = "small",
}: Props) {
  const [hovered, setHovered] = useState(false)

  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 300, damping: 28, mass: 0.5 })
  const sRotY = useSpring(rotY, { stiffness: 300, damping: 28, mass: 0.5 })

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
    rotX.set(dy * -5)
    rotY.set(dx * 5)
  }

  function onMouseLeave() {
    rotX.set(0)
    rotY.set(0)
    setHovered(false)
  }

  const num = String(index + 1).padStart(2, "0")

  const card = (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 1000,
        borderColor: hovered ? accentColor : "var(--color-border)",
        height: size === "large" ? "100%" : "auto",
      }}
      className="relative overflow-hidden border flex flex-col cursor-pointer transition-colors duration-300"
    >
      {/* Image / gradient area */}
      <div
        className={`relative overflow-hidden ${gradientClass} ${size === "large" ? "flex-1" : ""}`}
        style={{
          background: gradientStyle,
          aspectRatio: size === "large" ? undefined : "4 / 3",
          minHeight: size === "large" ? 280 : undefined,
        }}
      >
        {/* Large project number */}
        <span
          aria-hidden
          className="absolute bottom-3 right-4 font-heading font-bold select-none pointer-events-none"
          style={{
            fontSize: "clamp(4rem, 10vw, 7rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.10)",
          }}
        >
          {num}
        </span>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={spring.snappy}
          style={{ background: "rgba(0,0,0,0.32)" }}
        >
          <span
            className="font-heading font-medium text-sm tracking-wide px-5 py-2.5"
            style={{
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            Zobrazit projekt →
          </span>
        </motion.div>
      </div>

      {/* Text */}
      <div className="p-5" style={{ backgroundColor: "var(--color-surface)" }}>
        <h3
          className="font-heading font-medium text-lg"
          style={{ color: "var(--color-text)" }}
        >
          {title}
        </h3>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {description}
        </p>
      </div>
    </motion.article>
  )

  const wrapper = href ? (
    <Link href={href} className="block" style={{ height: size === "large" ? "100%" : "auto" }}>
      {card}
    </Link>
  ) : (
    card
  )

  return wrapper
}
