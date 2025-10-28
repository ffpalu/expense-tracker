import { useTransaction } from "../../context/TransactionContext";
import { calculateSummary } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";


function Summary() {
	const { transactions } = useTransaction(); 

	const summary = calculateSummary(transactions);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
			<div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-6 text-white">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium opacity-90">Saldo Totale</h3>
					<div className="text-3xl">💰</div>
				</div>
				<p className="text-3xl font-bold mb-1">
					{formatCurrency(summary.balance)}
				</p>
				<p className="text-sm opacity-75">
					{transactions.length} transazioni
				</p>
			</div>

			<div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg p-6 text-white">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium opacity-90">Totale Entrate</h3>
					<div className="text-3xl">📈</div>
				</div>
				<p className="text-3xl font-bold mb-1">
					{formatCurrency(summary.totalIncome)}
				</p>
				<p className="text-sm opacity-75">
					Denaro ricevuto
				</p>
			</div>

			<div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-lg p-6 text-white">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-sm font-medium opacity-90">Totale Uscite</h3>
					<div className="text-3xl">📉</div>
				</div>
				<p className="text-3xl font-bold mb-1">
					{formatCurrency(summary.totalExpense)}
				</p>
				<p className="text-sm opacity-75">
					Denaro speso
				</p>
			</div>
		</div>
	);
}

export default Summary;