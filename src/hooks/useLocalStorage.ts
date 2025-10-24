import { useState, useEffect } from "react";


function useLocalStorage<T> (key:string, initialValue:T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);

			return item ? JSON.parse(item) : initialValue;

		} catch (error) {
			console.error('Errore leggendo da localstorage:', error);
			return initialValue;
		}
	});


	const setValue = (value:T | ((val:T) => T)) => {
		try {
			
			const valueToStore = value instanceof Function ? value(storedValue) : value;

			setStoredValue(valueToStore);

			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.error('Errore salvando in localStorage:', error);
		}


	};
	return [storedValue, setValue] as const;
}

export default useLocalStorage;