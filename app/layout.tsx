import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const minecraftFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-minecraft",
})

export const metadata: Metadata = {
  title: "Nico...",
  description: "Te amo, Nico...",
  generator: "surge.xyz",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${minecraftFont.variable} font-minecraft antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
