import { create } from 'zustand'
import usersSeed from '../data/users.json'
import { load, save } from '../utils/storage'

type User = { id:string; email:string; name:string }
type State = {
  user: User | null;
  token: string | null;
  signIn: (email:string, password:string) => Promise<void>;
  signUp: (name:string, email:string, password:string) => Promise<void>;
  signOut: () => void;
}

type RawUser = { id:string; email:string; password:string; name:string }

export const useAuth = create<State>((set, get) => ({
  user: load<User|null>('auth_user', null),
  token: load<string|null>('auth_token', null),
  async signIn(email, password) {
    const db: RawUser[] = load<RawUser[]>('users_db', usersSeed as any)
    const found = db.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) throw new Error('Credenciais inválidas.')
    const token = btoa(`${found.id}:${Date.now()}`)
    const user = { id: found.id, email: found.email, name: found.name }
    save('auth_user', user); save('auth_token', token)
    set({ user, token })
  },
  async signUp(name, email, password) {
    const db: RawUser[] = load<RawUser[]>('users_db', usersSeed as any)
    if (db.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('E-mail já cadastrado.')
    const newUser: RawUser = { id: crypto.randomUUID(), email, password, name }
    db.push(newUser)
    save('users_db', db)
    await get().signIn(email, password)
  },
  signOut() {
    save('auth_user', null); save('auth_token', null)
    set({ user: null, token: null })
  }
}))
