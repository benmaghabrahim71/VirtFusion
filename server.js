import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

const createServer = async () => {
  const vite = await createViteServer({
    server: { middlewareMode: true },
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      const template = await vite.transformIndexHtml(
        url,
        require('fs').readFileSync(join(__dirname, 'index.html'), 'utf-8')
      )
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}

createServer().catch(console.error)
