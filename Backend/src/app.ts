import express from 'express'
import { Request, Response } from 'express'
import photosRouter from './routes/photos.js'
import serviceTypesRouter from './routes/serviceTypes.js'
import ordersRouter from './routes/orders.js'

const app = express()
const PORT = process.env.PORT || 5000 // Defualt port, can be overridden by environment variable

app.use(express.json())

app.use('/api/photos', photosRouter)
app.use('/api/service-types', serviceTypesRouter)
app.use('/api/orders', ordersRouter)

// Health check endpoint
app.use('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
