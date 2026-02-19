"use client"

import React, { useState } from "react"
import {  Home, Building2, Wrench, User, DollarSign, FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"




const navItems = [
  { title: "Dashboard", href: "/", icon: Home },                  // Home icon
  { title: "Properties", href: "/properties", icon: Building2 }, // Building icon
  { title: "Tickets", href: "/ticket", icon: Wrench },           // Wrench icon
  { title: "Tenant", href: "/tenant", icon: User },              // User icon
  { title: "Financial Management", href: "/finance", icon: DollarSign }, // Dollar icon
  { title: "Document Storage", href: "/documents", icon: FileText },     // File icon
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 font-bold text-[#003E8A] text-lg">
            PMS Amsterdam
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-blue-100 text-[#003E8A]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    {item.title}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? "bg-blue-100 text-[#003E8A]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} />
                  {item.title}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
