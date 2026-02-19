"use client"

import "./globals.css"
import { Sidebar } from "./components/Sidebar"
import Navbar from "./components/Navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          {/* Sidebar for md+ screens */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar for mobile / sm screens */}
            <div className="md:hidden">
              <Navbar />
            </div>

            {/* Page content */}
            <main className="flex-1 p-4 md:p-8 transition-all duration-300  w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
