// src/pages/Services.tsx
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchServiceTypes } from '@/lib/api'
import type { ServiceType } from '@/lib/api'
import { useCart } from '@/context/CartContext'

export default function Services() {
  const [services, setServices] = useState<ServiceType[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    fetchServiceTypes().then(setServices)
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((svc) => (
        <Card key={svc.id}>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-semibold">{svc.name}</h2>
            <p className="text-gray-600">${svc.cost.toFixed(2)}</p>
            <Button
              onClick={
                () => addItem({ serviceTypeId: svc.id, photoUrl: '' }) // Placeholder photo URL
              }
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
