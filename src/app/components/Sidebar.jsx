"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {  Home, Building2, Wrench, User, DollarSign, FileText, Menu, X } from "lucide-react" // <-- added User icon



const navItems = [
  { title: "Dashboard", href: "/", icon: Home },                  // Home icon
  { title: "Properties", href: "/properties", icon: Building2 }, // Building icon
  { title: "Tickets", href: "/ticket", icon: Wrench },           // Wrench icon
  { title: "Tenant", href: "/tenant", icon: User },              // User icon
  { title: "Financial Management", href: "/finance", icon: DollarSign }, // Dollar icon
  { title: "Document Storage", href: "/documents", icon: FileText },     // File icon
]


export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between border-b bg-white px-4 py-3">
        <div className="font-semibold text-[#003E8A]">PMS Amsterdam</div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-screen w-64 bg-white border-r
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="text-lg font-semibold text-[#003E8A]">PMS Amsterdam</div>
          {/* Close button mobile only */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col overflow-y-auto px-4 py-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                    transition-colors cursor-pointer
                    ${active ? "bg-blue-100 text-[#003E8A]" : "text-gray-600 hover:bg-gray-100"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  <span className="truncate">{item.title}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer / Optional */}
        <div className="p-4 border-t text-sm text-gray-500 hidden md:block">
          © {new Date().getFullYear()} PMS Amsterdam
        </div>
      </aside>
    </>
  )
}
