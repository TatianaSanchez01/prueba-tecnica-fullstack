import ForbiddenMessage from '@/components/atoms/ForbiddenMessage';
import Loading from '@/components/atoms/Loading';
import Reportes from '@/components/features/Reportes';
import { authClient } from '@/lib/auth/client';
import { getUserRole } from '@/lib/auth/auth.helpers';

const Index = () => {
  const { data: session, isPending } = authClient.useSession();
  const role = getUserRole(session);

  if (isPending) {
    return <Loading />;
  }

  if (role !== 'ADMIN') {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return <ForbiddenMessage />;
  }

  return <Reportes />;
};
export default Index;
