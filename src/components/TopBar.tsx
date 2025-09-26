import { Link, NavLink } from 'react-router-dom'
import { Heart, LogOut, Moon, Sun } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import { useTheme } from '../hooks/useTheme'

export default function TopBar() {
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  return (
    <header className="sticky top-0 z-40 bg-[rgb(var(--bg))] border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-semibold">Produtos</Link>
        <NavLink to="/wishlist" className="ml-4 inline-flex items-center gap-2">
          <Heart size={18}/> Lista de desejos
        </NavLink>
        <div className="ml-auto flex items-center gap-3">
          <button className="btn-secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
            <span className="ml-2 hidden sm:inline">Tema</span>
          </button>
          {user ? (
            <>
              <span className="text-sm hidden sm:inline">Olá, {user.name}</span>
              <button className="btn-secondary" onClick={() => signOut()}>
                <LogOut size={16}/><span className="ml-2 hidden sm:inline">Sair</span>
              </button>
            </>
          ) : (
            <Link to="/signin" className="btn-secondary">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  )
}
