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
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
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
