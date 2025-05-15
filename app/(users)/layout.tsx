import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import Header from "../components/header"
import Footer from "../components/footer"


export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </>
  )
}