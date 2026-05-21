import type { Metadata } from "next"
import "./globals.css"
import SmoothScrollProvider from "@/components/SmoothScroll"
import ScrollToTop from "@/components/ScrollToTop"
import CustomCursor from "@/components/CustomCursor"

export const metadata: Metadata = {
  title: "Portfolio — Jan Hrnek",
  description: "Konstrukční inženýrství — VUT FSI Brno",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body className="antialiased">
        <CustomCursor />
        <ScrollToTop />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
