export type Customer = {
  id: number
  name: string
  email: string
  phone?: string
}

export type Order = {
  id: string // UUID
  customer_id: number
  created_at: string
}

export type ServiceType = {
  id: number
  name: string
  cost: number
  description?: string
  category_id?: number
}

export type Category = {
  id: number
  name: string
  description?: string
}

export type GroupedServiceTypes = {
  category: Category
  services: ServiceType[]
}

export type Service = {
  id: number
  order_id: string
  service_type_id: number
  photo_url: string
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

export type OrderRow = {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
}

export type ServiceRow = {
  id: number
  photo_url: string
  service_type: string
  cost: number
}
