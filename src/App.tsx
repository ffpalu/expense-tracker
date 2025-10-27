import { useTransaction } from "./context/TransactionContext"
import TransactionForm from "./components/transactions/TransactionForm";
import TransactionList from "./components/transactions/TransactionList";
import { useState } from "react";
import { useFilters } from "./hooks/useFilters";
import TransactionFilters from "./components/transactions/TransactionFilters";

function App() {

	const { transactions, addTransaction, deleteTransaction } = useTransaction();
	const [showForm, setShowForm] = useState(false);

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
    <div className="min-h-screen bg-gray-50 p-8">
       <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">💰 Budget Tracker</h1>
            <p className="text-gray-600 mt-1">
              {filteredTransactions.length} di {transactions.length} transazioni
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-sm"
          >
            {showForm ? '❌ Chiudi Form' : '➕ Nuova Transazione'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <TransactionForm
              onSubmit={(data) => {
                addTransaction(data);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

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
          transactions={transactions}
          onEdit={(transaction) => {
            console.log('Modifica:', transaction);
            // TODO: Futura implementazione...
          }}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );

}

export default App