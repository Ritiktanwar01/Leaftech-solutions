import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/lib/redux/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leaf Tech Solutions - Custom Software & Web Development",
  description:
    "We build custom software solutions, websites, mobile apps, and CRM systems that help businesses streamline operations and drive growth.",
  generator: 'Ritik Tanwar',
  applicationName: "Leaf Tech Solutions",
  icons: {
    icon: "/favicon.ico",},
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "CRM systems",
    "business solutions",
    "Leaf Tech Solutions",
    "software engineering",
    "digital transformation",
    "business automation"
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}