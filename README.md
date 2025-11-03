# 💰 Budget Tracker

> Un'applicazione web moderna e intuitiva per monitorare le tue finanze personali, con dark mode e funzionalità di export avanzate.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384.svg)](https://www.chartjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📸 Screenshot

### Light Mode
*Dashboard con statistiche in tempo reale, grafici interattivi e transazioni recenti*

### Dark Mode 🌙
*Interfaccia elegante ottimizzata per la visione notturna con supporto completo dark mode*

### Export Data 📥
*Menu dropdown per esportare i dati in formato CSV o JSON*

---

## ✨ Caratteristiche Principali

### 💳 Gestione Transazioni
- ➕ **Aggiungi transazioni** - Crea nuove entrate o uscite con facilità
- ✏️ **Modifica transazioni** - Aggiorna i dati esistenti in tempo reale
- 🗑️ **Elimina transazioni** - Rimuovi voci con conferma di sicurezza
- 🏷️ **Categorie personalizzate** - Sistema di categorizzazione completo
- 📅 **Tracciamento temporale** - Ordina per data e periodo

### 📊 Dashboard & Analytics
- 💰 **Saldo in tempo reale** - Visualizza il tuo saldo aggiornato
- 📈 **Grafici interattivi** - Analizza le tue finanze con grafici a torta, barre e linee
- 📋 **Transazioni recenti** - Vista rapida delle ultime operazioni
- 🎯 **Statistiche dettagliate** - Entrate vs Uscite, trend mensili

### 🔍 Filtri Avanzati
- 🎚️ **Filtra per tipo** - Visualizza solo entrate o uscite
- 🏷️ **Filtra per categoria** - Focus su categorie specifiche
- 📅 **Range di date** - Seleziona periodo temporale personalizzato
- 🔎 **Ricerca testuale** - Cerca nelle descrizioni delle transazioni
- ↻ **Reset rapido** - Pulisci tutti i filtri con un click

### 🌙 Dark Mode
- 🎨 **Switch tema** - Toggle tra light e dark mode
- 💾 **Persistenza** - Il tema viene salvato e ripristinato automaticamente
- 🖥️ **Rilevamento sistema** - Usa automaticamente le preferenze di sistema
- ✨ **Transizioni fluide** - Cambio tema animato e naturale
- 🎯 **Supporto completo** - Tutti i componenti ottimizzati per entrambi i temi

### 📥 Export Dati
- 📄 **Export CSV** - Compatibile con Excel, Google Sheets e tutti i fogli di calcolo
- 📦 **Export JSON** - Backup completo dei dati con metadata
- 🎯 **Export globale** - Esporta tutte le transazioni dall'header
- 🔍 **Export filtrato** - Esporta solo le transazioni filtrate
- 🕐 **Naming intelligente** - File automaticamente nominati con timestamp
- 🌍 **Caratteri speciali** - Supporto completo per caratteri accentati

### 🎨 UI/UX
- 📱 **Design responsive** - Ottimizzato per desktop, tablet e mobile
- ⚡ **Animazioni fluide** - Transizioni smooth e feedback visivi
- 🎭 **Interfaccia intuitiva** - Design pulito e facile da usare
- 🌈 **Palette colori** - Sistema colori coerente e accessibile
- ♿ **Accessibilità** - ARIA labels e contrasti WCAG compliant

---

## 🚀 Tecnologie Utilizzate

