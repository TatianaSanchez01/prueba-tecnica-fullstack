import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { UserRoundPlus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { User } from '@/lib/users/user.interface';
import Loading from '../atoms/Loading';
import { usersApi } from '@/lib/api/users.api';

function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error: any) {
      if (error.response?.status === 403) {
        router.replace('/');
        return;
      }

      console.error('Error fetching users:', error);
      toast('Error al cargar usuarios.', {
        description: 'Ocurrió un error al cargar la lista de usuarios.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    const userToDelete = users.find((u) => u.id === id);

    try {
      setLoading(true);
      await usersApi.delete(id);

      toast('El usuario fue eliminado con éxito.', {
        description: `El usuario ${userToDelete?.name || ''} fue eliminado con éxito.`,
      });

      await fetchUsers();
    } catch (error: any) {
      if (error.response?.status === 403) {
        router.replace('/');
        return;
      }

      console.error('Error deleting user:', error);
      toast('Error al eliminar el usuario.', {
        description: 'Ocurrió un error al eliminar el usuario.',
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardHeader className='px-7 flex-row flex items-center justify-between'>
        <div>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Lista de usuarios del sistema</CardDescription>
        </div>
        <Button
          onClick={() => router.push('/usuarios/new')}
          className='px-7 flex gap-4'
          variant='default'
        >
          Nuevo
          <UserRoundPlus />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className='hidden sm:table-cell'>Correo</TableHead>
              <TableHead className='hidden sm:table-cell'>Rol</TableHead>
              <TableHead className='hidden sm:table-cell'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow className='bg-accent' key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {user.email}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Badge
                    variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <div className='flex flex-row gap-5'>
                    <Badge
                      onClick={() => router.push(`/usuarios/${user.id}`)}
                      className='text-xs justify-center w-24 cursor-pointer'
                      variant='default'
                    >
                      Edit
                    </Badge>
                    <Badge
                      className='text-xs justify-center w-24 cursor-pointer'
                      variant='destructive'
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Usuarios;
