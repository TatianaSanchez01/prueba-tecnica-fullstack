import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { ChartColumnDecreasing, Coins, Users } from 'lucide-react'

interface HomeCardProps {
  title: string
  description: string
  url: string
  icon: string
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'users':
      return <Users size={24} className="text-primary" />
    case 'chart-bar':
      return <ChartColumnDecreasing size={24} className="text-primary" />
    case 'cash':
      return <Coins size={24} className="text-primary" />
  }
}

function HomeCard({ title, description, url, icon }: HomeCardProps) {
  return (
    <Link href={url}>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          {getIcon(icon)}
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default HomeCard
