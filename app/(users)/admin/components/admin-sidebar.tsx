"use client"

import Link from "next/link"
import { BarChart, Calendar, Home, MessageSquare, Package, Settings, Users } from "lucide-react"

export default function AdminSidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <BarChart className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <MessageSquare className="h-4 w-4" />
              Contacts
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                5
              </span>
            </Link>
            <Link
              href="/admin/requests"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Package className="h-4 w-4" />
              Requests
              <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                2
              </span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/calendar"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Calendar className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/"
            className="flex w-full items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
