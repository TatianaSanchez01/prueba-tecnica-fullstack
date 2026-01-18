import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { usersApi } from '@/lib/api/users.api';
import Loading from '@/components/atoms/Loading';
import ForbiddenMessage from '@/components/atoms/ForbiddenMessage';
import { getUserRole } from '@/lib/auth/auth.helpers';
import { Role } from '@/lib/auth/role.enum';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
});

const Index = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const isNewUser = id === 'new';

  const { data: session, isPending: status } = authClient.useSession();
  const role = getUserRole(session);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: Role.ADMIN,
    },
  });

  // Fetch user data if editing
  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, [id, isNewUser]);

  async function fetchUser() {
    try {
      setLoading(true);
      const user = await usersApi.getById(id);
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      toast('Error al cargar usuario.', {
        description: 'Ocurrió un error al cargar los datos del usuario.',
      });
      router.push('/usuarios');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      if (isNewUser) {
        // Create new user
        await usersApi.create({
          name: values.name,
          email: values.email!,
          role: values.role as Role,
        });

        toast('Usuario creado con éxito.', {
          description: `El usuario ${values.name} ha sido creado correctamente.`,
        });
      } else {
        // Update existing user
        await usersApi.update(id, {
          name: values.name,
          role: values.role as Role,
        });

        toast('Usuario actualizado con éxito.', {
          description: `El usuario ${values.name} ha sido actualizado correctamente.`,
        });
      }

      router.push('/usuarios');
    } catch (error) {
      console.error('Error saving user:', error);
      toast('Error al guardar usuario.', {
        description: 'Ocurrió un error al guardar el usuario.',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleRedirect = () => {
    router.push('/usuarios');
  };

  if (status || loading) return <Loading />;

  if (role !== 'ADMIN') {
    return <ForbiddenMessage />;
  }

  return (
    <div className='flex gap-5'>
      <Card className='w-full h-fit bg-white shadow-lg rounded-lg border border-gray-200'>
        <CardHeader className=' px-6 py-5'>
          <CardTitle className='text-xl font-bold text-gray-800'>
            {isNewUser ? 'Agregar un nuevo usuario' : 'Editar usuario'}
          </CardTitle>
        </CardHeader>
        <CardContent className='px-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {/* Name Field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Field (only for new users) */}
              {isNewUser && (
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Role Field */}
              {!isNewUser && (
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rol</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Seleccione un rol' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='USER'>Usuario</SelectItem>
                              <SelectItem value='ADMIN'>
                                Administrador
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className='flex justify-end gap-5'>
                <Button
                  type='submit'
                  className='px-6 py-2 font-medium rounded-md shadow'
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button
                  variant='outline'
                  type='button'
                  onClick={handleRedirect}
                  disabled={loading}
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
