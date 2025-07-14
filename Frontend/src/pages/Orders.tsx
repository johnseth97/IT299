// src/pages/Orders.tsx
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fetchOrdersByEmail } from '@/lib/api'
import type { OrderResponse } from '@/lib/api'

export default function Orders() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<OrderResponse[]>([])

  const handleSearch = async () => {
    const result = await fetchOrdersByEmail(email)
    setOrders(result)
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
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4 shadow-sm bg-white">
            <p className="font-semibold">Order ID: {order.id}</p>
            <p>Date: {order.created_at}</p>
            <p>Email: {order.email}</p>
            <p className="text-sm text-gray-500">
              {order.services.length} services
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
