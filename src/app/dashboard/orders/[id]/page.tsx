// EXACT PATH: src/app/dashboard/orders/[id]/page.tsx
// PURPOSE: View and edit order details page

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useOrders } from '@/hooks/useOrders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'

interface ViewOrderPageProps {
  params: {
    id: string
  }
}

export default function ViewOrderPage({ params }: ViewOrderPageProps) {
  const router = useRouter()
  const { getOrder, updateOrder, deleteOrder } = useOrders()
  
  const order = getOrder(params.id)
  
  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState(order?.status || 'confirmed')
  const [notes, setNotes] = useState(order?.notes || '')
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    if (order) {
      setStatus(order.status)
      setNotes(order.notes || '')
    }
  }, [order])
  
  if (!order) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The order you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => router.push('/dashboard/orders')}>
            Back to Orders
          </Button>
        </Card>
      </div>
    )
  }
  
  const isOverdue = () => {
    const today = new Date()
    return (
      order.status !== 'delivered' && 
      order.status !== 'cancelled' &&
      new Date(order.deliveryDate) < today
    )
  }
  
  const pendingBalance = order.totalAmount - order.advancePayment
  
  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      updateOrder(params.id, {
        status: status as any,
        notes: notes.trim() || undefined,
      })
      
      alert('✅ Order updated successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating order:', error)
      alert('❌ Failed to update order. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete order ${order.orderNumber}? This action cannot be undone.`)) {
      return
    }
    
    try {
      deleteOrder(params.id)
      alert('✅ Order deleted successfully!')
      router.push('/dashboard/orders')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('❌ Failed to delete order. Please try again.')
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              {order.orderNumber}
            </h1>
            <OrderStatusBadge status={order.status as any} />
            {isOverdue() && (
              <Badge variant="danger">OVERDUE</Badge>
            )}
          </div>
          <p className="text-neutral-600">
            Created on {formatDate(order.createdAt)}
          </p>
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </Button>
              <Button
                variant="ghost"
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50"
              >
                🗑️ Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : '💾 Save'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsEditing(false)
                  setStatus(order.status)
                  setNotes(order.notes || '')
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Order Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Order Date</p>
          <p className="font-semibold text-neutral-900">
            {formatDate(order.date)}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Delivery Date</p>
          <p className={`font-semibold ${isOverdue() ? 'text-red-600' : 'text-neutral-900'}`}>
            {formatDate(order.deliveryDate)}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Last Updated</p>
          <p className="font-semibold text-neutral-900">
            {formatDate(order.updatedAt)}
          </p>
        </Card>
      </div>
      
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm text-neutral-600">Customer Name:</p>
            <p className="font-semibold text-neutral-900">{order.customerName}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-neutral-600">Customer ID:</p>
            <p className="font-mono text-sm text-neutral-900">{order.customerId}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">Item Description:</p>
            <p className="text-neutral-900 whitespace-pre-wrap">{order.itemDescription}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-neutral-600 mb-2">Total Amount:</p>
              <p className="text-2xl font-bold text-neutral-900">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-600 mb-2">Advance Payment:</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(order.advancePayment)}
              </p>
            </div>
          </div>
          
          {pendingBalance > 0 && (
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-700 mb-1">Pending Balance:</p>
              <p className="text-2xl font-bold text-orange-700">
                {formatCurrency(pendingBalance)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Status & Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Status & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Order Status
            </label>
            {isEditing ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <OrderStatusBadge status={order.status as any} />
            )}
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Notes
            </label>
            {isEditing ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Add any notes about this order..."
              />
            ) : (
              <p className="text-neutral-700 whitespace-pre-wrap">
                {order.notes || 'No notes added'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-neutral-600">Order ID</p>
              <p className="font-mono text-neutral-900 mt-1">{order.id}</p>
            </div>
            <div>
              <p className="text-neutral-600">Created At</p>
              <p className="text-neutral-900 mt-1">{formatDateTime(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-neutral-600">Last Updated</p>
              <p className="text-neutral-900 mt-1">{formatDateTime(order.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/orders')}
        >
          ← Back to Orders
        </Button>
      </div>
    </div>
  )
}
