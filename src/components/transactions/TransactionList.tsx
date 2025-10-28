import type { Transaction } from "../../types/transaction";
import { sortByDate } from "../../utils/calculations";
import TransactionItem from "./TransactionItem";

interface TransactionListProps {
	transactions: Transaction[]
	onEdit: (transaction: Transaction) => void;
	onDelete: (id:string) => void;
}


function TransactionList ({transactions, onEdit, onDelete}: TransactionListProps) {
	const sortedTransactions = sortByDate(transactions);

	if(transactions.length === 0) {
		return(
			<div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
				<div className="text-6xl mb-4">📭</div>
				<h3 className="text-xl font-semibold text-gray-700 mb-2">
					Nessuna transazione
				</h3>
				<p className="text-gray-500">
					Aggiungi la tua prima transazione per iniziare a tracciare le tue finanze!
				</p>
			</div>
		);
	}



	return (
		<div className="space-y-3">
			{sortedTransactions.map((transaction, index) => (
				<div
					key={transaction.id}
					style={{
						animationDelay: `${index * 0.5}s`,
						animationFillMode: 'both'
					}}	
					className="animate-fadeIn"
				>
						<TransactionItem
							transaction={transaction}
							onEdit={onEdit}
							onDelete={onDelete}
							/>
				</div>
			))}
		</div>
	)
}


export default TransactionList;