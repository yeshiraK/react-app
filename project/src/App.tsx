import React, { useState, useEffect } from 'react';
import { BarChart } from 'lucide-react';
import { Transaction, FinancialOverview } from './types';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialOverview as FinancialOverviewComponent } from './components/FinancialOverview';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [overview, setOverview] = useState<FinancialOverview>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));

    const newOverview = transactions.reduce(
      (acc, transaction) => {
        if (transaction.amount >= 0) {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpenses += transaction.amount;
        }
        acc.balance = acc.totalIncome + acc.totalExpenses;
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0, balance: 0 }
    );

    setOverview(newOverview);
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <BarChart className="w-8 h-8 text-[#2D2B1E]" />
          <h1 className="text-3xl font-bold text-[#2D2B1E]">
            Freelance Finance Tracker
          </h1>
        </div>

        <div className="mb-8">
          <FinancialOverviewComponent overview={overview} transactions={transactions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-[#2D2B1E]">
              Recent Transactions
            </h2>
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}