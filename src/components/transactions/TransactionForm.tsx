import React, { useState } from "react";
import type { TransactionType } from "../../types/transaction";
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
}

function TransactionForm ({onSubmit, onCancel}: TransactionFormProps) {
	const [type, setType] = useState<TransactionType> ('expense');
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('')
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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
		<div className="bg-white rounded-lg p-6">
			<h2 className="text-2xl font-bold text-gray-900 mb-6">
				Nuova Transazione
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-3">
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
										? 'border-red-500 bg-red-50 text-red-700'
										: 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
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
								 ? 'border-green-500 bg-green-50 text-green-700'
								 : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
								}
							`}
						>
							<div className="text-3xl mb-2">📈</div>
							<div className="font-semibold">Entrata</div>
						</button>
					</div>
				</div>
				
				<div className="mb-6">
					<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
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
						className="w-full px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
					
					/>
				</div>



				<div className="mb-6">
					<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
						Categoria
					</label>
					
					<select
						id="category"
						value={category}
						onChange={(e) => {setCategory(e.target.value)}}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-white"
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
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
						Descrizione
					</label>

					<input 
						type="text"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Es: Pizza con amici"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus: border-transparent"
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
						Data
					</label>
					
					<input
						type="date"
						id="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						max={new Date().toISOString().split('T')[0]}
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<div className="flex gap-4 pt-4">

					<button 
						type="submit"
						className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					>
						💾 Salva Transazione
					</button>

					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
					>
						❌ Annulla
					</button>




				</div>

			</form>
		</div>
	);

}

export default TransactionForm;