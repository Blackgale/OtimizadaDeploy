import { X } from 'lucide-react'
import type { Category } from '../utils/colors'

type Props = {
  open: boolean
  onClose: () => void
  categories: Category[]
  onPick: (key: string) => void
}

export default function ColorModal({ open, onClose, categories, onPick }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[rgb(var(--bg))] p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Selecione uma cor</h2>
          <button className="btn-secondary" onClick={onClose}><X size={16}/></button>
        </div>
        <div className="mt-2 space-y-2">
          {categories.map(c => (
            <button key={c.key}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => { onPick(c.key); onClose(); }}>
              <span className={"inline-flex w-8 h-8 rounded-lg " + c.className}></span>
              <div className="text-left">
                <div className="text-sm font-medium">{c.name}</div>
                {c.description && <div className="text-xs opacity-70">{c.description}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
