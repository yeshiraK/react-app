import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Transaction, TransactionCategory } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories: TransactionCategory[] = ['Business', 'Personal', 'Travel', 'Other'];

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Business');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAddTransaction({
      amount: parseFloat(amount) * (type === 'expense' ? -1 : 1),
      description,
      category,
      type,
      date: new Date().toISOString(),
    });

    setAmount('');
    setDescription('');
    setCategory('Business');
    setType('income');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#2D2B1E]">Add Transaction</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#2D2B1E]">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#2D2B1E] bg-white shadow-sm focus:border-[#2D2B1E] focus:ring-[#2D2B1E]"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#2D2B1E]">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
              className="mt-1 block w-full rounded-md border-[#2D2B1E] bg-white shadow-sm focus:border-[#2D2B1E] focus:ring-[#2D2B1E]"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2D2B1E]">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-[#2D2B1E] bg-white shadow-sm focus:border-[#2D2B1E] focus:ring-[#2D2B1E]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2D2B1E]">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="mt-1 block w-full rounded-md border-[#2D2B1E] bg-white shadow-sm focus:border-[#2D2B1E] focus:ring-[#2D2B1E]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#2D2B1E] text-[#FBFF7A] px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          <PlusCircle size={20} />
          Add Transaction
        </button>
      </div>
    </form>
  );
}