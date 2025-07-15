// server.ts
import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

app.get('/*splat', (_req, res, next) => {
  const filePath = path.join(distDir, 'index.html')
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return next(err)
    const html = data.replace(
      '__VITE_API_URL__',
      process.env.VITE_API_URL || ''
    )
    res.set('Content-Type', 'text/html')
    res.send(html)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`✅ Frontend served at http://localhost:${port}`)
})
