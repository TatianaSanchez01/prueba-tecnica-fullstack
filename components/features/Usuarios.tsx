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
import ReactLoading from 'react-loading';
import { toast } from 'sonner';
import { User } from '@/lib/interfaces/user';

function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutationLoading, setMutationLoading] = useState(false);
  const router = useRouter();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await fetch('/api/users');

      if (response.status === 403) {
        router.replace('/'); // o /login o donde quieras
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
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
      setMutationLoading(true);
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 403) {
        router.replace('/');
        return;
      }
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      toast('El usuario fue eliminado con éxito.', {
        description: `El usuario ${userToDelete?.name || ''} fue eliminado con éxito.`,
      });

      // Refresh the user list
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast('Error al eliminar el usuario.', {
        description: 'Ocurrió un error al eliminar el usuario.',
      });
    } finally {
      setMutationLoading(false);
    }
  }

  if (loading || mutationLoading) {
    return (
      <div className='flex items-center justify-center'>
        <ReactLoading
          type='bubbles'
          color='#3B82F6'
          height={'20%'}
          width={'20%'}
        />
      </div>
    );
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
            {users.map((user) => (
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
