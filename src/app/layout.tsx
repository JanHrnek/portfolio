import type { Metadata } from "next"
import "./globals.css"
import SmoothScrollProvider from "@/components/SmoothScroll"

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
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
