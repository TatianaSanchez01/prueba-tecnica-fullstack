'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { useRouter } from 'next/router';
import { Badge } from '../ui/badge';
import { PackagePlus } from 'lucide-react';

import Private from '../organism/Private';
import Loading from '../atoms/Loading';

import { toast } from 'sonner';
import { formatAmount } from '@/lib/currency.utils';
import { formatDate } from '@/lib/date.utils';
import { transactionsApi } from '@/lib/api/transactions.api';
import { Transaction } from '@/lib/transactions/transaction.interface';

function IngresosGastos() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);
      const data = await transactionsApi.getAll();
      setTransactions(data);
    } catch {
      toast('Error al cargar transacciones.', {
        description: 'Ocurrió un error al cargar la lista de transacciones.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    try {
      setLoading(true);
      await transactionsApi.delete(id);

      toast('Transacción eliminada', {
        description: 'La transacción fue eliminada correctamente.',
      });

      await fetchTransactions();
    } catch {
      toast('Error al eliminar transacción.', {
        description: 'Ocurrió un error al eliminar la transacción.',
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <Card>
      <CardHeader className='px-7 flex-row flex items-center justify-between'>
        <div>
          <CardTitle>Ingresos y Gastos</CardTitle>
          <CardDescription>Lista de ingresos y gastos </CardDescription>
        </div>
        <Private allowedRoles={['ADMIN']}>
          <Button
            onClick={() => router.push('/ingresos-gastos/new')}
            className='px-7 flex gap-4'
            variant='default'
          >
            Nuevo
            <PackagePlus />
          </Button>
        </Private>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead className='hidden sm:table-cell'>Monto</TableHead>
              <TableHead className='hidden sm:table-cell'>Fecha</TableHead>
              <TableHead className='hidden sm:table-cell'>Usuario</TableHead>
              <Private allowedRoles={['ADMIN']}>
                <TableHead className='hidden sm:table-cell'>Acciones</TableHead>
              </Private>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((data: Transaction) => (
              <TableRow className='bg-accent' key={data.id}>
                <TableCell>{data.description}</TableCell>
                <TableCell className='hidden sm:table-cell text-right'>
                  {data.amount >= 0 ? (
                    <span className='text-green-900'>
                      {formatAmount(data.amount)}
                    </span>
                  ) : (
                    <span className='text-red-900'>
                      {formatAmount(data.amount)}
                    </span>
                  )}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {formatDate(data.date)}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Badge className='text-xs' variant='outline'>
                    {data.user.name}
                  </Badge>
                </TableCell>
                <Private allowedRoles={['ADMIN']}>
                  <TableCell className='hidden md:table-cell'>
                    <div className='flex flex-row gap-5'>
                      <Badge
                        onClick={() =>
                          router.push(`/ingresos-gastos/${data.id}`)
                        }
                        className='text-xs justify-center w-24 cursor-pointer'
                        variant='default'
                      >
                        Edit
                      </Badge>
                      <Badge
                        className='text-xs justify-center w-24 cursor-pointer'
                        variant='destructive'
                        onClick={() => onDelete(data.id)}
                      >
                        Delete
                      </Badge>
                    </div>
                  </TableCell>
                </Private>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default IngresosGastos;
