import React, { useState } from "react";
import type { Transaction, TransactionType } from "../../types/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../utils/constants";


interface TransactionFormProps {
	onSubmit: (data: {
		type: TransactionType;
		amount: number;
		category: string;
		description: string;
		date: string;
	}) => void;
	onCancel: () => void;
	initialData?: Transaction
}

function TransactionForm ({onSubmit, onCancel, initialData}: TransactionFormProps) {
	const [type, setType] = useState<TransactionType> (initialData?.type || 'expense');
	const [amount, setAmount] = useState(initialData?.amount.toString() || '');
	const [category, setCategory] = useState(initialData?.category || '');
	const [description, setDescription] = useState(initialData?.description || '')
	const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);

	const handleSubmit = (e:React.FormEvent) => {
		e.preventDefault();

		if(!amount || parseFloat(amount) <= 0) {
			alert('Inserisci un importo valido!');
			return;
		}

		if(!category) {
			alert('Seleziona una categoria!');
			return;
		}

		if(!description.trim()) {
			alert('Inserisci una descrizione!');
			return;
		}

		onSubmit({
			type,
			amount: parseFloat(amount),
			category,
			description: description.trim(),
			date
		});


		setAmount('');
		setCategory('');
		setDescription('');
		setDate(new Date().toISOString().split('T')[0]); 

	}

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg p-6">
			<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
				{initialData ? '✏️ Modifica Transazione' : '➕ Nuova Transazione'}
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
						Tipo di Transazione
					</label>

					<div className="grid grid-cols-2 gap-4">

						<button
							type="button"
							onClick={() => {
								setType("expense");
								setCategory('');
							}}
							className={`
								p-4 rounded-lg border-2 transition-all duration-200
								${type === 'expense'
										? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
										: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
									}
								`}
						>
							<div className="text-3xl mb-2">📉</div>
							<div className="font-semibold">Uscita</div>	
						</button>

						
						<button 
							type="button"
							onClick={() => {
								setType('income');
								setCategory('');
							}}
							className={`
								p-4 rounded-lg border-2 transition-all duration-200
								${ type === 'income'
								 ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
								 : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
								}
							`}
						>
							<div className="text-3xl mb-2">📈</div>
							<div className="font-semibold">Entrata</div>
						</button>
					</div>
				</div>
				
				<div className="mb-6">
					<label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Importo (€)
					</label>
					<input
						type="number"
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="0.00"
						step="0.01"
						min="0"
						required
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
					
					/>
				</div>



				<div className="mb-6">
					<label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Categoria
					</label>
					
					<select
						id="category"
						value={category}
						onChange={(e) => {setCategory(e.target.value)}}
						required
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none"
					>
						<option value="">Seleziona una Categoria</option>

						{
							(type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))
						}
					</select>

				</div>


				<div className="mb-6">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Descrizione
					</label>

					<input 
						type="text"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Es: Pizza con amici"
						required
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Data
					</label>
					
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						max={new Date().toISOString().split('T')[0]}
						required
						className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<div className="flex gap-4 pt-4">

					<button 
						type="submit"
						className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
					>
						{initialData ? '💾 Aggiorna Transazione' : '💾 Salva Transazione'} 
					</button>

					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
					>
						❌ Annulla
					</button>




				</div>

			</form>
		</div>
	);

}

export default TransactionForm;