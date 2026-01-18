export interface CreateTransactionRequest {
  amount: number;
  description: string;
  date: string;
}

export interface UpdateTransactionRequest {
  amount?: number;
  description?: string;
  date?: string;
}
