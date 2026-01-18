import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { authClient } from '@/lib/auth/client';
import { getUserRole } from '@/lib/auth/auth.helpers';
import Loading from '@/components/atoms/Loading';
import ForbiddenMessage from '@/components/atoms/ForbiddenMessage';
import { transactionsApi } from '@/lib/api/transactions.api';

const FormSchema = z.object({
  amount: z.number(),
  description: z.string(),
  date: z.string().date(),
});

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;
  return {
    props: { id },
  };
}

const Index = ({ id }: { id: string }) => {
  const router = useRouter();
  const isNewTransaction = id === 'new';

  const { data: session, isPending } = authClient.useSession();
  const role = getUserRole(session);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (!isNewTransaction) {
      fetchTransaction();
    }
  }, [id]);

  async function fetchTransaction() {
    try {
      setLoading(true);
      const data = await transactionsApi.getById(id);

      form.reset({
        description: data.description,
        amount: data.amount,
        date: data.date.slice(0, 10),
      });
    } catch {
      toast('Error al cargar transacción');
      router.push('/ingresos-gastos');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isNewTransaction) {
        await transactionsApi.create({
          description: values.description,
          amount: values.amount,
          date: new Date(values.date).toISOString(),
        });
      } else {
        await transactionsApi.update(id, {
          description: values.description,
          amount: values.amount,
          date: new Date(values.date).toISOString(),
        });
      }

      toast(
        isNewTransaction ? 'Transacción creada' : 'Transacción actualizada',
        {
          description: 'La operación se realizó con éxito.',
        }
      );

      router.push('/ingresos-gastos');
    } catch {
      toast('Error al guardar transacción');
    } finally {
      setLoading(false);
    }
  }

  const handleRedirect = () => {
    router.push('/ingresos-gastos');
  };

  if (isPending || loading) return <Loading />;

  if (role !== 'ADMIN') {
    return <ForbiddenMessage />;
  }

  return (
    <div className='flex gap-5'>
      <Card className='w-full h-fit bg-white shadow-lg rounded-lg border border-gray-200'>
        <CardHeader className=' px-6 py-5'>
          <CardTitle className='text-xl font-bold text-gray-800'>
            {isNewTransaction
              ? 'Agregar un nuevo movimiento'
              : 'Editar movimiento'}
          </CardTitle>
        </CardHeader>
        <CardContent className='px-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700 mb-1'>
                      Concepto
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues('description')}
                        onChange={(e) => {
                          form.setValue('description', e.target.value);
                        }}
                        type='text'
                        className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700 mb-1'>
                      Monto
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues('amount')}
                        onChange={(e) => {
                          form.setValue('amount', parseFloat(e.target.value));
                        }}
                        type='text'
                        className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium text-gray-700 mb-1'>
                      Fecha
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='date'
                        type='date'
                        placeholder='Fecha'
                        value={form.getValues('date')}
                        onChange={(e) => {
                          form.setValue('date', e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-5'>
                <Button
                  type='submit'
                  className='px-6 py-2 font-medium rounded-md shadow'
                >
                  Guardar
                </Button>
                <Button
                  variant='outline'
                  type='button'
                  onClick={handleRedirect}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
