import React from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth/client'

import { Home, LineChart, Users, Landmark, HandCoins } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/router'
import Private from '../organism/Private'

const Sidebar = () => {
  const { data: session } = authClient.useSession();

  const location = useRouter()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <HandCoins className="h-6 w-6 text-primary" />
            <span className="text-primary font-bold">GastoControl</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Inicio
            </Link>

            <Link
              href="/ingresos-gastos"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/ingresos-gastos'
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              } hover:text-primary`}
            >
              <Landmark className="h-4 w-4" />
              Ingresos y gastos
            </Link>
            <Private allowedRoles={['ADMIN']}>
              <Link
                href="/usuarios"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === '/usuarios'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                } hover:text-primary`}
              >
                <Users className="h-4 w-4" />
                Usuarios
              </Link>
            </Private>
            <Private allowedRoles={['ADMIN']}>
              <Link
                href="/reportes"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  location.pathname === '/reportes'
                    ? 'bg-muted text-primary'
                    : 'text-muted-foreground'
                } hover:text-primary`}
              >
                <LineChart className="h-4 w-4" />
                Reportes
              </Link>
            </Private>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="flex flex-row gap-5 justify-center items-center p-2 pt-0 md:p-4">
              <div>
                <CardTitle>{session?.user?.name}</CardTitle>
                <CardTitle>{(session?.user as any)?.role}</CardTitle>
              </div>
              <Avatar>
                <AvatarImage
                  src={session?.user?.image ?? 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
