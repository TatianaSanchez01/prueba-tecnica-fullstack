import { Role } from '@/lib/types/role'

export interface AppUser {
  id: string
  name: string
  email: string
  image?: string | null
  role: Role
}

export interface AppSession {
  user: AppUser
}
