import { api } from './axios';
import { Transaction } from '@/lib/transactions/transaction.interface';
import {
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from '@/lib/transactions/transaction.requests';

export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await api.get('/transactions');
    return data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  },

  create: async (payload: CreateTransactionRequest): Promise<Transaction> => {
    const { data } = await api.post('/transactions', payload);
    return data;
  },

  update: async (
    id: string,
    payload: UpdateTransactionRequest
  ): Promise<Transaction> => {
    const { data } = await api.put(`/transactions/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },
};
