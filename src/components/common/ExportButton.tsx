import { useEffect, useRef, useState } from "react";
import type { Transaction } from "../../types/transaction";
import { exportToCSV, exportToJSON } from "../../utils/exportUtils";
import { Upload } from "lucide-react";


interface ExportButtonProps {
	transactions: Transaction[];
}

function ExportButton({ transactions } : ExportButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		if(isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	const handleExportCSV = () => {
		exportToCSV(transactions);
		setIsOpen(false);
	} 

	const handleExportJSON = () => {
		exportToJSON(transactions);
		setIsOpen(false);
	}


	const isDisabled = transactions.length === 0;

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => !isDisabled && setIsOpen(!isOpen)}
				disabled={isDisabled}
				className={`
						flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
						${isDisabled
							? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
							: 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
						}
					`}
				title={isDisabled ? 'Nessuna transazione da esportare': 'Esporta dati'}
			>
				<Upload size={20} />
				<span className="hidden sm:inline">Esporta</span>
			</button>


			{isOpen && !isDisabled && (
				<div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-collapse border-gray-200 dark:border-gray-700 py-2 z-50 animate-fadeIn">
					<div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
						<p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
							Formato Export
						</p>
					</div>

					<button
						onClick={handleExportCSV}
						className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
					>
						<div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
							<svg className="fill-current text-gray-700 dark:text-gray-200" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548.29 548.291" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677 c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419 c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757 C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81 c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777 c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861 H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368 c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485 c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786 c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396 C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269 c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099 c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919 C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399 l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693 l20.487-68.598h38.599L427.518,380.583z"></path> </g> </g></svg>
						</div>
						<div className="flex-1">
							<p className="font-semibold text-gray-900 dark:text-white">
								Esporta CSV
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Per Excel e fogli di calcolo
							</p>
						</div>
					</button>


					<button 
						onClick={handleExportJSON}
						className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
					>
						<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
							<svg className="fill-current text-gray-700 dark:text-gray-200" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 58 58" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M33.655,45.988c-0.232-0.31-0.497-0.533-0.793-0.67s-0.608-0.205-0.937-0.205c-0.337,0-0.658,0.063-0.964,0.191 s-0.579,0.344-0.82,0.649s-0.431,0.699-0.567,1.183c-0.137,0.483-0.21,1.075-0.219,1.777c0.009,0.684,0.08,1.267,0.212,1.75 s0.314,0.877,0.547,1.183s0.497,0.528,0.793,0.67s0.608,0.212,0.937,0.212c0.337,0,0.658-0.066,0.964-0.198s0.579-0.349,0.82-0.649 s0.431-0.695,0.567-1.183s0.21-1.082,0.219-1.784c-0.009-0.684-0.08-1.265-0.212-1.743S33.888,46.298,33.655,45.988z"></path> <path d="M51.5,39V13.978c0-0.766-0.092-1.333-0.55-1.792L39.313,0.55C38.964,0.201,38.48,0,37.985,0H8.963 C7.777,0,6.5,0.916,6.5,2.926V39H51.5z M29.5,33c0,0.552-0.447,1-1,1s-1-0.448-1-1v-3c0-0.552,0.447-1,1-1s1,0.448,1,1V33z M37.5,3.391c0-0.458,0.553-0.687,0.877-0.363l10.095,10.095C48.796,13.447,48.567,14,48.109,14H37.5V3.391z M36.5,24v-4 c0-0.551-0.448-1-1-1c-0.553,0-1-0.448-1-1s0.447-1,1-1c1.654,0,3,1.346,3,3v4c0,1.103,0.897,2,2,2c0.553,0,1,0.448,1,1 s-0.447,1-1,1c-1.103,0-2,0.897-2,2v4c0,1.654-1.346,3-3,3c-0.553,0-1-0.448-1-1s0.447-1,1-1c0.552,0,1-0.449,1-1v-4 c0-1.2,0.542-2.266,1.382-3C37.042,26.266,36.5,25.2,36.5,24z M28.5,22c0.828,0,1.5,0.672,1.5,1.5S29.328,25,28.5,25 c-0.828,0-1.5-0.672-1.5-1.5S27.672,22,28.5,22z M16.5,26c1.103,0,2-0.897,2-2v-4c0-1.654,1.346-3,3-3c0.553,0,1,0.448,1,1 s-0.447,1-1,1c-0.552,0-1,0.449-1,1v4c0,1.2-0.542,2.266-1.382,3c0.84,0.734,1.382,1.8,1.382,3v4c0,0.551,0.448,1,1,1 c0.553,0,1,0.448,1,1s-0.447,1-1,1c-1.654,0-3-1.346-3-3v-4c0-1.103-0.897-2-2-2c-0.553,0-1-0.448-1-1S15.947,26,16.5,26z"></path> <path d="M6.5,41v15c0,1.009,1.22,2,2.463,2h40.074c1.243,0,2.463-0.991,2.463-2V41H6.5z M18.021,51.566 c0,0.474-0.087,0.873-0.26,1.196s-0.405,0.583-0.697,0.779s-0.627,0.333-1.005,0.41c-0.378,0.077-0.768,0.116-1.169,0.116 c-0.2,0-0.436-0.021-0.704-0.062s-0.547-0.104-0.834-0.191s-0.563-0.185-0.827-0.294s-0.487-0.232-0.67-0.369l0.697-1.107 c0.091,0.063,0.221,0.13,0.39,0.198s0.354,0.132,0.554,0.191s0.41,0.111,0.629,0.157s0.424,0.068,0.615,0.068 c0.483,0,0.868-0.094,1.155-0.28s0.439-0.504,0.458-0.95v-7.711h1.668V51.566z M25.958,52.298c-0.15,0.342-0.362,0.643-0.636,0.902 s-0.61,0.467-1.012,0.622s-0.856,0.232-1.367,0.232c-0.219,0-0.444-0.012-0.677-0.034s-0.467-0.062-0.704-0.116 c-0.237-0.055-0.463-0.13-0.677-0.226s-0.398-0.212-0.554-0.349l0.287-1.176c0.128,0.073,0.289,0.144,0.485,0.212 s0.398,0.132,0.608,0.191s0.419,0.107,0.629,0.144s0.405,0.055,0.588,0.055c0.556,0,0.982-0.13,1.278-0.39s0.444-0.645,0.444-1.155 c0-0.31-0.104-0.574-0.314-0.793s-0.472-0.417-0.786-0.595s-0.654-0.355-1.019-0.533s-0.706-0.388-1.025-0.629 s-0.583-0.526-0.793-0.854s-0.314-0.738-0.314-1.23c0-0.446,0.082-0.843,0.246-1.189s0.385-0.641,0.663-0.882 s0.602-0.426,0.971-0.554s0.759-0.191,1.169-0.191c0.419,0,0.843,0.039,1.271,0.116s0.774,0.203,1.039,0.376 c-0.055,0.118-0.118,0.248-0.191,0.39s-0.142,0.273-0.205,0.396s-0.118,0.226-0.164,0.308s-0.073,0.128-0.082,0.137 c-0.055-0.027-0.116-0.063-0.185-0.109s-0.166-0.091-0.294-0.137s-0.296-0.077-0.506-0.096s-0.479-0.014-0.807,0.014 c-0.183,0.019-0.355,0.07-0.52,0.157s-0.31,0.193-0.438,0.321s-0.228,0.271-0.301,0.431s-0.109,0.313-0.109,0.458 c0,0.364,0.104,0.658,0.314,0.882s0.47,0.419,0.779,0.588s0.647,0.333,1.012,0.492s0.704,0.354,1.019,0.581 s0.576,0.513,0.786,0.854s0.314,0.781,0.314,1.319C26.184,51.603,26.108,51.956,25.958,52.298z M35.761,51.156 c-0.214,0.647-0.511,1.185-0.889,1.613s-0.82,0.752-1.326,0.971s-1.06,0.328-1.661,0.328s-1.155-0.109-1.661-0.328 s-0.948-0.542-1.326-0.971s-0.675-0.966-0.889-1.613s-0.321-1.395-0.321-2.242s0.107-1.593,0.321-2.235s0.511-1.178,0.889-1.606 s0.82-0.754,1.326-0.978s1.06-0.335,1.661-0.335s1.155,0.111,1.661,0.335s0.948,0.549,1.326,0.978s0.675,0.964,0.889,1.606 s0.321,1.388,0.321,2.235S35.975,50.509,35.761,51.156z M45.68,54h-1.668l-3.951-6.945V54h-1.668V43.924h1.668l3.951,6.945v-6.945 h1.668V54z"></path> </g> </g></svg>
						</div>
						<div className="flex-1">
							<p className="font-semibold text-gray-900 dark:text-white">
								Esporta JSON
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Per sviluppatori e backup
							</p>
						</div>
					</button>

					<div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 mt-1">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{transactions.length} {transactions.length === 1 ? 'transazione': 'transazioni'}
						</p>
					</div>
				</div>

			)}
		</div>
	)

}

export default ExportButton