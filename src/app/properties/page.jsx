"use client"

import React, { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import Cookies from "js-cookie"

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [search, setSearch] = useState("")
  const [properties, setProperties] = useState([])

  const [form, setForm] = useState({
    address: "",
    woz: "",
    energy: "A",
    units: 1,
  })

  useEffect(() => {
    const saved = Cookies.get("properties")
    if (saved) setProperties(JSON.parse(saved))
  }, [])

  useEffect(() => {
    Cookies.set("properties", JSON.stringify(properties), { expires: 7 })
  }, [properties])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const openModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index)
      setForm(properties[index])
    } else {
      setEditingIndex(null)
      setForm({ address: "", woz: "", energy: "A", units: 1 })
    }
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingIndex !== null) {
      const newProperties = [...properties]
      newProperties[editingIndex] = form
      setProperties(newProperties)
    } else {
      setProperties([...properties, form])
    }
    setModalOpen(false)
  }

  const filtered = properties.filter((p) =>
    p.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all your properties and units
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md border border-orange-400 transition text-sm md:text-base"
        >
          <Plus size={18} />
          Add Property
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="w-full min-w-[600px] md:min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr className="text-[14px]">
              <th className="text-left px-4 py-3 text-black uppercase tracking-wider">
                Address
              </th>
              <th className="text-left px-4 py-3 text-black uppercase tracking-wider">
                WOZ Value (€)
              </th>
              <th className="text-left px-4 py-3 text-black uppercase tracking-wider">
                Energy Label
              </th>
              <th className="text-left px-4 py-3 text-black uppercase tracking-wider">
                Units
              </th>
              <th className="text-left px-4 py-3 text-black uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{p.address}</td>
                <td className="px-4 py-3">{p.woz}</td>
                <td className="px-4 py-3">{p.energy}</td>
                <td className="px-4 py-3">{p.units}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openModal(index)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition text-sm md:text-base"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400 text-sm md:text-base">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Property" : "Add New Property"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Property address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WOZ Value (€)
                  </label>
                  <input
                    type="number"
                    name="woz"
                    placeholder="€"
                    value={form.woz}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Energy Label
                  </label>
                  <input
                    type="text"
                    name="energy"
                    placeholder="A"
                    value={form.energy}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    name="units"
                    placeholder="1"
                    value={form.units}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                    required
                    min={1}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
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
                  {editingIndex !== null ? "Update Property" : "Create Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
