import data from '../data/products.json'
import ProductCard from '../components/ProductCard'
import { screenshotPreset, pdfPreset } from '../utils/colors'
import { useState } from 'react'

export default function Products() {
  const [preset, setPreset] = useState<'screenshot'|'pdf'>('screenshot')
  const categories = preset === 'screenshot' ? screenshotPreset : pdfPreset

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <div className="text-sm flex items-center gap-2">
          <span>Rótulos:</span>
          <select className="input max-w-[200px]" value={preset} onChange={e => setPreset(e.target.value as any)}>
            <option value="screenshot">Da imagem (Vermelho/Verde/Azul/...)</option>
            <option value="pdf">Do PDF (Preciso Disso/Adorei!/...)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(p => (
          <ProductCard key={p.id} p={p as any} categories={categories} />
        ))}
      </div>
    </div>
  )
}
