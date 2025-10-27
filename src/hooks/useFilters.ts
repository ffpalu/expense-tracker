import { useState, useMemo } from "react";
import type { Transaction, TransactionType } from "../types/transaction";


export function useFilters(transactions: Transaction[]) {
	const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all');
	const [categoryFilter, setCategoryFilter] = useState('');
	const [dateFromFilter, setDateFromFilter] = useState('');
	const [dateToFilter, setDateToFilter] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const filteredTransactions = useMemo(() => {
		return transactions.filter((transaction) => {
			
			if(typeFilter !== 'all' && transaction.type !== typeFilter)
				return false;

			if (categoryFilter && transaction.category !== categoryFilter)
					return false;

			if (dateFromFilter && transaction.date < dateFromFilter)
				return false;

			if (dateToFilter && transaction.date > dateToFilter)
				return false;

			if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()))
				return false;

			return true;

		})
	} ,[transactions, typeFilter, categoryFilter, dateFromFilter, dateToFilter, searchTerm])


	const resetFilters = () => {
		setTypeFilter('all');
		setCategoryFilter('');
		setDateFromFilter('');
		setDateToFilter('');
		setSearchTerm('');
	}

	return {
		typeFilter,
		categoryFilter,
		dateFromFilter,
		dateToFilter,
		searchTerm,
		filteredTransactions,

		setTypeFilter,
		setCategoryFilter,
		setDateFromFilter,
		setDateToFilter,
		setSearchTerm,
		resetFilters,

	};
}