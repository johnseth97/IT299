import { Router, Request, Response } from 'express'
import db from '../db'

const router = Router()

type Photo = {
  id: number
  title: string
  url: string
}

router.get('/', (_req: Request, res: Response) => {
  const stmt = db.prepare('SELECT * FROM photos')
  const photos = stmt.all() as Photo[]
  res.json(photos)
})

export default router
