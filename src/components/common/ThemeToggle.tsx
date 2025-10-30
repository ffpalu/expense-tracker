import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
	const {theme, toggleTheme} = useTheme();

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
			aria-label="Toggle theme"
			title={theme === 'light' ? 'Attiva la modalità scura' : 'Attiva la modalità chiara'}
		>
			{theme === 'light' ? (
				<Moon size={20} className="text-light-text dark:text-dark-text" />
			) : (
				<Sun size={20} className="text-light-text dark:text-dark-text" />
			)}
		</button>
	);
}

export default ThemeToggle;