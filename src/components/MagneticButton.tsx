"use client"

import { useMotionValue, useSpring, motion } from "framer-motion"

interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export default function MagneticButton({ children, onClick }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 400, damping: 30, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 400, damping: 30, mass: 0.5 })

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35
    x.set(Math.max(-10, Math.min(10, dx)))
    y.set(Math.max(-10, Math.min(10, dy)))
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a0a0a] text-[#fafafa] font-heading font-medium text-sm tracking-wide hover:bg-[#c8a96e] hover:text-[#0a0a0a] transition-colors duration-200 cursor-pointer select-none"
    >
      {children}
    </motion.button>
  )
}
