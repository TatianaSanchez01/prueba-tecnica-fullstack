import type { Session } from '@/lib/auth'

export function getUserRole(session: any) {
  return session?.user?.role
}
