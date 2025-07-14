// src/lib/api.ts

// --- Type Definitions (mirroring backend types) ---

export type ServiceType = {
  id: number
  name: string
  cost: number
}

export type OrderResponse = {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  services: {
    id: number
    photo_url: string
    service_type: string
    cost: number
  }[]
}

export type CustomerInput = {
  name: string
  email: string
  phone?: string
}

export type ServiceInput = {
  serviceTypeId: number
  photoUrl: string
}

export type CreateOrderRequest = {
  customer: CustomerInput
  services: ServiceInput[]
}

// --- API Helpers ---

export async function fetchServiceTypes(): Promise<ServiceType[]> {
  const res = await fetch('/api/service-types')
  if (!res.ok) throw new Error('Failed to load service types')
  return res.json()
}

export async function fetchOrdersByEmail(
  email: string
): Promise<OrderResponse[]> {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address provided')
  }

  const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`)
  if (!res.ok) throw new Error('Failed to load orders')
  return res.json()
}

export async function submitOrder(
  data: CreateOrderRequest
): Promise<{ orderId: string }> {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit order')
  return res.json()
}
