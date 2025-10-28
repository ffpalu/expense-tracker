import { Pie, Line, Bar} from "react-chartjs-2";
import { useTransaction } from "../../context/TransactionContext";
import { groupByCategory } from "../../utils/calculations";
import { CATEGORY_MAP } from "../../utils/constants";
import { useMemo } from "react";
import '..//..//utils/chartConfig';


function Charts() {
  const { transactions } = useTransaction();
  const expenses = transactions.filter(t => t.type === 'expense');

  // MEMORIZZA I DATI - Si ricalcolano SOLO quando transactions cambia
  const pieChartData = useMemo(() => {
    if (expenses.length === 0) return null;
    
    const grouped = groupByCategory(expenses);
    const entries = Object.entries(grouped);
    
    return {
      labels: entries.map(([categoryId]) => CATEGORY_MAP[categoryId]?.name || categoryId),
      datasets: [
        {
          label: 'Importo',
          data: entries.map(([, data]) => data.total),
          backgroundColor: entries.map(([categoryId]) => CATEGORY_MAP[categoryId]?.color || '#6b7280'),
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

  const barChartData = useMemo(() => {
    const monthlyData: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach((transaction) => {
      const monthKey = transaction.date.substring(0, 7);
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { income: 0, expense: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expense += transaction.amount;
      }
    });
    
    const sortedMonths = Object.keys(monthlyData).sort().slice(-6);
    
    return {
      labels: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-');
        const date = new Date(parseInt(year), parseInt(monthNum) - 1);
        return date.toLocaleDateString('it-IT', { month: 'short', year: 'numeric' });
      }),
      datasets: [
        {
          label: 'Entrate',
          data: sortedMonths.map(month => monthlyData[month].income),
          backgroundColor: '#22c55e',
          borderColor: '#16a34a',
          borderWidth: 2,
        },
        {
          label: 'Uscite',
          data: sortedMonths.map(month => monthlyData[month].expense),
          backgroundColor: '#ef4444',
          borderColor: '#dc2626',
          borderWidth: 2,
        },
      ],
    };
  }, [transactions]);

  const lineChartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    
    let balance = 0;
    const dates: string[] = [];
    const balances: number[] = [];
    
    sorted.forEach((transaction) => {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
      
      dates.push(transaction.date);
      balances.push(balance);
    });
    
    const limit = 30;
    const startIndex = Math.max(0, dates.length - limit);
    
    return {
      labels: dates.slice(startIndex).map(date => {
        const d = new Date(date);
        return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
      }),
      datasets: [
        {
          label: 'Saldo',
          data: balances.slice(startIndex),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nessun dato da visualizzare
        </h3>
        <p className="text-gray-500">
          Aggiungi delle transazioni per vedere i grafici!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">📈 Statistiche</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GRAFICO A TORTA */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🍕 Spese per Categoria
          </h3>
          {pieChartData ? (
            <div className="h-80">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const value = context.parsed;
                          return ` €${value.toFixed(2)}`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-20">Nessuna spesa da mostrare</p>
          )}
        </div>

        {/* GRAFICO A BARRE */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Entrate vs Uscite (Ultimi 6 Mesi)
          </h3>
          <div className="h-80">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
												const value = context.parsed.y;
												if (value == null) return '';
												return `${context.dataset.label}: €${value.toFixed(2)}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `€${value}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* GRAFICO A LINEA */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📈 Trend del Saldo
        </h3>
        <div className="h-80">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
											const value = context.parsed.y;
											if (value == null) return '';
											return `Saldo: €${value.toFixed(2)}`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: (value) => `€${value}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;

