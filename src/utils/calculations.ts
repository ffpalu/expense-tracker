import type { Transaction, TransactionSummary } from "../types/transaction";


export const calculateSummary = (transactions:Transaction[]):TransactionSummary =>{
	const summary = transactions.reduce(
		(acc, transaction) => {
			if(transaction.type === 'income') {
				acc.totalIncome += transaction.amount;
			} else {
				acc.totalExpense += transaction.amount
			}
			return acc;
		},
		{totalIncome: 0, totalExpense: 0, balance: 0, transactionCount: 0}
	);

	summary.balance = summary.totalIncome - summary.totalExpense;
	summary.transactionCount = transactions.length;

	return summary;
}


export const groupByCategory = (transactions: Transaction[]) => {
	return transactions.reduce(
		(acc, transaction) => {
			const category = transaction.category
			if(!acc[category]) {
				acc[category] = {
					category,
					total: 0,
					count: 0,
					transactions: []
				};
			}
			acc[category].total += transaction.amount;
			acc[category].count += 1;
			acc[category].transactions.push(transaction)
			return acc;
		}, {} as Record<string, {category: string; total: number; count: number; transactions: Transaction[]}>
	);
};

export const sortByDate = (transactions: Transaction[]): Transaction[] => {
	return [...transactions].sort((a,b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
};