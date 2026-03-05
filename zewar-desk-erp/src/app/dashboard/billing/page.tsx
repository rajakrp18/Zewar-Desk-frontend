'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  amount: number
  date: string
  status: 'Paid' | 'Pending' | 'Cancelled'
  items: number
  goldRate: number
}

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')

  // Empty invoices for new users
  const [invoices] = useState<Invoice[]>([])

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0)

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Billing & Invoices</h1>
          <p className="text-neutral-600 mt-2">Create and manage customer invoices</p>
        </div>
        <Button variant="gold" size="lg" className="md:w-auto w-full">
          📃 Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-gold-600">{formatCurrency(totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Paid Invoices</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(paidAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Pending Amount</p>
            <p className="text-3xl font-bold text-yellow-600">{formatCurrency(pendingAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Invoices</p>
            <p className="text-3xl font-bold text-neutral-900">{invoices.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Search Invoices"
            placeholder="Search by invoice number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">Status</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Paid', 'Pending', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-gold-500 text-white shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📃</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No Invoices Yet</h3>
              <p className="text-neutral-600 mb-6">Create your first invoice to get started</p>
              <Button variant="gold" size="lg">
                📃 Create First Invoice
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Invoice #</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Customer</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Items</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 text-neutral-900 font-semibold">{invoice.invoiceNumber}</td>
                      <td className="py-4 px-4 text-neutral-600">{invoice.customerName}</td>
                      <td className="py-4 px-4 text-neutral-600">{new Date(invoice.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-neutral-600">{invoice.items}</td>
                      <td className="py-4 px-4 text-neutral-900 font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="text-gold-600 hover:text-gold-700 font-medium text-sm">View</button>
                          <button className="text-neutral-600 hover:text-neutral-700 font-medium text-sm">Print</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gold Rates Section */}
      <Card>
        <CardHeader>
          <CardTitle>Current Gold Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-gold-50 to-gold-100 rounded-lg border-2 border-gold-200">
              <p className="text-sm text-neutral-600 font-medium mb-2">22K Gold</p>
              <p className="text-3xl font-bold text-gold-700">₹6,500/gm</p>
              <p className="text-xs text-neutral-600 mt-2">As of today</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-2 border-amber-200">
              <p className="text-sm text-neutral-600 font-medium mb-2">18K Gold</p>
              <p className="text-3xl font-bold text-amber-700">₹5,200/gm</p>
              <p className="text-xs text-neutral-600 mt-2">As of today</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border-2 border-slate-200">
              <p className="text-sm text-neutral-600 font-medium mb-2">Silver</p>
              <p className="text-3xl font-bold text-slate-700">₹850/gm</p>
              <p className="text-xs text-neutral-600 mt-2">As of today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
