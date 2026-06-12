"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { spring } from "@/lib/animation"

export type DesignCard = {
  title: string
  subtitle: string
  image?: string
  shortDesc: string
  fullDesc: string
}

type Props = {
  cards: DesignCard[]
  accent: string
}

export default function DesignJourneyCards({ cards, accent }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
            Design Journey
          </p>
          <div className="w-8 h-px" style={{ backgroundColor: accent }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const isActive = activeIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...spring.gentle, delay: i * 0.1 }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? accent : "var(--color-border)"}`,
                  transition: "border-color 0.2s ease",
                }}
              >
                {/* Image / gradient placeholder */}
                <div
                  style={{
                    height: 180,
                    background: card.image
                      ? `url(${card.image}) center/cover no-repeat`
                      : `linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 100%)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!card.image && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="font-heading font-bold"
                        style={{
                          fontSize: "clamp(2rem, 4vw, 3rem)",
                          color: accent,
                          opacity: 0.15,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      backgroundColor: accent,
                      color: "#fff",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "3px 8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-heading font-bold text-lg mb-1"
                    style={{ color: "var(--color-text)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-xs uppercase tracking-[0.08em] mb-3"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    {card.subtitle}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {card.shortDesc}
                  </p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={spring.gentle}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="mt-4 pt-4 text-sm leading-[1.75]"
                          style={{
                            color: "var(--color-muted)",
                            borderTop: `1px solid var(--color-border)`,
                          }}
                        >
                          {card.fullDesc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className="mt-4 text-xs font-heading font-medium uppercase tracking-[0.08em] flex items-center gap-2"
                    style={{ color: accent }}
                  >
                    {isActive ? "Skrýt" : "Číst více"}
                    <motion.span
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={spring.snappy}
                    >
                      ↓
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
