import type { Transaction, TransactionType } from "../../types/transaction";
import { ALL_CATEGORIES } from "../../utils/constants";
import ExportButton from "../common/ExportButton";


interface TransactionFiltersProps {
	typeFilter: TransactionType | 'all';
	categoryFilter: string;
	dateFromFilter: string;
	dateToFilter: string;
	searchTerm: string;
	onTypeChange: (type: TransactionType | 'all') => void;
	onCategoryChange: (category: string) => void;
	onDateFromChange: (date: string) => void; 
	onDateToChange: (date: string) => void;
	onSearchChange: (term: string) => void;
	onReset: () => void;
	filteredTransactions?:Transaction[];
}

function TransactionFilters ({
	typeFilter,
	categoryFilter,
	dateFromFilter,
	dateToFilter,
	searchTerm,
	onTypeChange,
	onCategoryChange,
	onDateFromChange,
	onDateToChange,
	onSearchChange,
	onReset,
	filteredTransactions
}: TransactionFiltersProps) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔍 Filtri</h3>
				<div className="flex items-center gap-2">
					{filteredTransactions && (
						<ExportButton transactions={filteredTransactions} />
					)}
					<button
						onClick={onReset}
						className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
					>
						↺ Reset Filtri
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Tipo
					</label>

					<select
						value={typeFilter}
						onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
						className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="all">Tutte</option>
						<option value="income">📈 Entrate</option>
						<option value="expense">📉 Uscite</option>
					</select>
				</div>
			</div>


			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Categoria
				</label>
				<select
					value={categoryFilter}
					onChange={(e) => onCategoryChange(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value=""> Tutte le categorie</option>
					{ALL_CATEGORIES.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			</div>
			
			
			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Data Da
				</label>
				<input
					type="date"
					value={dateFromFilter}
					onChange={(e) => onDateFromChange(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Data A
				</label>
				<input
					type="date"
					value={dateToFilter}
					onChange={(e) => onDateToChange(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>


			<div className="md:col-span-2 lg:col-span-1">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Cerca
				</label>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Cerca per descrizione..."
					className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
				/>
			</div>

		</div>
	);
}

export default TransactionFilters;