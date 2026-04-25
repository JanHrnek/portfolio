"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { spring } from "@/lib/animation"

const navLinks = [
  { label: "Projekty", href: "/projekty" },
  { label: "About", href: "/about" },
  { label: "Kontakt", href: "/kontakt" },
]

interface NavbarProps {
  lightLinks?: boolean
}

function NavLink({
  label,
  href,
  isActive,
  light,
  onClick,
}: {
  label: string
  href: string
  isActive: boolean
  light: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = light
    ? isActive ? "#ffffff" : "rgba(255,255,255,0.6)"
    : isActive ? "var(--color-text)" : "var(--color-muted)"

  const hoverColor = light ? "#ffffff" : "var(--color-text)"

  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative text-sm transition-colors duration-200"
      style={{ color: hovered ? hoverColor : baseColor }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute left-0 bottom-[-3px] h-px"
        style={{ backgroundColor: "currentColor" }}
        initial={false}
        animate={{ width: hovered || isActive ? "100%" : "0%" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </Link>
  )
}

export default function Navbar({ lightLinks = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const logoColor = scrolled
    ? "var(--color-text)"
    : lightLinks ? "rgba(255,255,255,0.95)" : "var(--color-text)"

  const effectiveLight = lightLinks && !scrolled

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-[#fafafa]/80 border-b border-[#e8e8e8]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.08, rotate: 4 }} transition={spring.snappy}>
            <Link
              href="/"
              className="font-heading font-bold text-lg tracking-tight transition-colors duration-300"
              style={{ color: logoColor }}
            >
              JH
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ label, href }) => {
              const isActive =
                pathname === href || (href.length > 1 && pathname.startsWith(href))
              return (
                <NavLink
                  key={href}
                  label={label}
                  href={href}
                  isActive={isActive}
                  light={effectiveLight}
                />
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-2 transition-colors duration-200"
            style={{ color: effectiveLight ? "rgba(255,255,255,0.8)" : "var(--color-text)" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={spring.snappy}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={spring.snappy}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--color-bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, ...spring.gentle }}
                >
                  <Link
                    href={href}
                    className="font-heading font-bold tracking-[-0.02em]"
                    style={{
                      fontSize: "clamp(2rem, 8vw, 3rem)",
                      color: "var(--color-text)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
