import { Router } from 'express'
import db from '../db.js'

const router = Router()

router.get('/', (_req, res) => {
  const stmt = db.prepare('SELECT * FROM service_types')
  const serviceTypes = stmt.all()
  res.json(serviceTypes)
})

export default router
