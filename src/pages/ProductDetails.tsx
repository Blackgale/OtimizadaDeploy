import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import { useWishlist } from '../store/useWishlist'
import { screenshotPreset } from '../utils/colors'
import ColorModal from '../components/ColorModal'
import reviewsData from '../data/reviews.json'

type ApiProductDetails = {
  id: string
  name: string
  slug: string
  description: string
  carousel: { baseUrl: string; isMainImage: boolean }[]
  details: { productDetail: string }[]
  // se depois você adicionar preço no backend:
  price?: number
}

type Review = {
  id: string
  author: string
  date: string
  rating: number
  text: string
  likes: number
  replies: number
}

type Product = {
  id: string
  title: string
  price?: number
  images: string[]
  description: string
  details: string[]
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [open, setOpen] = useState(false)
  const { add } = useWishlist()

  useEffect(() => {
    if (!id) return

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`)
        if (!res.ok) throw new Error('Falha ao buscar produto')
        const data: ApiProductDetails = await res.json()

        const mapped: Product = {
          id: data.id,
          title: data.name,
          price: data.price,
          images: data.carousel?.map((c) => c.baseUrl) ?? [],
          description: data.description,
          details: data.details?.map((d) => d.productDetail) ?? [],
        }

        setProduct(mapped)
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? 'Erro ao buscar produto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const images = useMemo(() => product?.images ?? [], [product])

  if (loading) return <div className="p-4">Carregando produto...</div>
  if (error || !product)
    return <div className="p-4">Produto não encontrado.</div>

  const onPick = (key: string) =>
    add({ productId: product.id, color: key as any, addedAt: Date.now() })

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
      <button className="btn-secondary" onClick={() => history.back()}>
        ← Voltar
      </button>

      {/* topo: carrossel à esquerda / ações e preço à direita */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCarousel images={images} title={product.title} />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>

          {product.price != null && (
            <div className="text-lg opacity-80">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
          )}

          <div className="card text-sm">
            <p>{product.description}</p>
          </div>

          <button
            className="inline-flex items-center justify-center w-full md:w-auto rounded-2xl px-5 py-3 text-sm font-semibold
                       bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition"
            onClick={() => setOpen(true)}
          >
            Salvar na lista de desejos
          </button>
        </div>
      </div>

      {/* detalhes abaixo */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Detalhes</h2>
        <div className="card space-y-1 text-sm">
          {product.details.map((d) => (
            <div key={d}>• {d}</div>
          ))}
        </div>
      </section>

      {/* avaliações */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Avaliações</h2>
        <Reviews id={product.id} />
      </section>

      <ColorModal
        open={open}
        onClose={() => setOpen(false)}
        categories={screenshotPreset}
        onPick={onPick}
      />
    </div>
  )
}

function Reviews({ id }: { id: string }) {
  const data = (reviewsData as any)[id]

  const [items, setItems] = useState<Review[]>(data?.items ?? [])
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [form, setForm] = useState({ author: '', rating: 5, text: '' })

  const start = (page - 1) * pageSize
  const slice = items.slice(start, start + pageSize)
  const pages = Math.ceil(items.length / pageSize)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.author || !form.text) return
    const r: Review = {
      id: 'new_' + crypto.randomUUID(),
      author: form.author,
      date: new Date().toISOString().slice(0, 10),
      rating: Number(form.rating) || 5,
      text: form.text,
      likes: 0,
      replies: 0,
    }
    setItems([r, ...items])
    setForm({ author: '', rating: 5, text: '' })
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* formulário mockado */}
      <form onSubmit={submit} className="card space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            className="input"
            placeholder="Seu nome"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
          />
          <select
            className="input"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} estrelas
              </option>
            ))}
          </select>
          <button className="btn">Enviar avaliação</button>
        </div>
        <textarea
          className="input"
          placeholder="Escreva sua avaliação..."
          value={form.text}
          onChange={(e) =>
            setForm({ ...form, text: e.target.value })
          }
        />
      </form>

      {/* lista */}
      {slice.map((r) => (
        <div className="card" key={r.id}>
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.author}</div>
            <div className="text-xs opacity-70">{r.date}</div>
          </div>
          <div className="text-sm">
            {'★'.repeat(r.rating)}
            {'☆'.repeat(5 - r.rating)}
          </div>
          <p className="mt-2 text-sm">{r.text}</p>
          <div className="mt-2 text-xs opacity-70">
            👍 {r.likes} · 💬 {r.replies}
          </div>
        </div>
      ))}

      {/* paginação */}
      {pages > 1 && (
        <div className="flex items-center justify-between">
          <button
            className="btn-secondary"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </button>
          <div className="text-sm">
            Página {page} de {pages}
          </div>
          <button
            className="btn-secondary"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}
