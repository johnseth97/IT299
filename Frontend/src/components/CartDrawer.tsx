// src/components/CartDrawer.tsx
import { fetchServiceTypes } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, removeItem, submit } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [serviceMap, setServiceMap] = useState<Record<number, string>>({})

  useEffect(() => {
    fetchServiceTypes().then((groups) => {
      const map: Record<number, string> = {}
      for (const group of groups) {
        for (const svc of group.services) {
          map[svc.id] = `${svc.name} ($${svc.cost.toFixed(2)})`
        }
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
    <div className="flex flex-col h-full justify-between px-6 py-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {orderId ? (
          <div className="p-4 border rounded bg-green-50 text-green-800 mb-6">
            ✅ Order placed! Confirmation ID:
            <Link
              to={`/orders?order=${orderId}`}
              className="ml-1 font-mono font-semibold underline hover:text-green-600"
            >
              {orderId}
            </Link>
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
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt="Uploaded"
                        className="mt-1 w-24 h-16 object-cover rounded border"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">Photo: N/A</p>
                    )}
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

            <form
              className="space-y-2"
              autoComplete="on"
              onSubmit={(e) => {
                e.preventDefault()
                handleCheckout()
              }}
            >
              <Input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
