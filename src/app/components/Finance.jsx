"use client"

import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function FinancialManagement() {
  const [payments, setPayments] = useState([])
  const [form, setForm] = useState({ tenant: "", amount: "", status: "Paid" })

  useEffect(() => {
    const saved = Cookies.get("payments")
    if (saved) setPayments(JSON.parse(saved))
  }, [])

  useEffect(() => {
    Cookies.set("payments", JSON.stringify(payments), { expires: 7 })
  }, [payments])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPayments([...payments, form])
    setForm({ tenant: "", amount: "", status: "Paid" })
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Financial Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          name="tenant"
          placeholder="Tenant Name"
          value={form.tenant}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount €"
          value={form.amount}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Add Payment
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">Tenant</th>
              <th className="px-4 py-2 border">Amount (€)</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{p.tenant}</td>
                <td className="px-4 py-2 border">{p.amount}</td>
                <td className="px-4 py-2 border">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
