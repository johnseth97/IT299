// src/pages/Orders.tsx
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchOrdersSmart } from '@/lib/api'
import type { OrderResponse } from '@/lib/api'
import { toast } from 'sonner'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { useSearchParams } from 'react-router-dom'

function groupServicesByCategory(services: OrderResponse['services']) {
  return services.reduce<Record<string, typeof services>>((acc, svc) => {
    const cat = svc.category?.name || 'Uncategorized'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(svc)
    return acc
  }, {})
}

export default function Orders() {
  const [input, setInput] = useState('')
  const [orders, setOrders] = useState<OrderResponse[]>([])
  const [searchParams] = useSearchParams()

  const handleSearch = async () => {
    try {
      const result = await fetchOrdersSmart(input)
      const normalized = Array.isArray(result) ? result : [result]
      setOrders(normalized)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch orders'
      toast.error(message)
      setOrders([])
    }
  }

  useEffect(() => {
    const preset = searchParams.get('order')
    if (preset) {
      setInput(preset)
      fetchOrdersSmart(preset)
        .then((result) => {
          const normalized = Array.isArray(result) ? result : [result]
          setOrders(normalized)
        })
        .catch((err) => {
          toast.error(
            err instanceof Error ? err.message : 'Failed to fetch orders'
          )
        })
    }
  }, [searchParams])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          inputMode="email"
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="email"
          placeholder="Enter your email or order ID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          const groupedServices = groupServicesByCategory(order.services)

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
                <p className="text-gray-700">
                  Customer: {order.name || order.email}
                </p>

                <div className="space-y-4 pt-2">
                  {Object.entries(groupedServices).map(
                    ([category, services]) => (
                      <div key={category}>
                        <h3 className="text-md font-semibold border-b pb-1 mb-2">
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {services.map((svc, i) => (
                            <div
                              key={i}
                              className="border rounded px-3 py-2 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-semibold">
                                  {svc.service_type}
                                </p>
                                {svc.description && (
                                  <p className="text-sm text-gray-500">
                                    {svc.description}
                                  </p>
                                )}
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
                                      style={{
                                        width: 'auto',
                                        height: 'auto',
                                      }}
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
                      </div>
                    )
                  )}
                </div>

                <div className="text-right font-bold pt-4 border-t">
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
