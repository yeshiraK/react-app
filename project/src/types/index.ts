export type TransactionCategory = 'Business' | 'Personal' | 'Travel' | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  type: 'income' | 'expense';
  date: string;
}

export interface FinancialOverview {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}