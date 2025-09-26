import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function SignIn() {
  const [email, setEmail] = useState('demo@acme.com')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const loc = useLocation()
  const { signIn } = useAuth()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      const dest = (loc.state as any)?.from?.pathname ?? '/'
      nav(dest)
    } catch (err:any) {
      setError(err.message || 'Erro ao entrar')
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="btn w-full">Entrar</button>
      </form>
      <p className="mt-4 text-sm">Novo aqui? <Link to="/signup" className="link">Criar conta</Link></p>
    </div>
  )
}
