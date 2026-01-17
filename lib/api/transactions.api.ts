import { api } from './axios';
import { Transaction } from '@/lib/transactions/transaction.interface';
import { CreateTransactionRequest } from '@/lib/transactions/transaction.requests';

export const transactionsApi = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await api.get('/transactions');
    return data;
  },
  create: async (payload: CreateTransactionRequest): Promise<Transaction> => {
    const { data } = await api.post('/transactions', payload);
    return data;
  },
};
