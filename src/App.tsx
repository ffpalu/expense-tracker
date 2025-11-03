import { useTransaction } from "./context/TransactionContext"
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import { useState } from "react";
import { useFilters } from "./hooks/useFilters";
import TransactionFilters from "./components/transactions/TransactionFilters";
import Summary from "./components/dashboard/Summary";
import RecentTransactions from "./components/dashboard/RecentTransactions";
import Charts from "./components/dashboard/Charts";
import type { Transaction } from "./types/transaction";
import ThemeToggle from "./components/common/ThemeToggle";
import ExportButton from "./components/common/ExportButton";


function App() {

	const { transactions, addTransaction, deleteTransaction, updateTransaction } = useTransaction();
	const [showForm, setShowForm] = useState(false);
	const [editingTransaction, setEditingTransaction] = useState<Transaction | null> (null);
	const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');

	const {
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
		resetFilters
	} = useFilters(transactions);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">

			<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 mb-6 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">💰 Budget Tracker</h1>
							<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">Monitora le tue finanze personali</p>
						</div>
						<div className="flex items-center gap-3 w-full sm:w-auto">
							<ThemeToggle />
							<ExportButton transactions={transactions} />
							<button
								onClick={() => {
									setEditingTransaction(null);
									setShowForm(!showForm);
								}}
								className="flex-1 sm:flex-initial bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-sm active:scale-95"
							>
								{(showForm || editingTransaction) ? '❌ Chiudi' : '➕ Nuova'}
							</button>
						</div>
					</div>
				</div>
			</header>


			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
				<div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
					<button 
						onClick={() => setActiveTab('dashboard')}
						className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
							activeTab ==='dashboard'
								? 'border-blue-600 text-blue-600 dark:text-blue-400'
								: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
							
						}`}
					>
						📊 Dashboard
					</button>
					<button
					onClick={() => setActiveTab('transactions')}
					className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
							activeTab === 'transactions'
								? 'border-blue-600 text-blue-600 dark:text-blue-400'
								: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
						}`}
					>
						💳 Transazioni
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{(showForm || editingTransaction) && (
					<div className="mb-6 animate-slideIn">
						<TransactionForm
							initialData={editingTransaction || undefined}
							onSubmit={(data) =>{
								if(editingTransaction) {
									updateTransaction(editingTransaction.id, data);
									setEditingTransaction(null);
								}
								else{
									addTransaction(data)
								}
								setShowForm(false);
							}}
							onCancel={() => {
								setShowForm(false);
								setEditingTransaction(null);
							}}
						/>
					</div>
				)}


				{activeTab === 'dashboard' ? (
					<>
						<Summary />
						<RecentTransactions limit={10} />
						<div className="mt-6">
							<Charts></Charts>
						</div>
					</>
				) : (
					<>
						<TransactionFilters
							typeFilter={typeFilter}
							categoryFilter={categoryFilter}
							dateFromFilter={dateFromFilter}
							dateToFilter={dateToFilter}
							searchTerm={searchTerm}
							onTypeChange={setTypeFilter}
							onCategoryChange={setCategoryFilter}
							onDateFromChange={setDateFromFilter}
							onDateToChange={setDateToFilter}
							onSearchChange={setSearchTerm}
							onReset={resetFilters}
							filteredTransactions={filteredTransactions}
						/>

						<TransactionList
							transactions={filteredTransactions}
							onEdit={(transaction) => {
								setEditingTransaction(transaction);
								setShowForm(false);

								window.scrollTo({top:0, behavior: 'smooth'})
							}}
							onDelete={deleteTransaction}
						/>
					</>
				)}



			</div>
		


			
		</div>
  );

}

export default App