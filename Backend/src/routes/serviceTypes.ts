import { Router } from 'express'
import db from '../db.js'

const router = Router()

type ServiceWithCategoryRow = {
  service_id: number
  service_name: string
  cost: number
  service_description?: string
  category_id: number
  category_name: string
  category_description?: string
}

router.get('/', (_req, res) => {
  const raw = db
    .prepare(
      `
    SELECT 
      st.id AS service_id,
      st.name AS service_name,
      st.cost,
      st.description AS service_description,
      c.id AS category_id,
      c.name AS category_name,
      c.description AS category_description
    FROM service_types st
    LEFT JOIN categories c ON st.category_id = c.id
    ORDER BY c.name, st.name
  `
    )
    .all() as ServiceWithCategoryRow[]

  const grouped: Record<
    number,
    {
      category: { id: number; name: string; description?: string }
      services: {
        id: number
        name: string
        cost: number
        description?: string
      }[]
    }
  > = {}

  for (const row of raw) {
    if (!row.category_id) continue
    if (!grouped[row.category_id]) {
      grouped[row.category_id] = {
        category: {
          id: row.category_id,
          name: row.category_name,
          description: row.category_description,
        },
        services: [],
      }
    }

    grouped[row.category_id].services.push({
      id: row.service_id,
      name: row.service_name,
      cost: row.cost,
      description: row.service_description,
    })
  }

  res.json(Object.values(grouped))
})

export default router
