import IngresosGastos from '@/components/features/IngresosGastos';
import { authClient } from '@/lib/auth/client';
import Loading from '@/components/atoms/Loading';

const Index = () => {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  return <IngresosGastos />;
};
export default Index;
