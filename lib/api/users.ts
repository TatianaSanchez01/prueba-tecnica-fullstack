import { api } from './axios';
import { User, CreateUserRequest, UpdateUserRequest } from '@/lib/interfaces/user';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  create: async (payload: CreateUserRequest): Promise<User> => {
    const { data } = await api.post('/users', payload);
    return data;
  },

  update: async (id: string, payload: UpdateUserRequest): Promise<User> => {
    const { data } = await api.put(`/users/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
