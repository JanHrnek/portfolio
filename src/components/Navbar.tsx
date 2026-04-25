"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-[#fafafa]/80 border-b border-[#e8e8e8]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        <span className="font-heading font-bold text-lg tracking-tight">JH</span>
        <div className="flex items-center gap-8">
          {[
            { label: "Projekty", href: "#projekty" },
            { label: "About", href: "#about" },
            { label: "Kontakt", href: "#kontakt" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
