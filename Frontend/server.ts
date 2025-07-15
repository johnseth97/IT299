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
  const indexPath = path.join(distDir, 'index.html')
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) return next(err)

    const configScript = `
      <script>
        window.__CONFIG__ = {
          VITE_API_URL: "${process.env.VITE_API_URL || ''}"
        };
      </script>
    `

    // Inject config before the first script tag
    const injected = html.replace(
      '<script type="module"',
      `${configScript}\n    <script type="module"`
    )

    res.setHeader('Content-Type', 'text/html')
    res.send(injected)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`✅ Frontend served at http://localhost:${port}`)
})
