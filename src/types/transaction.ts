export type TransactionType = 'income' | 'expense';

export interface Transaction {
	id:string,
	type: TransactionType;
	amount:number;
	category:string;
	description: string;
	date: string;
	createdAt:string;
}

export interface TransactionFilters{
	type?:TransactionType;
	category?:string;
	dateFrom?:string;
	dateTo?:string;
	searchTerm?:string;
}

export interface TransactionSummary {
	totalIncome: number;
	totalExpense: number;
	balance:number;
	transactionCount:number;
}