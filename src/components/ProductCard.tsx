import { useState } from 'react'
import type { Category } from '../utils/colors'
import ImageReveal from './ImageReveal'
import ColorModal from './ColorModal'
import { useWishlist } from '../store/useWishlist'
import { Link } from 'react-router-dom'

type Product = {
  id: string; title: string; price: number; image: string; tag?: string
}

export default function ProductCard({ p, categories }: { p: Product; categories: Category[] }) {
  const [open, setOpen] = useState(false)
  const { items, add, remove } = useWishlist()
  const saved = items.find(i => i.productId === p.id)

  return (
    <div className="card">
      <div className="flex gap-4">
        <ImageReveal src={p.image} alt={p.title} className="w-24 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link to={`/product/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
            {p.tag && <span className="badge">{p.tag}</span>}
          </div>
          <div className="text-sm opacity-80">${p.price.toFixed(2)}</div>
          <div className="mt-2 flex items-center gap-2">
            {!saved ? (
              <button className="btn-secondary" onClick={() => setOpen(true)}>Pin</button>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 text-sm">
                  <span className={"w-3 h-3 rounded-full " + (categories.find(c => c.key === saved.color)?.className || 'bg-gray-400')}></span>
                  Salvo
                </span>
                <button className="btn-secondary" onClick={() => remove(p.id)}>Remover</button>
              </>
            )}
          </div>
        </div>
      </div>
      <ColorModal open={open} onClose={() => setOpen(false)} categories={categories} onPick={(key) => {
        add({ productId: p.id, color: key as any, addedAt: Date.now() })
      }} />
    </div>
  )
}
