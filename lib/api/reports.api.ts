import { api } from './axios';
import { FinancialReportResponse } from '@/lib/transactions/financial-report.responses';

export const reportsApi = {
  getFinancialReport: async (): Promise<FinancialReportResponse> => {
    const { data } = await api.get('/financial-report');
    return data;
  },
};
