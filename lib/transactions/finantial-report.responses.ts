export interface FinancialReportResponse {
  transactions: Array<{
    amount: number;
    description: string;
    date: string;
    user: {
      name: string;
    };
  }>;
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}
