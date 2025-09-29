import type { Category } from '../utils/colors'
import clsx from 'clsx'

type Props = {
  categories: Category[]
  active: string | 'all'
  onChange: (key: string | 'all') => void
  usage?: Record<string, number>
}

export default function FilterChips({ categories, active, onChange, usage }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className={clsx('badge', active === 'all' && 'ring-2 ring-blue-600')} onClick={() => onChange('all')}>
        Todas
      </button>
      {categories.map(c => {
        const count = usage?.[c.key as string] ?? 0
        const darker = count > 0 ? (c.chipClassName ?? c.className) : 'bg-gray-300 dark:bg-gray-600'
        return (
          <button
            key={c.key}
            className={clsx('badge text-black', darker, active === c.key && 'ring-2 ring-blue-600')}

            onClick={() => onChange(c.key)}>
            {c.name}{count ? ` · ${count}` : ''}
          </button>
        )
      })}
    </div>
  )
}
