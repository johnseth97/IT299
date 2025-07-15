// server.ts
import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createProxyMiddleware, type Options } from 'http-proxy-middleware'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// 1) Serve your static build
const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

// 2) (Optional) log every incoming request
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`➡️  [FRONT] ${req.method} ${req.originalUrl}`)
  next()
})

// 3) Build your proxy config
const backendUrl = process.env.VITE_API_URL
if (!backendUrl) throw new Error('VITE_API_URL not set')

const proxyOptions: Options = {
  target: backendUrl, // e.g. "http://backend:8080"
  changeOrigin: true,
  secure: false, // ignore cert errors in dev
  logger: console, // built-in logger

  // hook into the underlying http-proxy events
  on: {
    proxyReq(proxyReq, req, res) {
      console.log(
        `   ↪ [PROXY REQ] ${req.method} ${req.url} → ` +
          `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      )
    },
    proxyRes(proxyRes, req, res) {
      console.log(
        `   ↩ [PROXY RES] ${req.method} ${req.url} ← ` +
          `${proxyRes.statusCode}`
      )
    },
    error(err, _req, res) {
      console.error('⚠️ [PROXY ERROR]', err)
      if (!res) {
      }
      res.end('Bad gateway')
    },
  },
}

// 4) Mount the proxy
app.use(createProxyMiddleware(proxyOptions))

// 5) SPA fallback
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

// 6) Listen on IPv4 “any”
const port = Number(process.env.PORT) || 3000
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`✅ Frontend served at http://${host}:${port}`)
})
