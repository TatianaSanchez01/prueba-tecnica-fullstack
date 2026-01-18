import { ChartColumnDecreasing, Coins, Users } from 'lucide-react';

export const getIcon = (icon: string) => {
  switch (icon) {
    case 'users':
      return <Users size={24} className='text-primary' />;
    case 'chart-bar':
      return <ChartColumnDecreasing size={24} className='text-primary' />;
    case 'cash':
      return <Coins size={24} className='text-primary' />;
  }
};