### Frontend
- **[React 18.3](https://reactjs.org/)** - Library UI con hooks moderni
- **[TypeScript 5.5](https://www.typescriptlang.org/)** - Type safety e migliore DX
- **[Vite](https://vitejs.dev/)** - Build tool veloce e moderno
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework

### Data Visualization
- **[Chart.js 4.4](https://www.chartjs.org/)** - Grafici interattivi
- **[react-chartjs-2](https://react-chartjs-2.js.org/)** - React wrapper per Chart.js

### State Management
- **React Context API** - Gestione stato globale
- **Local Storage** - Persistenza dati lato client

### Development Tools
- **[ESLint](https://eslint.org/)** - Linting e code quality
- **[PostCSS](https://postcss.org/)** - CSS processing
- **TypeScript Compiler** - Type checking

---

## 📦 Installazione

### Prerequisiti
- Node.js 18+ 
- npm o yarn

### Setup Locale

1. **Clone il repository**
```bash
git clone https://github.com/ffpalu/expense-tracker.git
cd budget-tracker
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Avvia il server di sviluppo**
```bash
npm run dev
```

4. **Apri il browser**
```
http://localhost:5173
```

### Build per Produzione

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

### Preview Build di Produzione

```bash
npm run preview
```

---

## 📖 Come Usare

### 1️⃣ Aggiungere una Transazione

1. Clicca sul pulsante **"➕ Nuova"** nell'header
2. Seleziona il tipo: **Entrata** 📈 o **Uscita** 📉
3. Inserisci l'**importo** in euro
4. Scegli una **categoria** dal menu
5. Aggiungi una **descrizione** dettagliata
6. Seleziona la **data** (default: oggi)
7. Clicca **"💾 Salva Transazione"**

### 2️⃣ Visualizzare le Statistiche

- Vai alla tab **"📊 Dashboard"** per vedere:
  - 💰 **Saldo totale** - La differenza tra entrate e uscite
  - 📈 **Totale entrate** - Somma di tutte le entrate
  - 📉 **Totale uscite** - Somma di tutte le uscite
  - 🍕 **Grafico a torta** - Distribuzione spese per categoria
  - 📊 **Grafico a barre** - Confronto entrate vs uscite mensili
  - 📈 **Grafico lineare** - Trend del saldo nel tempo

### 3️⃣ Filtrare le Transazioni

1. Vai alla tab **"💳 Transazioni"**
2. Usa i filtri nella barra superiore:
   - **Tipo**: Tutte / Entrate / Uscite
   - **Categoria**: Filtra per categoria specifica
   - **Data Da/A**: Imposta un range temporale
   - **Cerca**: Ricerca per parole chiave nella descrizione
3. Le transazioni vengono filtrate in tempo reale
4. Clicca **"↻ Reset"** per pulire tutti i filtri

### 4️⃣ Esportare i Dati

**Export Globale (tutte le transazioni):**
1. Clicca sul pulsante **"📥 Esporta"** nell'header
2. Seleziona il formato:
   - **CSV** - Per Excel/Sheets
   - **JSON** - Per backup/sviluppo
3. Il file viene scaricato automaticamente

**Export Filtrato (solo transazioni visualizzate):**
1. Applica i filtri desiderati nella sezione Transazioni
2. Clicca **"📥 Esporta"** nella barra dei filtri
3. Scegli il formato
4. Scarica il file filtrato

### 5️⃣ Cambiare Tema

1. Clicca l'icona **🌙** o **☀️** nell'header
2. Il tema cambia immediatamente
3. La preferenza viene salvata automaticamente
4. Persiste anche dopo il riavvio del browser

---

## 📂 Struttura del Progetto

```
budget-tracker/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ThemeToggle.tsx      # Toggle dark mode
│   │   │   └── ExportButton.tsx     # Bottone export dati
│   │   ├── dashboard/
│   │   │   ├── Summary.tsx          # Card riassuntive
│   │   │   ├── Charts.tsx           # Grafici interattivi
│   │   │   └── RecentTransactions.tsx
│   │   ├── transactions/
│   │   │   ├── TransactionForm.tsx  # Form aggiungi/modifica
│   │   │   ├── TransactionList.tsx  # Lista transazioni
│   │   │   ├── TransactionItem.tsx  # Singola transazione
│   │   │   └── TransactionFilters.tsx # Barra filtri
│   │   └── layout/
│   ├── context/
│   │   ├── TransactionContext.tsx   # State management transazioni
│   │   └── ThemeContext.tsx         # State management tema
│   ├── hooks/
│   │   ├── useFilters.ts            # Hook filtri custom
│   │   └── useLocalStorage.ts       # Hook localStorage
│   ├── types/
│   │   ├── transaction.ts           # Type definitions transazioni
│   │   └── category.ts              # Type definitions categorie
│   ├── utils/
│   │   ├── calculations.ts          # Funzioni calcolo
│   │   ├── formatters.ts            # Formattazione date/valute
│   │   ├── constants.ts             # Costanti e categorie
│   │   ├── chartConfig.ts           # Configurazione Chart.js
│   │   └── exportUtils.ts           # Funzioni export CSV/JSON
│   ├── App.tsx                      # Componente principale
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Stili globali
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js               # Config Tailwind + dark mode
├── vite.config.ts
└── README.md
```

---

## 🎨 Categorie Predefinite

### 💸 Uscite (Expense)
- 🍕 **Alimentari** - Spesa, supermercato, generi alimentari
- 🚗 **Trasporti** - Benzina, mezzi pubblici, taxi
- 🏠 **Casa** - Affitto, mutuo, condominio
- 💡 **Bollette** - Luce, gas, acqua, internet
- 🎬 **Svago** - Cinema, ristoranti, hobby
- 🏥 **Salute** - Farmaci, visite mediche
- 👕 **Abbigliamento** - Vestiti, scarpe, accessori
- 📚 **Istruzione** - Libri, corsi, università
- 📦 **Altro** - Spese varie non categorizzate

### 💰 Entrate (Income)
- 💼 **Stipendio** - Reddito da lavoro dipendente
- 💵 **Freelance** - Reddito da lavoro autonomo
- 🎁 **Regalo** - Donazioni ricevute
- 📈 **Investimenti** - Rendite, dividendi
- 📦 **Altro** - Entrate varie

---

## 🔧 Configurazione

### Modificare le Categorie

Edita il file `src/utils/constants.ts`:

```typescript
export const EXPENSE_CATEGORIES: Category[] = [
  { 
    id: 'groceries', 
    name: 'Alimentari', 
    icon: '🍕', 
    color: '#f59e0b' 
  },
  // Aggiungi le tue categorie...
];
```

### Personalizzare i Colori

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // I tuoi colori personalizzati
      },
    },
  },
}
```

### Modificare il Storage Key

In `src/hooks/useLocalStorage.ts`, cambia la chiave:

```typescript
const STORAGE_KEY = 'budget-tracker-transactions'; // Personalizza
```

---

## 📊 Formati Export

### CSV Format
```csv
ID,Data,Tipo,Categoria,Descrizione,Importo,Data Creazione
txn_001,2024-01-15,Uscita,Alimentari,"Spesa al supermercato",45.50,2024-01-15T10:30:00Z
```

**Caratteristiche:**
- Header descrittivi in italiano
- Compatibile con Excel, Google Sheets, LibreOffice
- Supporto caratteri UTF-8 con BOM
- Virgolette escaped correttamente

### JSON Format
```json
{
  "exportDate": "2024-10-29T00:30:00.000Z",
  "transactionCount": 5,
  "transactions": [
    {
      "id": "txn_001",
      "type": "expense",
      "amount": 45.5,
      "category": "groceries",
      "description": "Spesa al supermercato",
      "date": "2024-01-15",
      "createdAt": "2024-01-15T10:30:00Z",
      "categoryName": "Alimentari",
      "typeLabel": "Uscita"
    }
  ]
}
```

**Caratteristiche:**
- Metadata completi
- Campi human-readable addizionali
- JSON pretty-printed
- Perfetto per backup e re-import

---

## 🌐 Browser Supportati

| Browser | Versione Minima |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## 🐛 Troubleshooting

### Il tema dark mode non persiste
**Problema:** Il tema torna a light dopo il refresh  
**Soluzione:** Verifica che localStorage sia abilitato nel browser

### Export non scarica il file
**Problema:** Click su export non fa nulla  
**Soluzione:** 
1. Controlla la console browser per errori
2. Verifica che ci siano transazioni da esportare
3. Controlla le impostazioni popup/download del browser

### CSV mostra caratteri strani in Excel
**Problema:** Caratteri accentati visualizzati male  
**Soluzione:** 
- Il BOM dovrebbe risolvere il problema
- Alternativa: Apri in Google Sheets invece di Excel
- In Excel: Usa "Dati → Da Testo/CSV" invece di doppio click

### Errori dopo npm install
**Problema:** Dipendenze non installate correttamente  
**Soluzione:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contribuire

I contributi sono benvenuti! Per contribuire:

1. **Fork** il progetto
2. Crea un **branch** per la tua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. **Push** sul branch (`git push origin feature/AmazingFeature`)
5. Apri una **Pull Request**

### Guidelines

- Segui lo stile del codice esistente
- Aggiungi TypeScript types appropriati
- Testa le modifiche in entrambi i temi (light/dark)
- Verifica la responsività su mobile
- Documenta le nuove feature nel README

---

## 📝 To-Do List

### Features Pianificate
- [ ] 📊 Export PDF con grafici
- [ ] 📥 Import da CSV/JSON
- [ ] 🔄 Sincronizzazione cloud (Firebase, Supabase)
- [ ] 👥 Multi-utente con autenticazione
- [ ] 💱 Supporto multi-valuta
- [ ] 🔔 Notifiche e promemoria
- [ ] 📱 PWA (Progressive Web App)
- [ ] 🎯 Budget goals e limiti di spesa
- [ ] 🔁 Transazioni ricorrenti
- [ ] 📧 Email report settimanali/mensili
- [ ] 🏦 Integrazione API bancarie
- [ ] 🤖 Categorizzazione automatica con ML

### Miglioramenti UI/UX
- [ ] Tutorial interattivo per nuovi utenti
- [ ] Temi aggiuntivi (High Contrast, Custom)
- [ ] Animazioni più elaborate
- [ ] Shortcuts da tastiera
- [ ] Drag & drop per organizzare transazioni

---

## 👨‍💻 Autore

**[Il Tuo Nome]**
- GitHub: [@ffpalu](https://github.com/ffpalu)
- LinkedIn: [Federico Palumbo](https://linkedin.com/in/federico-francesco-palumbo)
- Email: m.palumbo01@gmail.com

---

## 🙏 Ringraziamenti

- [React Team](https://react.dev/) per l'eccellente libreria
- [Tailwind Labs](https://tailwindcss.com/) per il framework CSS
- [Chart.js](https://www.chartjs.org/) per i grafici
- [Heroicons](https://heroicons.com/) per le icone SVG
- Community open source per l'ispirazione

---

## ⭐ Supporto

Se questo progetto ti è stato utile, considera di:
- ⭐ **Mettere una stella** su GitHub
- 🐛 **Segnalare bug** aprendo issue
- 💡 **Suggerire feature** nelle discussions
- 🔀 **Contribuire** con pull requests
- 📢 **Condividere** il progetto con altri

---

## 📞 Contatti

Hai domande o suggerimenti? Apri una [issue](https://github.com/ffpalu/budget-tracker/issues) o contattami direttamente!

---

<div align="center">

**Fatto con ❤️ e React**

[⬆ Torna all'inizio](#-budget-tracker)

</div>
