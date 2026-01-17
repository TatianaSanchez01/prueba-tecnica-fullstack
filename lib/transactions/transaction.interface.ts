export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  userId: string;
  user: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
