"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { spring } from "@/lib/animation"

interface Props {
  title: string
  description: string
  gradientClass: string
  href?: string
}

export default function ProjectCard({ title, description, gradientClass, href }: Props) {
  const card = (
    <motion.article
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: "0 24px 48px rgba(0,0,0,0.09)",
      }}
      transition={spring.snappy}
      className="cursor-pointer"
    >
      <div className={`aspect-[4/3] rounded-md ${gradientClass}`} />
      <div className="mt-5">
        <h3 className="font-heading font-medium text-lg">{title}</h3>
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
