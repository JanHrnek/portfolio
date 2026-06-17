"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import { spring } from "@/lib/animation"

export default function JakPracujiPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ScrollProgress />
      <Navbar />

      <main>
        <section className="min-h-[55vh] flex flex-col justify-end pt-32 pb-16 px-6 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <motion.p
              className="text-xs uppercase tracking-[0.1em] mb-6"
              style={{ color: "var(--color-subtle)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ...spring.gentle }}
            >
              Přístup k práci
            </motion.p>
            <motion.h1
              className="font-heading font-bold leading-[1.05] tracking-[-0.03em] mb-8"
              style={{
                fontSize: "clamp(3rem, 8vw, 4.5rem)",
                color: "var(--color-text)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, ...spring.gentle }}
            >
              Jak pracuji
            </motion.h1>
            <motion.p
              className="text-xl max-w-2xl leading-[1.6]"
              style={{ color: "var(--color-muted)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, ...spring.gentle }}
            >
              Tato stránka bude brzy doplněna o popis mého pracovního přístupu,
              procesu a nástrojů.
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
