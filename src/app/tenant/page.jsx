"use client"

import React, { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import Cookies from "js-cookie"

export default function TenantsPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [search, setSearch] = useState("")
  const [tenants, setTenants] = useState([])

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    unit: 1,
    status: "Active",
  })

  // Load tenants from cookies
  useEffect(() => {
    const saved = Cookies.get("tenants")
    if (saved) setTenants(JSON.parse(saved))
  }, [])

  // Save tenants to cookies
  useEffect(() => {
    Cookies.set("tenants", JSON.stringify(tenants), { expires: 7 })
  }, [tenants])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const openModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index)
      setForm(tenants[index])
    } else {
      setEditingIndex(null)
      setForm({ name: "", email: "", phone: "", unit: 1, status: "Active" })
    }
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingIndex !== null) {
      const updated = [...tenants]
      updated[editingIndex] = form
      setTenants(updated)
    } else {
      setTenants([...tenants, form])
    }
    setModalOpen(false)
  }

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tenants</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all tenants and their unit assignments
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow-md border border-orange-400 transition"
        >
          <Plus size={18} /> Add Tenant
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-4 py-2 w-full max-w-sm"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left text-[14px] px-4 py-2">Name</th>
              <th className="text-left text-[14px]  px-4 py-2">Email</th>
              <th className="text-left text-[14px] px-4 py-2">Phone</th>
              <th className="text-left text-[14px] px-4 py-2">Unit</th>
              <th className="text-left text-[14px] px-4 py-2">Status</th>
              <th className="text-left text-[14px] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-2">{t.name}</td>
                <td className="px-4 py-2">{t.email}</td>
                <td className="px-4 py-2">{t.phone}</td>
                <td className="px-4 py-2">{t.unit}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">
                  No tenants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Tenant" : "Add New Tenant"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Tenant Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Tenant Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Tenant Phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="number"
                  name="unit"
                  placeholder="1"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                  min={1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-md border hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  {editingIndex !== null ? "Update Tenant" : "Add Tenant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
