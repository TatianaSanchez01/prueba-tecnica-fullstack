import ForbiddenMessage from '@/components/atoms/ForbiddenMessage';
import Loading from '@/components/atoms/Loading';
import Usuarios from '@/components/features/Usuarios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth/client';
import { getUserRole } from '@/lib/auth/utils';

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

  return <Usuarios />;
};

export default Index;
