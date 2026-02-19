"use client"

import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function DocumentStorage() {
  const [documents, setDocuments] = useState([])
  const [form, setForm] = useState({ name: "", type: "Lease Agreement", url: "" })

  useEffect(() => {
    const saved = Cookies.get("documents")
    if (saved) setDocuments(JSON.parse(saved))
  }, [])

  useEffect(() => {
    Cookies.set("documents", JSON.stringify(documents), { expires: 7 })
  }, [documents])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDocuments([...documents, form])
    setForm({ name: "", type: "Lease Agreement", url: "" })
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Document Storage</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Document Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option>Lease Agreement</option>
          <option>Property Contract</option>
          <option>Invoice</option>
        </select>
        <input
          type="text"
          name="url"
          placeholder="Document URL / File Link"
          value={form.url}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Add Document
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">URL</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{d.name}</td>
                <td className="px-4 py-2 border">{d.type}</td>
                <td className="px-4 py-2 border">
                  <a href={d.url} target="_blank" className="text-blue-600 hover:underline">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
