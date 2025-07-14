// src/components/CartDrawer.tsx
import { fetchServiceTypes } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function CartDrawer() {
  const { items, removeItem, submit } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [serviceMap, setServiceMap] = useState<Record<number, string>>({})

  useEffect(() => {
    fetchServiceTypes().then((services) => {
      const map: Record<number, string> = {}
      for (const svc of services) {
        map[svc.id] = `${svc.name} ($${svc.cost.toFixed(2)})`
      }
      setServiceMap(map)
    })
  }, [])

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { orderId } = await submit({ name, email, phone })
      setOrderId(orderId)
      setName('')
      setEmail('')
      setPhone('')
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {orderId ? (
          <div className="p-4 border rounded bg-green-50 text-green-800 mb-6">
            ✅ Order placed! Confirmation ID:
            <span className="ml-1 font-mono font-semibold">{orderId}</span>
          </div>
        ) : items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-2 mb-6">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-medium">
                      {serviceMap[item.serviceTypeId] || 'Unknown Service'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      Photo URL: {item.photoUrl || 'N/A'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(i)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
