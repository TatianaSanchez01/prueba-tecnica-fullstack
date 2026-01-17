import React, { ReactNode, useEffect } from 'react'
import { authClient } from '@/lib/auth/client'
import Sidebar from '../molecules/Sidebar'
import Navbar from '../molecules/Navbar'
import ReactLoading from 'react-loading'

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  
  useEffect(() => {
    if (!isPending && !session) {
        authClient.signIn.social({
            provider: 'github'
        })
    }
  }, [isPending, session])

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <ReactLoading
          type="bubbles"
          color="#3B82F6"
          height={'20%'}
          width={'20%'}
        />
      </div>
    )

  if (!session)
    return (
      <div className="flex items-center justify-center">
        <ReactLoading
          type="bubbles"
          color="#3B82F6"
          height={'20%'}
          width={'20%'}
        />
      </div>
    )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
