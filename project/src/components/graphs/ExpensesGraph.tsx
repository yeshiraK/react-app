import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';
import { groupTransactionsByDate } from '../../utils/transactions';

interface ExpensesGraphProps {
  transactions: Transaction[];
}

export function ExpensesGraph({ transactions }: ExpensesGraphProps) {
  const data = groupTransactionsByDate(transactions.filter(t => t.amount < 0));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Math.abs(Number(value)).toFixed(2)}`} />
          <Area type="monotone" dataKey="amount" stroke="#dc2626" fill="#fca5a5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}