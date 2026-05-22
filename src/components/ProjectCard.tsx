"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { spring } from "@/lib/animation"
import IsoCube from "@/components/IsoCube"

interface Props {
  title: string
  description: string
  gradientClass?: string
  gradientStyle?: string
  accentColor?: string
  href?: string
  inProgress?: boolean
}

export default function ProjectCard({ title, description, gradientClass, gradientStyle, accentColor = "var(--color-accent)", href, inProgress }: Props) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.1)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={spring.snappy}
      className="cursor-pointer overflow-hidden"
      style={{
        border: `1px solid ${hovered ? accentColor : "var(--color-border)"}`,
        borderRadius: "12px",
        transition: "border-color 0.25s ease",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <IsoCube />
        </div>
      </div>
      <div className="p-5" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
          <h3 className="font-heading font-medium text-lg" style={{ color: "var(--color-text)" }}>
            {title}
          </h3>
          {inProgress && (
            <span
              className="text-xs font-heading px-2 py-0.5 shrink-0"
              style={{
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
                borderRadius: "2px",
              }}
            >
              In Progress
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {description}
        </p>
      </div>
    </motion.article>
  )

  if (href) {
    return <Link href={href} className="block">{card}</Link>
  }

  return card
}
