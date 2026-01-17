/**
 * @jest-environment node
 */

describe('Financial Report Calculations', () => {
  describe('Transaction aggregation', () => {
    it('should calculate total balance correctly', () => {
      const transactions = [
        { amount: 1000, description: 'Salary', date: '2026-01-01' },
        { amount: -200, description: 'Groceries', date: '2026-01-02' },
        { amount: 500, description: 'Bonus', date: '2026-01-03' },
        { amount: -100, description: 'Transport', date: '2026-01-04' },
      ];

      const totalBalance = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      expect(totalBalance).toBe(1200);
    });

    it('should calculate total income correctly', () => {
      const transactions = [
        { amount: 1000, description: 'Salary', date: '2026-01-01' },
        { amount: -200, description: 'Groceries', date: '2026-01-02' },
        { amount: 500, description: 'Bonus', date: '2026-01-03' },
        { amount: -100, description: 'Transport', date: '2026-01-04' },
      ];

      const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      expect(totalIncome).toBe(1500);
    });

    it('should calculate total expenses correctly', () => {
      const transactions = [
        { amount: 1000, description: 'Salary', date: '2026-01-01' },
        { amount: -200, description: 'Groceries', date: '2026-01-02' },
        { amount: 500, description: 'Bonus', date: '2026-01-03' },
        { amount: -100, description: 'Transport', date: '2026-01-04' },
      ];

      const totalExpenses = Math.abs(
        transactions
          .filter((t) => t.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      );

      expect(totalExpenses).toBe(300);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty transaction list', () => {
      const transactions: any[] = [];

      const totalBalance = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      expect(totalBalance).toBe(0);
    });

    it('should handle only income transactions', () => {
      const transactions = [
        { amount: 1000, description: 'Salary', date: '2026-01-01' },
        { amount: 500, description: 'Bonus', date: '2026-01-03' },
      ];

      const totalExpenses = Math.abs(
        transactions
          .filter((t) => t.amount < 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      );

      expect(totalExpenses).toBe(0);
    });

    it('should handle only expense transactions', () => {
      const transactions = [
        { amount: -200, description: 'Groceries', date: '2026-01-02' },
        { amount: -100, description: 'Transport', date: '2026-01-04' },
      ];

      const totalIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      expect(totalIncome).toBe(0);
    });
  });
});
