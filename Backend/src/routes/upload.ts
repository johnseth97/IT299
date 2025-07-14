import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const router = Router()
const uploadDir = path.resolve('uploads')

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

router.post('/', async (req: Request, res: Response) => {
  const { imageBase64 } = req.body

  if (typeof imageBase64 !== 'string') {
    return res.status(400).json({ error: 'Missing imageBase64 string' })
  }

  const match = imageBase64.match(/^data:(image\/(png|jpeg));base64,(.+)$/)

  if (!match) {
    return res
      .status(400)
      .json({ error: 'Invalid image format. Only PNG and JPEG are allowed.' })
  }

  const mimeType = match[1] // image/png or image/jpeg
  const extension = mimeType === 'image/png' ? 'png' : 'jpg'
  const base64Data = match[3]

  try {
    const buffer = Buffer.from(base64Data, 'base64')
    const filename = `${randomUUID()}.${extension}`
    const filepath = path.join(uploadDir, filename)

    fs.writeFileSync(filepath, buffer)

    res.status(201).json({ url: `/uploads/${filename}` })
  } catch (err) {
    console.error('Upload error:', err)
    res.status(500).json({ error: 'Failed to save image' })
  }
})

export default router
