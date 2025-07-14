// src/pages/Services.tsx
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchServiceTypes } from '@/lib/api'
import type { ServiceType } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'
import clsx from 'clsx'

export default function Services() {
  const [services, setServices] = useState<ServiceType[]>([])
  const { addItem, removeLastInstance } = useCart()
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [recentlyAdded, setRecentlyAdded] = useState<Record<number, boolean>>(
    {}
  )

  useEffect(() => {
    fetchServiceTypes().then(setServices)
  }, [])

  const handleQuantityChange = (id: number, value: string) => {
    const qty = Math.max(1, parseInt(value) || 1)
    setQuantities((prev) => ({ ...prev, [id]: qty }))
  }

  const handleAddToCart = (svc: ServiceType) => {
    const qty = quantities[svc.id] || 1

    // Add items to cart
    for (let i = 0; i < qty; i++) {
      addItem({ serviceTypeId: svc.id, photoUrl: '' })
    }

    // Trigger green flash + text
    setRecentlyAdded((prev) => ({ ...prev, [svc.id]: true }))
    setTimeout(() => {
      setRecentlyAdded((prev) => ({ ...prev, [svc.id]: false }))
    }, 3000)

    // Create toast with undo
    const toastId = `${svc.id}-${Date.now()}`
    toast(`🎉 ${qty} × ${svc.name} added to cart`, {
      id: toastId,
      duration: Infinity,
      action: {
        label: 'Undo',
        onClick: () => {
          for (let i = 0; i < qty; i++) {
            removeLastInstance({ serviceTypeId: svc.id, photoUrl: '' })
          }
          toast.dismiss(toastId)
          toast.error(`❌ Removed ${qty} × ${svc.name} from cart`)
        },
      },
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((svc) => (
        <Card key={svc.id}>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{svc.name}</h2>
            <p className="text-gray-600">${svc.cost.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                value={quantities[svc.id] || 1}
                onChange={(e) => handleQuantityChange(svc.id, e.target.value)}
                className="w-16"
              />
              <Button
                onClick={() => handleAddToCart(svc)}
                disabled={recentlyAdded[svc.id]}
                className={clsx(
                  'transition-colors duration-700 ease-in-out',
                  'hover:bg-blue-100',
                  recentlyAdded[svc.id]
                    ? 'bg-green-500 text-white hover:bg-green-500'
                    : ''
                )}
              >
                {recentlyAdded[svc.id] ? '✅ Added to Cart!' : 'Add to Cart'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
