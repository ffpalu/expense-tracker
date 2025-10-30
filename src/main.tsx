import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TransactionProvider } from './context/TransactionContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<ThemeProvider>
			<TransactionProvider>
				<App />
			</TransactionProvider>
		</ThemeProvider>
  </StrictMode>,
)
