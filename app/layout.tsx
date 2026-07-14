import { Metadata } from "next"
import { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ghiblimovieexplorer.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Movie Explorer — Studio Ghibli Films",
    template: "%s | Movie Explorer",
  },
  description:
    "Browse, search, and sort the complete Studio Ghibli film catalog — ratings, release years, directors, and more.",
  openGraph: {
    siteName: "Movie Explorer",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
