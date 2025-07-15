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
    description?: string
    category?: {
      id: number
      name: string
      description?: string
    }
  }[]
}

// When the return type could be either a single order or multiple
export type OrderResult = OrderResponse | OrderResponse[]

// You can also be explicit for specific hooks or API handlers
export type OrderListResponse = OrderResponse[]
export type SingleOrderResponse = OrderResponse
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

// api.ts (or wherever your API calls live)
const API_BASE =
  typeof window !== 'undefined' && window.__CONFIG__?.VITE_API_URL
    ? window.__CONFIG__.VITE_API_URL
    : 'http://localhost:8080'

console.log('API_BASE:', API_BASE)

console.log('API_BASE:', API_BASE)

export async function fetchServiceTypes(): Promise<GroupedServiceTypes[]> {
  const res = await fetch(`${API_BASE}/api/service-types`)
  if (!res.ok) throw new Error('Failed to fetch service types')
  return res.json()
}

export async function fetchOrdersByEmail(
  email: string
): Promise<OrderResponse[]> {
  const res = await fetch(
    `${API_BASE}/api/orders/email/${encodeURIComponent(email)}`
  )
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to fetch orders')
  }
  return await res.json()
}

export async function fetchOrderById(orderId: string): Promise<OrderResponse> {
  const res = await fetch(
    `${API_BASE}/api/orders/${encodeURIComponent(orderId)}`
  )
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to fetch order')
  }
  return res.json()
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function fetchOrdersSmart(input: string): Promise<OrderResult> {
  if (emailRegex.test(input)) {
    return await fetchOrdersByEmail(input)
  } else if (/^[a-zA-Z0-9-]+$/.test(input)) {
    return await fetchOrderById(input)
  } else {
    throw new Error('Invalid input format')
  }
}

export async function submitOrder(
  data: CreateOrderRequest
): Promise<{ orderId: string }> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit order')
  return res.json()
}
