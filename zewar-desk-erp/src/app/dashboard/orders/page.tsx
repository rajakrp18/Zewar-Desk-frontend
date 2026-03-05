'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Order {
  id: string
  orderNumber: string
  customerName: string
  amount: number
  date: string
  deliveryDate: string
  status: 'Processing' | 'Ready' | 'Delivered' | 'Cancelled'
  items: string
  notes: string
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')

  // Empty orders for new users
  const [orders] = useState<Order[]>([])

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalOrders = orders.length
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length
  const processingOrders = orders.filter(o => o.status === 'Processing').length
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0)

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    }
    return `₹${value.toLocaleString()}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-700'
      case 'Ready':
        return 'bg-purple-100 text-purple-700'
      case 'Delivered':
        return 'bg-green-100 text-green-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getDaysRemaining = (deliveryDate: string) => {
    const delivery = new Date(deliveryDate)
    const today = new Date()
    const diff = delivery.getTime() - today.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Orders</h1>
          <p className="text-neutral-600 mt-2">Track and manage customer orders</p>
        </div>
        <Button variant="gold" size="lg" className="md:w-auto w-full">
          📦 Create Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Total Orders</p>
            <p className="text-3xl font-bold text-neutral-900">{totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Processing</p>
            <p className="text-3xl font-bold text-blue-600">{processingOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Delivered</p>
            <p className="text-3xl font-bold text-green-600">{deliveredOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-neutral-600 font-medium mb-2">Order Value</p>
            <p className="text-3xl font-bold text-gold-600">{formatCurrency(totalRevenue)}</p>
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
            label="Search Orders"
            placeholder="Search by order number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-700">Status</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'Processing', 'Ready', 'Delivered', 'Cancelled'].map((status) => (
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

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order List ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">No Orders Yet</h3>
              <p className="text-neutral-600 mb-6">Create your first order to start tracking</p>
              <Button variant="gold" size="lg">
                📦 Create First Order
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-neutral-200">
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Order #</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Customer</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Items</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Order Date</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Delivery</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const daysLeft = getDaysRemaining(order.deliveryDate)
                    return (
                      <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-4 text-neutral-900 font-semibold">{order.orderNumber}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="text-neutral-900 font-medium">{order.customerName}</p>
                            <p className="text-neutral-600 text-xs">{order.notes}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-neutral-600 text-sm">{order.items}</td>
                        <td className="py-4 px-4 text-neutral-600">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="text-neutral-900 font-medium">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                            <p className={`text-xs font-medium ${daysLeft <= 0 ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-green-600'}`}>
                              {daysLeft <= 0 ? 'Due today' : `${daysLeft} days left`}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-neutral-900 font-semibold">{formatCurrency(order.amount)}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="text-gold-600 hover:text-gold-700 font-medium text-sm">Track</button>
                            <button className="text-neutral-600 hover:text-neutral-700 font-medium text-sm">Edit</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
