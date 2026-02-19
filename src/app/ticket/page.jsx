"use client"

import React, { useState, useEffect } from "react"
import { Plus, Circle, CheckCircle, Loader, XCircle, MoreVertical } from "lucide-react"
import Cookies from "js-cookie"

export default function TicketPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Open",
  })
  const [menuOpenIndex, setMenuOpenIndex] = useState(null)

  // Load tickets from cookies
  useEffect(() => {
    const saved = Cookies.get("tickets")
    if (saved) setTickets(JSON.parse(saved))
  }, [])

  // Save tickets to cookies
  useEffect(() => {
    Cookies.set("tickets", JSON.stringify(tickets), { expires: 7 })
  }, [tickets])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTickets([...tickets, form])
    setForm({ title: "", description: "", status: "Open" })
    setModalOpen(false)
  }

  const statusColumns = ["Open", "In Progress", "Resolved", "Closed"]
  const ticketsByStatus = statusColumns.map((status) =>
    tickets.filter((t) => t.status === status)
  )

  const moveTicket = (index, newStatus) => {
    const updated = [...tickets]
    updated[index].status = newStatus
    setTickets(updated)
    setMenuOpenIndex(null)
  }

  // Status Icons & colors
  const statusIcon = (status) => {
    switch (status) {
      case "Open":
        return <Circle className="text-blue-500" size={16} />
      case "In Progress":
        return <Loader className="text-yellow-500 animate-spin" size={16} />
      case "Resolved":
        return <CheckCircle className="text-green-500" size={16} />
      case "Closed":
        return <XCircle className="text-red-500" size={16} />
      default:
        return null
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track maintenance requests and ticket status
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md border border-orange-400 transition"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      {/* Tickets Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statusColumns.map((status, colIndex) => (
          <div
            key={status}
            className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 min-h-[200px]"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-gray-700">{status}</h2>
              <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                {ticketsByStatus[colIndex].length}
              </span>
            </div>

            {ticketsByStatus[colIndex].length === 0 && (
              <p className="text-gray-400 text-sm">No tickets</p>
            )}

            <ul className="space-y-2">
              {ticketsByStatus[colIndex].map((ticket, index) => {
                const ticketIndex = tickets.findIndex((t) => t === ticket)

                return (
                  <li
                    key={index}
                    className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex justify-between items-start relative"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">{statusIcon(ticket.status)}</div>

                      <div>
                        <p className="font-medium text-gray-800">{ticket.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                      </div>
                    </div>

                    {/* 3-dot menu */}
                    <div className="relative">
                      <MoreVertical
                        size={18}
                        className="cursor-pointer text-gray-400"
                        onClick={() =>
                          setMenuOpenIndex(menuOpenIndex === ticketIndex ? null : ticketIndex)
                        }
                      />
                      {menuOpenIndex === ticketIndex && (
                        <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-md w-40 z-10">
                          {statusColumns.map((s) => {
                            if (s === ticket.status) return null
                            return (
                              <button
                                key={s}
                                onClick={() => moveTicket(ticketIndex, s)}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                              >
                                Move to {s}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Create New Ticket</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Ticket title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Ticket description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 shadow-md border border-orange-400 transition"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
