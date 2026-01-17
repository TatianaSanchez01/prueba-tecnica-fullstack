import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { getIcon } from '../icons/IconMap';

interface HomeCardProps {
  title: string;
  description: string;
  url: string;
  icon: string;
}

function HomeCard({ title, description, url, icon }: HomeCardProps) {
  return (
    <Link href={url}>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          {getIcon(icon)}
          <div className='flex flex-col gap-2'>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default HomeCard;
