import type { Transaction } from "../types/transaction";
import { CATEGORY_MAP } from "./constants";


export function exportToCSV(transactions: Transaction[], filename = 'transazioni'): void {
	if(transactions.length === 0) {
		alert('Nessuna transazione da esportare!');
		return;
	}

	const headers = [
		'ID',
		'Data',
		'Tipo',
		'Categoria',
		'Descrizione',
		'Importo',
		'Data Creazione'
	];


	const rows = transactions.map(transaction => {
		const categoryName = CATEGORY_MAP[transaction.category]?.name || transaction.category;

		return [
			transaction.id,
			transaction.date,
			transaction.type === 'income' ? 'Entrata' : 'Uscite',
			categoryName,
			`"${transaction.description.replace(/"/g, '""')}"`,
			transaction.amount.toFixed(2),
			transaction.createdAt
		];
	});

	const csvContent = [
		headers.join(','),
		...rows.map(row => row.join(','))
	].join('\n')

	const BOM = '\uFEFF';
	const blob = new Blob([BOM + csvContent], { type: 'text/csv; charset=utf-8;'});

	downloadFile(blob, `${filename}_${getTimestamp()}.csv`);
}

export function exportToJSON(transactions: Transaction[], filename='transazioni' ): void {
	if(transactions.length === 0) {
		alert('Nessuna transazione da esportare!');
		return;
	}

	const exportData = { 
		exportDate: new Date().toISOString(),
		transactionCount: transactions.length,
		transactions: transactions.map(transaction =>( {
			...transaction,
			categoryName: CATEGORY_MAP[transaction.category]?.name || transaction.category,
			typeLabel: transaction.type === 'income' ? 'Entrata' : 'Uscita'
		}))
	};

	const jsonString = JSON.stringify(exportData, null, 2);
	const blob = new Blob([jsonString], {type: 'application/json'});

	downloadFile(blob,  `${filename}_${getTimestamp()}.json`)
}


export function exportSummaryToJSON(
	transactions: Transaction[],
	summary: {totalIncome: number; totalExpense: number; balance: number},
	filename = 'statistiche'
): void {
	const exportData = {
		exportDate: new Date().toISOString(),
		period: {
			from: transactions.length > 0
				? transactions.reduce((min, t) => t.date < min ? t.date: min, transactions[0].date)
				: null,
			to: transactions.length > 0
				? transactions.reduce((max, t) => t.date > max ? t.date: max, transactions[0].date)
				: null
		},
		summary: {
			totalIncome: summary.totalIncome,
			totalExpense: summary.totalExpense,
			balance: summary.balance,
			transactionCount: transactions.length,
			incomeTransactions: transactions.filter(t => t.type === 'income').length,
			expenseTransactions: transactions.filter(t => t.type === 'expense').length
		},
		transactions
	}

	const jsonString = JSON.stringify(exportData.exportDate, null, 2);
	const blob = new Blob([jsonString], {type: 'application/json'})

	downloadFile(blob, `${filename}_${getTimestamp()}.json`)
}



function downloadFile(blob: Blob, filename: string): void {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
}


function getTimestamp(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2,'0');
	const hours = String(now.getHours()).padStart(2,'0');
	const minutes = String(now.getMinutes()).padStart(2, '0');

	return `${year}${month}${day}_${hours}${minutes}`;
}