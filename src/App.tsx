import { useTransaction } from "./context/TransactionContext"
import TransactionForm from "./components/transactions/TransactionForm";
import { useState } from "react";

function App() {

	const { transactions, addTransaction } = useTransaction();
	const [showForm, setShowForm] = useState(false);

  return (
		<div className="min-h-screen bg-gray-50 flex p-8">
			<div className="max-w-2xl mx-auto">
				{showForm && (
					<TransactionForm
						onSubmit={(data) => {
							addTransaction(data);
							alert('Transazione salvata!');
							setShowForm(false)
						}}
						onCancel={() => setShowForm(false)}
					/>
				)}


				{!showForm && (
					<div className="bg-white p-8 rounded-lg shadow">
						<h2 className="text-2xl font-bold mb-4">Transazioni Salvate: {transactions.length}</h2>
						<button
							onClick={() => setShowForm(true)}
							className="bg-blue-600 text-white px-4 py-2 rounded-lg"
						>
							➕ Nuova Transazione
						</button>

						{transactions.length > 0 && (
							<div className="mt-4 space-y-2">
								{transactions.slice(-5).reverse().map(t => (
									<div key={t.id} className="p-3 bg-gray-50 rounded">
										<p className="font-semibold">{t.description}</p>
										<p className="text-sm text-gray-600">
											{t.type === 'income' ?  '📈' : '📉'} € {t.amount} - {t.category}
										</p>
									</div>
								))}	
							</div>
						)}

					</div>
				)}




			</div>
		</div>
	)
}

export default App