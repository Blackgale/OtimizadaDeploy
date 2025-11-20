import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Middleware dev: recebe POST em /_metrics e imprime em SEGUNDOS quando houver duração
const metricsDevPlugin = () => ({
  name: 'metrics-dev-middleware',
  configureServer(server: any) {
    server.middlewares.use('/_metrics', (req: any, res: any, next: any) => {
      if (req.method !== 'POST') return next()

      let body = ''
      req.on('data', (c: any) => (body += c))
      req.on('end', () => {
        try {
          const evt = JSON.parse(body)
          if (typeof evt?.ms === 'number') {
            const s = +(evt.ms / 1000).toFixed(3)
            console.log('[metrics:dev]', { ...evt, s })
          } else {
            console.log('[metrics:dev]', evt)
          }
        } catch {
          console.log('[metrics:dev:raw]', body)
        }
        res.statusCode = 204
        res.end()
      })
    })
  },
})

export default defineConfig({
  plugins: [react(), metricsDevPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://72.61.52.29:8080',
        changeOrigin: true,
      },
    },
  },
})
