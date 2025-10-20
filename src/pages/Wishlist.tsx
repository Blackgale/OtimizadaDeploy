import data from '../data/products.json'
import { useWishlist } from '../store/useWishlist'
import { screenshotPreset } from '../utils/colors'
import FilterChips from '../components/FilterChips'
import ColorModal from '../components/ColorModal'
import ImageReveal from '../components/ImageReveal'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type Product = {
  id: string
  title: string
  price: number
  image?: string
  images?: string[]
  tag?: string
}

export default function Wishlist() {
  const { items, remove, reclassify } = useWishlist()
  const [filter, setFilter] = useState<'all' | string>('all')
  const [editId, setEditId] = useState<string | null>(null)

  // contagem por cor para escurecer chips
  const usage = items.reduce<Record<string, number>>((acc, i) => {
    acc[i.color] = (acc[i.color] || 0) + 1
    return acc
  }, {})

  // aplica filtro e junta com os dados dos produtos
  const list = useMemo(() => {
    const arr = (data as unknown as Product[])
    return items
      .filter(i => filter === 'all' || i.color === filter)
      .map(i => ({
        wish: i,
        product: arr.find(p => p.id === i.productId)!,
      }))
  }, [items, filter])

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lista de desejos</h1>
      </div>

      <FilterChips
        categories={screenshotPreset}
        active={filter}
        onChange={setFilter}
        usage={usage}
      />

      <div className="mt-2 space-y-3">
        {list.length === 0 && (
          <div className="opacity-70">Nada aqui ainda.</div>
        )}

        {list.map(({ wish, product }) => {
          // pega a primeira imagem (images[0]) ou image
          const firstImg =
            (product.images && product.images[0]) || product.image || ''

          return (
            <div className="card flex items-center gap-4" key={wish.productId}>
              <Link to={`/product/${product.id}`} className="w-24 shrink-0">
                {/* imagem carrega automaticamente */}
                <ImageReveal
                  src={firstImg}
                  alt={product.title}
                  className="w-24"
                  auto
                />
              </Link>

              <div className="flex-1">
                <Link
                  to={`/product/${product.id}`}
                  className="font-medium hover:underline"
                >
                  {product.title}
                </Link>
                <div className="text-sm opacity-70">
                  ${product.price.toFixed(2)}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => setEditId(wish.productId)}
                  >
                    Editar categoria
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => remove(wish.productId)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ColorModal
        open={!!editId}
        onClose={() => setEditId(null)}
        categories={screenshotPreset}
        onPick={key => {
          if (editId) reclassify(editId, key as any)
        }}
      />
    </div>
  )
}
