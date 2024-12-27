import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { FinancialOverview as FinancialOverviewType } from '../types';
import { Modal } from './Modal';
import { IncomeGraph } from './graphs/IncomeGraph';
import { ExpensesGraph } from './graphs/ExpensesGraph';
import { BalanceGraph } from './graphs/BalanceGraph';

interface FinancialOverviewProps {
  overview: FinancialOverviewType;
  transactions: Array<{ date: string; amount: number }>;
}

export function FinancialOverview({ overview, transactions }: FinancialOverviewProps) {
  const [activeGraph, setActiveGraph] = useState<'income' | 'expenses' | 'balance' | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveGraph('income')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D2B1E] rounded-full">
              <TrendingUp className="w-6 h-6 text-[#FBFF7A]" />
            </div>
            <div>
              <p className="text-sm text-[#2D2B1E]">Total Income</p>
              <p className="text-xl font-semibold text-[#2D2B1E]">
                ${overview.totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveGraph('expenses')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D2B1E] rounded-full">
              <TrendingDown className="w-6 h-6 text-[#FBFF7A]" />
            </div>
            <div>
              <p className="text-sm text-[#2D2B1E]">Total Expenses</p>
              <p className="text-xl font-semibold text-[#2D2B1E]">
                ${Math.abs(overview.totalExpenses).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setActiveGraph('balance')}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D2B1E] rounded-full">
              <Wallet className="w-6 h-6 text-[#FBFF7A]" />
            </div>
            <div>
              <p className="text-sm text-[#2D2B1E]">Current Balance</p>
              <p className="text-xl font-semibold text-[#2D2B1E]">
                ${overview.balance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={activeGraph !== null}
        onClose={() => setActiveGraph(null)}
        title={activeGraph ? `${activeGraph.charAt(0).toUpperCase() + activeGraph.slice(1)} Over Time` : ''}
      >
        <div className="bg-white p-4 rounded-lg">
          {activeGraph === 'income' && <IncomeGraph transactions={transactions} />}
          {activeGraph === 'expenses' && <ExpensesGraph transactions={transactions} />}
          {activeGraph === 'balance' && <BalanceGraph transactions={transactions} />}
        </div>
      </Modal>
    </>
  );
}