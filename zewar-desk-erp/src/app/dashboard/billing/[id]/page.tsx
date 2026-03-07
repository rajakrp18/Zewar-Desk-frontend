// EXACT PATH: src/app/dashboard/billing/[id]/page.tsx
// PURPOSE: View bill details page

'use client'

import { useRouter } from 'next/navigation'
import { useBilling } from '@/hooks/useBilling'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate, formatDateTime } from '@/lib/utils'

interface ViewBillPageProps {
  params: {
    id: string
  }
}

export default function ViewBillPage({ params }: ViewBillPageProps) {
  const router = useRouter()
  const { getBill, deleteBill } = useBilling()
  
  const bill = getBill(params.id)
  
  if (!bill) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Bill Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The bill you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => router.push('/dashboard/billing')}>
            Back to Billing
          </Button>
        </Card>
      </div>
    )
  }
  
  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }
  
  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete bill ${bill.billNumber}? This action cannot be undone.`)) {
      return
    }
    
    try {
      deleteBill(params.id)
      alert('✅ Bill deleted successfully!')
      router.push('/dashboard/billing')
    } catch (error) {
      console.error('Error deleting bill:', error)
      alert('❌ Failed to delete bill. Please try again.')
    }
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              {bill.billNumber}
            </h1>
            <Badge variant={getStatusVariant(bill.status)} className="capitalize">
              {bill.status}
            </Badge>
          </div>
          <p className="text-neutral-600">
            Created on {formatDate(bill.createdAt)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50"
          >
            🗑️ Delete
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
          >
            🖨️ Print
          </Button>
        </div>
      </div>
      
      {/* Bill Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Bill Date</p>
          <p className="font-semibold text-neutral-900">
            {formatDate(bill.date)}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Payment Method</p>
          <p className="font-semibold text-neutral-900 capitalize">
            {bill.paymentMethod || 'Not specified'}
          </p>
        </Card>
        
        <Card className="p-4">
          <p className="text-sm text-neutral-600 mb-1">Last Updated</p>
          <p className="font-semibold text-neutral-900">
            {formatDate(bill.updatedAt)}
          </p>
        </Card>
      </div>
      
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-neutral-600">Customer Name:</p>
              <p className="font-semibold text-neutral-900">{bill.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Customer ID:</p>
              <p className="font-mono text-sm text-neutral-900">{bill.customerId}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b-2 border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900">Item</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-900">Unit Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-neutral-900">Quantity</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-900">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {bill.items.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-neutral-900">{item.itemName}</td>
                    <td className="px-4 py-3 text-right text-neutral-900">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-4 py-3 text-center text-neutral-900">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-neutral-900">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Bill Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-neutral-600">Subtotal:</span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(bill.subtotal)}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-neutral-600">GST (3.6%):</span>
              <span className="font-semibold text-neutral-900">
                {formatCurrency(bill.tax)}
              </span>
            </div>
            
            {bill.discount > 0 && (
              <div className="flex items-center justify-between py-2">
                <span className="text-neutral-600">Discount:</span>
                <span className="font-semibold text-green-600">
                  -{formatCurrency(bill.discount)}
                </span>
              </div>
            )}
            
            <div className="border-t-2 border-neutral-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-900">Total Amount:</span>
                <span className="text-2xl font-bold text-neutral-900">
                  {formatCurrency(bill.total)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Notes */}
      {bill.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-700 whitespace-pre-wrap">{bill.notes}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-neutral-600">Bill ID</p>
              <p className="font-mono text-neutral-900 mt-1">{bill.id}</p>
            </div>
            <div>
              <p className="text-neutral-600">Created At</p>
              <p className="text-neutral-900 mt-1">{formatDateTime(bill.createdAt)}</p>
            </div>
            <div>
              <p className="text-neutral-600">Last Updated</p>
              <p className="text-neutral-900 mt-1">{formatDateTime(bill.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard/billing')}
        >
          ← Back to Billing
        </Button>
      </div>
    </div>
  )
}
