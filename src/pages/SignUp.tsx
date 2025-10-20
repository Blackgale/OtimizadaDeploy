import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const { signUp } = useAuth()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // validação simples antes de chamar o store
    const emailOk = /\S+@\S+\.\S+/.test(email)
    if (!name.trim()) return setError('Informe seu nome.')
    if (!emailOk) return setError('E-mail inválido.')
    if (password.length < 6) return setError('Senha deve ter pelo menos 6 caracteres.')

    try {
      setLoading(true)
      await signUp(name.trim(), email.trim(), password)
      nav('/')
    } catch (err: any) {
      setError(err?.message || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  const disabled = loading || !name.trim() || !email.trim() || password.length < 6

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Criar conta</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="input"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <input
          className="input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          inputMode="email"
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Senha (mín. 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button className="btn w-full disabled:opacity-60" disabled={disabled}>
          {loading ? 'Criando...' : 'Criar conta'}
        </button>

        <p className="mt-4 text-sm">
          Já tem conta?{' '}
          <Link to="/signin" className="link">
            Voltar ao login
          </Link>
        </p>
      </form>
    </div>
  )
}
