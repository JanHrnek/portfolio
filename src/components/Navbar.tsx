"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Projekty", href: "/projekty" },
  { label: "About", href: "/about" },
  { label: "Kontakt", href: "/kontakt" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
        <Link
          href="/"
          className="font-heading font-bold text-lg tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          JH
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive =
              pathname === href ||
              (href.length > 1 && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-200"
                style={{
                  color: isActive ? "var(--color-text)" : "var(--color-muted)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isActive
                    ? "var(--color-text)"
                    : "var(--color-muted)")
                }
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
