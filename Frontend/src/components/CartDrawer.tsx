// src/components/CartDrawer.tsx
import { useCart } from '@/context/CartContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CartDrawer() {
  const { items, removeItem, submit } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

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
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2 mb-6">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-medium">{item.photoUrl}</p>
                  <p className="text-sm text-gray-500">
                    Service ID: {item.serviceTypeId}
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
        )}

        {items.length > 0 && (
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
            {orderId && (
              <p className="text-sm text-green-600">
                Order placed! Confirmation ID:{' '}
                <span className="font-mono">{orderId}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
