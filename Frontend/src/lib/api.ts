// src/lib/api.ts

// --- Type Definitions (mirroring backend types) ---

export type ServiceType = {
  id: number
  name: string
  cost: number
}

export type GroupedServiceTypes = {
  category: {
    id: number
    name: string
    description?: string
  }
  services: {
    id: number
    name: string
    cost: number
    description?: string
  }[]
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

export async function fetchServiceTypes(): Promise<GroupedServiceTypes[]> {
  const res = await fetch('/api/service-types')
  if (!res.ok) throw new Error('Failed to fetch service types')
  return res.json()
}

export async function fetchOrdersByEmail(
  email: string
): Promise<OrderResponse[]> {
  const res = await fetch(`/api/orders/email/${encodeURIComponent(email)}`)
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to fetch orders')
  }
  return await res.json()
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
