import express from 'express'
import photosRouter from './routes/photos'

const app = express()
const PORT = process.env.PORT || 5000 // Defualt port, can be overridden by environment variable

app.use(express.json())

app.use('/api/photos', photosRouter)

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
