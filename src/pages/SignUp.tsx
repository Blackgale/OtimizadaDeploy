import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()
  const { signUp } = useAuth()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUp(name, email, password)
      nav('/')
    } catch (err:any) {
      setError(err.message || 'Erro ao cadastrar')
    }
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Criar conta</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="btn w-full">Criar conta</button>
      </form>
    </div>
  )
}
