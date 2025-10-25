import { useTransaction } from "./context/TransactionContext"

function App() {

	const { transactions, addTransaction } = useTransaction();


	const handleTest = () => {
		addTransaction({
			type: 'expense',
			amount: 25,
			category: 'food',
			description: 'Test Pizza',
			date: '2024-10-24'
		});
	};

  return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
				<h1 className="text-3xl font-bold text-blue-600 mb-4">
					Context funziona!
				</h1>

				<p className="text-gray-600 mb-4">
					Transazioni salvate: <strong>{transactions.length}</strong>
				</p>

				<button
					onClick={handleTest}
					className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
					>
						Aggiungi Transazione Test
					</button>

					<div className="mt-4 text-sm text-gray-500">
						{transactions.length > 0 && (
							<div>
								<p className="font-semibold">Ultime transazioni:</p>
								{transactions.slice(-3).map(t=> (
									<p key={t.id}> {t.description} - {t.amount}</p>
								))}
							</div>
						)}
					</div>
			</div>
		</div>
	)
}

export default App