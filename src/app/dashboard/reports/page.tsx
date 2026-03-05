'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const reports = [
    {
      id: 1,
      name: 'Sales Report',
      icon: '📊',
      description: 'Track all sales transactions and revenue trends',
      metrics: 'Total Sales, Revenue, Growth %',
    },
    {
      id: 2,
      name: 'Inventory Report',
      icon: '📦',
      description: 'Monitor inventory levels and stock valuation',
      metrics: 'Stock Value, Items Count, Low Stock',
    },
    {
      id: 3,
      name: 'Customer Report',
      icon: '👥',
      description: 'Analyze customer behavior and purchase patterns',
      metrics: 'Total Customers, Repeat Rate, Avg Purchase',
    },
    {
      id: 4,
      name: 'Gold Rate Report',
      icon: '💰',
      description: 'Track gold and precious metal price trends',
      metrics: 'Daily Rates, Charts, Historical Data',
    },
    {
      id: 5,
      name: 'Performance Report',
      icon: '📈',
      description: 'Business performance metrics and KPIs',
      metrics: 'Revenue, Profit, Growth, Trends',
    },
    {
      id: 6,
      name: 'Tax Report',
      icon: '🧾',
      description: 'Tax and compliance related reports',
      metrics: 'GST, Tax Amount, Compliance Status',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900">Reports & Analytics</h1>
          <p className="text-neutral-600 mt-2">Generate detailed reports for your business insights</p>
        </div>
        <Button variant="gold" size="lg" className="md:w-auto w-full">
          📥 Export Report
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Apply Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-xl hover:border-gold-300 transition-all cursor-pointer group">
            <CardContent className="pt-6">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{report.icon}</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{report.name}</h3>
              <p className="text-sm text-neutral-600 mb-4">{report.description}</p>
              
              <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-600 font-medium">Metrics Included:</p>
                <p className="text-sm text-neutral-700 font-semibold">{report.metrics}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Preview
                </Button>
                <Button variant="gold" size="sm" className="flex-1">
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No Reports Generated Yet</h3>
            <p className="text-neutral-600">Choose a report type above to generate your first report</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
