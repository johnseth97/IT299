// server.ts
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

// 🔁 Proxy internal API requests to backend
const backendUrl = process.env.VITE_API_URL
if (!backendUrl) {
  throw new Error('VITE_API_URL not set in environment')
}
app.use(
  '/api',
  createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' }, // optional, here for clarity
  })
)

// 🎯 Wildcard route for SPA fallback
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`✅ Frontend served at http://localhost:${port}`)
})
