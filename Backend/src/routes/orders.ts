import { Router, Request, Response } from 'express'
import db from '../db.js'
import { randomUUID } from 'crypto'
import { CustomerInput, ServiceInput, OrderRow } from '../types/dbTypes'
import { formatServices, RawServiceRow } from '../utils/formatServices.js'

const router = Router()

router.post('/', (req: Request, res: Response) => {
  console.log('POST /api/orders hit!')
  console.log(JSON.stringify(req.body, null, 2))

  const {
    customer,
    services,
  }: { customer: CustomerInput; services: ServiceInput[] } = req.body

  if (
    !customer ||
    !Array.isArray(services) ||
    services.length === 0 ||
    typeof customer.name !== 'string' ||
    typeof customer.email !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid customer or services' })
  }

  const orderId = randomUUID()

  const insertCustomer = db.prepare(`
    INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)
  `)
  const customerResult = insertCustomer.run(
    customer.name,
    customer.email,
    customer.phone ?? null
  )

  const insertOrder = db.prepare(`
    INSERT INTO orders (id, customer_id) VALUES (?, ?)
  `)
  insertOrder.run(orderId, customerResult.lastInsertRowid as number)

  const insertService = db.prepare(`
    INSERT INTO services (order_id, service_type_id, photo_url)
    VALUES (?, ?, ?)
  `)

  const insertMany = db.transaction((svcList: ServiceInput[]) => {
    for (const svc of svcList) {
      insertService.run(orderId, svc.serviceTypeId, svc.photoUrl)
    }
  })

  insertMany(services)

  res.status(201).json({ orderId })
})

router.get('/:id', (req: Request, res: Response) => {
  const orderId = req.params.id

  const order = db
    .prepare(
      `
      SELECT o.id, o.created_at, c.name, c.email, c.phone
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = ?
    `
    )
    .get(orderId) as OrderRow | undefined

  if (!order) return res.status(404).json({ error: 'Order not found' })

  const rawServices = db
    .prepare(
      `
      SELECT 
        s.id,
        s.photo_url,
        st.name AS service_type,
        st.cost,
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
      FROM services s
      JOIN service_types st ON s.service_type_id = st.id
      LEFT JOIN categories c ON st.category_id = c.id
      WHERE s.order_id = ?
    `
    )
    .all(orderId) as RawServiceRow[]

  const services = formatServices(rawServices)
  res.json({ ...order, services })
})

router.get('/email/:email', (req: Request, res: Response) => {
  const email = req.params.email

  const orders = db
    .prepare(
      `
      SELECT o.id, o.created_at, c.name, c.email, c.phone
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.email = ?
      ORDER BY o.created_at DESC
    `
    )
    .all(email) as OrderRow[]

  if (orders.length === 0) {
    return res.status(404).json({ error: 'No orders found for this email.' })
  }

  const getServices = db.prepare(`
    SELECT 
      s.id,
      s.photo_url,
      st.name AS service_type,
      st.cost,
      c.id AS category_id,
      c.name AS category_name,
      c.description AS category_description
    FROM services s
    JOIN service_types st ON s.service_type_id = st.id
    LEFT JOIN categories c ON st.category_id = c.id
    WHERE s.order_id = ?
  `)

  const result = orders.map((order) => {
    const rawServices = getServices.all(order.id) as RawServiceRow[]
    const services = formatServices(rawServices)
    return { ...order, services }
  })

  res.json(result)
})

export default router
