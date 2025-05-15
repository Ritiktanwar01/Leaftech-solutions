"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Toaster } from "@/components/ui/toaster"
import AdminSidebar from "@/components/admin/sidebar"
import type { RootState } from "@/lib/redux/store"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Redirect to login if not authenticated and not already on login page
    if (!loading && !isAuthenticated && !window.location.pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, loading, router])

  // Show nothing while checking authentication
  // if (loading) {
  //   return <div className="flex h-screen items-center justify-center">Loading...</div>
  // }

  // If not authenticated and not on login page, don't render anything
  // if (!isAuthenticated && !window.location.pathname.includes("/admin/login")) {
  //   return null
  // }

  // For login page, don't show the sidebar
  // if (window.location.pathname.includes("/admin/login")) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       {children}
  //       <Toaster />
  //     </div>
  //   )
  // }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
