import IngresosGastos from '@/components/features/IngresosGastos';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getUserRole } from '@/lib/auth/auth.helpers';
import Loading from '@/components/atoms/Loading';
import ForbiddenMessage from '@/components/atoms/ForbiddenMessage';

const Index = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const role = getUserRole(session);

  useEffect(() => {
    if (!isPending && session && role !== 'ADMIN') {
      const timeout = setTimeout(() => {
        router.replace('/');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <Loading />;
  }

  if (role !== 'ADMIN') {
    return <ForbiddenMessage />;
  }

  return <IngresosGastos />;
};
export default Index;
