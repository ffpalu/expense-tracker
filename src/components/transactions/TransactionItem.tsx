import type { Transaction } from "../../types/transaction";
import { CATEGORY_MAP } from "../../utils/constants";
import { formatDate, formatCurrency } from "../../utils/formatters";

interface TransactionItemProps{
	transaction: Transaction;
	onEdit: (transaction: Transaction) => void;
	onDelete: (id: string) => void;
}

function TransactionItem({transaction, onEdit, onDelete}: TransactionItemProps) {
	const category = CATEGORY_MAP[transaction.category];
	const isIncome = transaction.type === 'income';


	return (
		<div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3 flex-1">
					<div
						className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
						style={{ backgroundColor: `${category?.color}20` }}
					>
						{category?.icon || '📦'}
					</div>

					<div className="flex-1">
						<h3 className="font-semibold text-gray-900 text-lg">
							{transaction.description}
						</h3>
						<p className="text-sm text-gray-500 mt-1">
							{category?.name || transaction.category} • {formatDate(transaction.date)}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className={`text-xl font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
						{isIncome ? '+': '-'} {formatCurrency(transaction.amount)}
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => onEdit(transaction)}
							className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
							title="Modifica"
						>
							✏️
						</button>
						<button
							onClick={() => {
								if(window.confirm('Sei sicuro di voler eliminare questa transazione?')) {
									onDelete(transaction.id);
								}
							}}
							className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
							title="Elimina"
						>
							🗑️
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default TransactionItem;