import { createContext, useContext, type ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEY } from "../utils/constants";
import { generateId, getCurrentDate } from "../utils/formatters";


interface TransactionContextType{
	transactions: Transaction[];
	addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
	updateTransaction: (id:string, transaction:Partial<Transaction>) => void;
	deleteTransaction: (id:string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined> (undefined);

export function TransactionProvider({ children }: {children:ReactNode}) {
	const [transactions, setTransactions] = useLocalStorage<Transaction[]> (STORAGE_KEY, []);

	const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
		const newTransaction: Transaction = {
			...transaction,
			id:generateId(),
			createdAt: getCurrentDate(),
		};

		setTransactions((prev) => [...prev, newTransaction]);
	};

	const updateTransaction = (id:string, updatedFields: Partial<Transaction>) => {
		setTransactions((prev) => 
			prev.map((transaction) => 
				transaction.id === id
					? {...transaction, ...updatedFields}
					: transaction
			)
		);
	};

	const deleteTransaction = (id:string) => {
		setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
	};

	const value = {
		transactions,
		addTransaction,
		updateTransaction,
		deleteTransaction,
	};

	return (
		<TransactionContext.Provider value={value}>
			{children}
		</TransactionContext.Provider>
	);
}

export function useTransaction() {
	const context = useContext(TransactionContext);

	if(context === undefined) 
		throw new Error('useTransaction deve essere usato dentro TransactionProvider');

	return context;

}