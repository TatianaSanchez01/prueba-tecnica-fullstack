import { Role } from '@/lib/auth/role.enum'

export interface CreateUserRequest {
  name: string
  email: string
  role: Role
}

export interface UpdateUserRequest {
  name?: string
  role?: Role
}