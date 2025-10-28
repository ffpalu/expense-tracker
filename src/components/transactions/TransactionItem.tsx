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
		<div className="bg-white border border-gray-200 rounded-lg p-4 hover-lift transition-all animate-fadeIn">
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
				{/* SINISTRA: Info transazione */}
				<div className="flex items-start gap-3 flex-1">
					{/* Icona categoria */}
					<div
						className="text-2xl sm:text-3xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg flex-shrink-0"
						style={{ backgroundColor: `${category?.color}20` }}
					>
						{category?.icon || '📦'}
					</div>

					{/* Dettagli */}
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
							{transaction.description}
						</h3>
						<p className="text-xs sm:text-sm text-gray-500 mt-1">
							{category?.name || transaction.category} • {formatDate(transaction.date)}
						</p>
					</div>
				</div>

				{/* DESTRA: Importo e azioni */}
				<div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
					{/* Importo */}
					<div className={`text-lg sm:text-xl font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
						{isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
					</div>

					{/* Bottoni azione */}
					<div className="flex gap-2 flex-shrink-0">
						<button
							onClick={() => onEdit(transaction)}
							className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-95"
							title="Modifica"
						>
							✏️
						</button>
						<button
							onClick={() => {
								if (window.confirm('Sei sicuro di voler eliminare questa transazione?')) {
									onDelete(transaction.id);
								}
							}}
							className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-95"
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