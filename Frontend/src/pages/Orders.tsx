// src/pages/Orders.tsx
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchOrdersByEmail } from '@/lib/api'
import type { OrderResponse } from '@/lib/api'
import { toast } from 'sonner'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearch()
            }
          }}
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
                  {orders.length === 0 ? (
                    <p className="text-gray-500 italic">
                      No orders found for this email.
                    </p>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded p-4 shadow-sm bg-white space-y-2"
                      >
                        <p className="font-semibold">Order ID: {order.id}</p>
                        <p className="text-gray-600">
                          Date: {new Date(order.created_at).toLocaleString()}
                        </p>
                        <div className="space-y-2">
                          {order.services.map((svc, i) => (
                            <div
                              key={i}
                              className="border rounded px-3 py-2 flex justify-between items-center"
                            >
                              <div>
                                <p>{svc.service_type}</p>
                                {svc.photo_url ? (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <img
                                        src={svc.photo_url}
                                        alt="Uploaded"
                                        className="mt-1 w-24 h-16 object-cover rounded border cursor-zoom-in"
                                        loading="lazy"
                                      />
                                    </DialogTrigger>
                                    <DialogContent
                                      className="p-0 max-w-none bg-transparent border-none shadow-none"
                                      style={{ width: 'auto', height: 'auto' }}
                                    >
                                      <div className="flex justify-center items-center max-h-[90vh] overflow-auto">
                                        <img
                                          src={svc.photo_url}
                                          alt="Zoomed"
                                          className="max-h-[90vh] max-w-full object-contain"
                                        />
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                ) : (
                                  <p className="text-sm text-gray-500">
                                    Photo: N/A
                                  </p>
                                )}
                              </div>
                              <p className="font-medium">
                                ${svc.cost.toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="text-right font-semibold">
                          Total: $
                          {order.services
                            .reduce((sum, svc) => sum + svc.cost, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                    ))
                  )}
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
