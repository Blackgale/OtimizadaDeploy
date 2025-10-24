import data from '../data/products.json'
import ProductCard from '../components/ProductCard'
import { screenshotPreset, pdfPreset } from '../utils/colors'
import { useEffect, useState } from 'react'
import { track } from '../metrics/track'
import { metrics } from '../metrics/metrics'
import { Link } from 'react-router-dom'

type Product = {
  id: string
  title: string
  price: number
  image?: string
  images?: string[]
  tag?: string
}

export default function Products() {
  const [preset, setPreset] = useState<'screenshot' | 'pdf'>('screenshot')
  const categories = preset === 'screenshot' ? screenshotPreset : pdfPreset

  // métricas de tela: marca render ao montar e encerra quando o browser fica "idle"
  useEffect(() => {
    track('view_products')
    metrics.start('screen_render')

    const idle = (cb: () => void) => {
      const ric = (window as any).requestIdleCallback as
        | ((fn: () => void) => number)
        | undefined;
      if (ric) {
        const id = ric(cb)
        return () => {
          const cic = (window as any).cancelIdleCallback as
            | ((id: number) => void)
            | undefined;
          if (cic) cic(id)
        }
      } else {
        const id = window.setTimeout(cb, 0)
        return () => window.clearTimeout(id)
      }
    }

    const cleanup = idle(() => {
      metrics.end('screen_render', { pane: 'products' })
    })
    return cleanup
  }, [])

  const onChangePreset = (value: 'screenshot' | 'pdf') => {
    setPreset(value)
    track('change_preset', { to: value })
  }

  const products = data as unknown as Product[]

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <div className="flex items-center gap-2">
          <div className="text-sm flex items-center gap-2">
            <span>Rótulos:</span>
            <select
              className="input max-w-[200px]"
              value={preset}
              onChange={(e) => onChangePreset(e.target.value as 'screenshot' | 'pdf')}
            >
              <option value="screenshot">Da imagem (Vermelho/Verde/Azul/...)</option>
              <option value="pdf">Do PDF (Preciso Disso/Adorei!/…)</option>
            </select>
          </div>

          {/* opcional: atalho para /ab se você criou a tela A/B */}
          <Link to="/ab" className="btn-secondary">Comparar A/B</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} categories={categories} />
        ))}
      </div>
    </div>
  )
}
