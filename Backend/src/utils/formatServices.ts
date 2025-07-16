export type RawServiceRow = {
  id: number
  photo_url: string
  service_type: string
  cost: number
  category_id: number | null
  category_name: string | null
  category_description: string | null
}

export type HydratedService = {
  id: number
  photo_url: string
  service_type: string
  cost: number
  category?: {
    id: number
    name: string
    description?: string
  }
}

export function formatServices(rows: RawServiceRow[]): HydratedService[] {
  return rows.map((svc) => ({
    id: svc.id,
    photo_url: svc.photo_url,
    service_type: svc.service_type,
    cost: svc.cost,
    category: svc.category_id
      ? {
          id: svc.category_id,
          name: svc.category_name ?? '',
          description: svc.category_description ?? undefined,
        }
      : undefined,
  }))
}
