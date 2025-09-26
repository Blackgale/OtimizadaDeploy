import { useParams } from 'react-router-dom'
import products from '../data/products.json'
import reviews from '../data/reviews.json'
import ImageReveal from '../components/ImageReveal'
import { useState } from 'react'
import { useWishlist } from '../store/useWishlist'
import { screenshotPreset } from '../utils/colors'
import ColorModal from '../components/ColorModal'

type Review = { id:string; author:string; date:string; rating:number; text:string; likes:number; replies:number }
type Product = { id:string; title:string; price:number; image:string; tag?:string }

export default function ProductDetails() {
  const { id } = useParams<{ id:string }>()
  const p = products.find(x => x.id === id) as Product | undefined
  const rev = (reviews as any)[id ?? '']
  const [tab, setTab] = useState<'details'|'reviews'>('details')
  const [open, setOpen] = useState(false)
  const { add } = useWishlist()

  if (!p) return <div className="p-4">Produto não encontrado.</div>

  const onPick = (key: string) => add({ productId: p.id, color: key as any, addedAt: Date.now() })

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-4">
      <button className="btn-secondary" onClick={() => history.back()}>← Voltar</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ImageReveal src={p.image} alt={p.title} className="w-full" />
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">{p.title}</h1>
          <div className="opacity-80">${p.price.toFixed(2)}</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="card">Conectividade: Bluetooth 5.0</div>
            <div className="card">Peso: 250g</div>
            <div className="card">Bateria: 45 horas</div>
            <div className="card">Cor: Midnight Black</div>
          </div>
          <button className="btn" onClick={() => setOpen(true)}>Salvar</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <button className={"btn-secondary " + (tab==='details'?'ring-2 ring-blue-600':'')} onClick={()=>setTab('details')}>Detalhes</button>
          <button className={"btn-secondary " + (tab==='reviews'?'ring-2 ring-blue-600':'')} onClick={()=>setTab('reviews')}>Avaliações</button>
        </div>
        {tab==='details' ? (
          <div className="mt-3 card">
            <p>Produto premium com cancelamento de ruído ativo e design confortável.</p>
          </div>
        ) : (
          <Reviews id={id!} />
        )}
      </div>

      <ColorModal open={open} onClose={() => setOpen(false)} categories={screenshotPreset} onPick={onPick} />
    </div>
  )
}

function Reviews({ id }: { id: string }) {
  const data = (reviews as any)[id]
  if (!data) return <div className="mt-3 opacity-70">Sem avaliações ainda.</div>

  const total = data.summary.total as number
  const dist = data.summary.dist as Record<string, number>
  const avg = data.summary.avg as number

  return (
    <div className="mt-3 space-y-4">
      <div className="card">
        <div className="text-2xl font-semibold">{avg.toFixed(1)}</div>
        <div className="opacity-70 text-sm">{total} reviews</div>
        <div className="mt-2 space-y-1">
          {[5,4,3,2,1].map(star => {
            const pct = Math.round(((dist[String(star)] ?? 0)/100)*100)
            return (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-4">{star}</span>
                <div className="flex-1 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PaginatedList items={data.items} pageSize={5} />
    </div>
  )
}

function PaginatedList({ items, pageSize }: { items: Review[], pageSize:number }) {
  const [page, setPage] = useState(1)
  const start = (page-1)*pageSize
  const slice = items.slice(start, start+pageSize)
  const pages = Math.ceil(items.length / pageSize)
  return (
    <div className="space-y-3">
      {slice.map(r => (
        <div className="card" key={r.id}>
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.author}</div>
            <div className="text-xs opacity-70">{r.date}</div>
          </div>
          <div className="text-sm">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
          <p className="mt-2 text-sm">{r.text}</p>
          <div className="mt-2 text-xs opacity-70">👍 {r.likes} · 💬 {r.replies}</div>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button className="btn-secondary" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Anterior</button>
        <div className="text-sm">Página {page} de {pages}</div>
        <button className="btn-secondary" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>Próxima</button>
      </div>
    </div>
  )
}
