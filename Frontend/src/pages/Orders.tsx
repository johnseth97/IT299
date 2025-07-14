// src/pages/Orders.tsx
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchOrdersByEmail } from '@/lib/api'
import type { OrderResponse } from '@/lib/api'
import { toast } from 'sonner'

export default function Orders() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<OrderResponse[]>([])

  const handleSearch = async () => {
    try {
      const result = await fetchOrdersByEmail(email)
      setOrders(result)
    } catch (err: any) {
      toast.error(err?.message || 'Failed to fetch orders')
      setOrders([])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSearch}>Search Orders</Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const orderTotal = order.services.reduce(
            (sum, svc) => sum + svc.cost,
            0
          )

          return (
            <Card key={order.id}>
              <CardContent className="space-y-2 p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Order ID: {order.id}
                  </h2>
                  <span className="text-sm text-gray-600">
                    {new Date(order.created_at + 'Z').toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">Customer: {order.name}</p>
                <div className="space-y-2">
                  {order.services.map((svc, i) => (
                    <div
                      key={i}
                      className="p-2 border rounded bg-gray-50 flex justify-between"
                    >
                      <div>
                        <p className="font-medium">{svc.service_type}</p>
                        <p className="text-xs text-gray-500">
                          Photo: {svc.photo_url || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right text-sm font-semibold text-gray-700">
                        ${svc.cost.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right font-bold pt-2 border-t">
                  Total: ${orderTotal.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
