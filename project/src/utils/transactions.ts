interface GroupedData {
  date: string;
  amount: number;
}

export function groupTransactionsByDate(transactions: Array<{ date: string; amount: number }>): GroupedData[] {
  const grouped = transactions.reduce((acc: { [key: string]: number }, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + transaction.amount;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}