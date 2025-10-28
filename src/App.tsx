import { useTransaction } from "./context/TransactionContext"
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import { useState } from "react";
import { useFilters } from "./hooks/useFilters";
import TransactionFilters from "./components/transactions/TransactionFilters";
import Summary from "./components/dashboard/Summary";
import RecentTransactions from "./components/dashboard/RecentTransactions";
import Charts from "./components/dashboard/Charts";

function App() {

	const { transactions, addTransaction, deleteTransaction } = useTransaction();
	const [showForm, setShowForm] = useState(false);
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
    <div className="min-h-screen bg-gray-50">

			<header className="bg-white shadow-sm border-b border-gray-200 mb-6">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">💰 Budget Tracker</h1>
							<p className=" text-gray-600 mt-1"> Monitora le tue finanze personali</p>
						</div>
						<button
							onClick={() => setShowForm(!showForm)}
							className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-sm"
						>
							{showForm ? '❌ Chiudi' : '➕ Nuova Transazione'}
						</button>
					</div>
				</div>
			</header>


			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
				<div className="flex gap-2 border-b border-gray-200">
					<button 
						onClick={() => setActiveTab('dashboard')}
						className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
							activeTab ==='dashboard'
								? 'border-blue-600 text-blue-600'
								: 'border-transparent text-gray-600 hover:text-gray-900'
							
						}`}
					>
						📊 Dashboard
					</button>
					<button
					onClick={() => setActiveTab('transactions')}
					className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
							activeTab === 'transactions'
								? 'border-blue-600 text-blue-600'
								: 'border-transparent text-gray-600 hover:text-gray-900'
						}`}
					>
						💳 Transazioni
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
				{showForm &&(
					<div className="mb-6">
						<TransactionForm
							onSubmit={(data) =>{
								addTransaction(data);
								setShowForm(false);
							}}
							onCancel={() => setShowForm(false)}
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
						/>

						<TransactionList
							transactions={filteredTransactions}
							onEdit={(transaction) => {
								console.log('Modifica:', transaction);
								// TODO: Futura implementazione...
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