"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { spring } from "@/lib/animation"

interface Props {
  title: string
  description: string
  gradientClass?: string
  gradientStyle?: string
  accentColor?: string
  href?: string
}

export default function ProjectCard({ title, description, gradientClass, gradientStyle, accentColor = "var(--color-accent)", href }: Props) {
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
        <motion.div
          className={`absolute inset-0 ${gradientClass ?? ""}`}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={spring.gentle}
          style={gradientStyle ? { background: gradientStyle } : undefined}
        />
      </div>
      <div className="p-5" style={{ backgroundColor: "var(--color-surface)" }}>
        <h3 className="font-heading font-medium text-lg" style={{ color: "var(--color-text)" }}>
          {title}
        </h3>
        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--color-muted)" }}>
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
