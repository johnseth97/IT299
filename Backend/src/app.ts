import express from 'express'
import { Request, Response } from 'express'
import photosRouter from './routes/photos.js'
import serviceTypesRouter from './routes/serviceTypes.js'
import ordersRouter from './routes/orders.js'
import uploadRouter from './routes/upload.js'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 8080 // Defualt port, can be overridden by environment variable

app.use(express.json({ limit: '10mb' })) // Increase limit for large base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' })) // Increase limit for form data

app.use('/api/photos', photosRouter)
app.use('/api/service-types', serviceTypesRouter)
app.use('/api/orders', ordersRouter)

app.use('/api/upload', uploadRouter)
app.use('/uploads', express.static(path.resolve('uploads')))

// Health check endpoint
app.use('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
