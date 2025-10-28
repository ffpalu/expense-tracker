import { useTransaction } from "../../context/TransactionContext";
import { sortByDate } from "../../utils/calculations";
import { CATEGORY_MAP } from "../../utils/constants";
import { formatCurrency, formatDate } from "../../utils/formatters";



interface RecentTransactionsProps  {
	limit?:number;
}

function RecentTransactions ( { limit = 5 }: RecentTransactionsProps) {
	const { transactions } = useTransaction();

	const recentTransactions = sortByDate(transactions).slice(0,limit);


	if(transactions.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
				<div className="text-5xl mb-3">📭</div>
				<p className="text-gray-600">Nessuna transazione recente</p>
			</div>
		);
	}


	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h2 className="text-xs font-bold text-gray-900">
					📋 Ultime Transazioni
				</h2>
			</div>

			<div className="divide-y divide-gray-200">
				{recentTransactions.map((transaction) => {
					const category = CATEGORY_MAP[transaction.category];
					const isIncome = transaction.type === 'income';


					return (
						<div 
							key={transaction.id}
							className="p-4 hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
										style={{backgroundColor: `${category.color}20`}}
									>
										{category?.icon || '📦'}
									</div>


									<div>
										<p className="font-semibold text-gray-900">
											{transaction.description}
										</p>
										<p className="text-sm text-gray-500">
											{category?.name} • {formatDate(transaction.date)}
										</p>
									</div>
								</div>


								<div
									className={`text-lg font-bold ${
											isIncome? 'text-green-600' : 'text-red-600'
										}`}
								>
									{isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
								</div>


							</div>
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default RecentTransactions;