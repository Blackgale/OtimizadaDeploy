import { useState, useMemo } from 'react';
import type { Category } from '../utils/colors';
import ImageReveal from './ImageReveal';
import ColorModal from './ColorModal';
import { useWishlist } from '../store/useWishlist';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

type Product = {
  id: string; title: string; price: number; image?: string; images?: string[]; tag?: string;
};

export default function ProductCard({ p, categories }: { p: Product; categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const { items, add, remove } = useWishlist();
  const saved = items.find(i => i.productId === p.id);

  const imgs = useMemo<string[]>(() => {
    if (Array.isArray(p.images) && p.images.length) return p.images;
    return p.image ? [p.image] : [];
  }, [p]);

  const colorClass = saved ? (categories.find(c => c.key === saved.color)?.className ?? 'bg-gray-400') : 'bg-gray-300';

  return (
    <div className="card">
      <div className="flex gap-4">
        <Link to={`/product/${p.id}`} className="w-24 shrink-0">
          {/* lista: pode carregar automaticamente */}
          <ImageReveal src={imgs[0]} alt={p.title} className="w-24" auto />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link to={`/product/${p.id}`} className="font-medium hover:underline">{p.title}</Link>
            {p.tag && <span className="badge">{p.tag}</span>}
          </div>
          <div className="text-sm opacity-80">${p.price?.toFixed(2)}</div>
          <div className="mt-2 flex items-center gap-2">
            {!saved ? (
              <button className="btn-secondary hover:shadow"
                onClick={() => setOpen(true)}>
                <Heart size={16} className="mr-2" />
                Adicionar à lista
              </button>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 text-sm">
                  <span className={'w-3 h-3 rounded-full ' + colorClass}></span>
                  Salvo
                </span>
                <button className="btn-secondary" onClick={() => remove(p.id)}>Remover</button>
              </>
            )}
          </div>
        </div>
      </div>
      <ColorModal
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        onPick={(key) => add({ productId: p.id, color: key as any, addedAt: Date.now() })}
      />
    </div>
  );
}
