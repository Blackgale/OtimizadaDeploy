import { create } from 'zustand'
import type { ColorKey } from '../utils/colors'
import { load, save } from '../utils/storage'

export type Wish = { productId: string; color: ColorKey; addedAt: number }

type State = {
  items: Wish[];
  add: (w: Wish) => void;
  remove: (productId: string) => void;
  reclassify: (productId:string, color: ColorKey) => void;
  clear: () => void;
}

export const useWishlist = create<State>((set, get) => ({
  items: load<Wish[]>('wishlist_items', []),
  add(w) {
    const others = get().items.filter(i => i.productId !== w.productId)
    const next = [...others, w]
    set({ items: next }); save('wishlist_items', next)
  },
  remove(productId) {
    const next = get().items.filter(i => i.productId !== productId)
    set({ items: next }); save('wishlist_items', next)
  },
  reclassify(productId, color) {
    const next = get().items.map(i => i.productId === productId ? { ...i, color } : i)
    set({ items: next }); save('wishlist_items', next)
  },
  clear() { set({ items: [] }); save('wishlist_items', []) }
}))
