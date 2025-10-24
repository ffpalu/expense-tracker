import type { Category } from "../types/category";

export const EXPENSE_CATEGORIES: Category[] = [
	{id:'food', name: '🍔 Cibo e Bevande', type:'expense', color:'#ef4444', icon: '🍔'},
	{id:'transport', name: '🚗 Trasporti', type:'expense', color:'#f59e0b', icon: '🚗'},
	{id:'home', name: '🏠 Casa', type:'expense', color:'#8b5cf6', icon: '🏠'},
	{id:'utilities', name: '💡 Bollette', type:'expense', color:'#06b6d4', icon: '💡'},
	{id:'health', name: '⚕️ Salute', type:'expense', color:'#10b981', icon: '⚕️'},
	{id:'entertainment', name: '🎬 Intrattenimento', type:'expense', color:'#ec4899', icon: '🎬'},
	{id:'education', name: '📚 Istruzione', type:'expense', color:'#3b82f6', icon: '📚'},
	{id:'shopping', name: '🛍️ Shopping', type:'expense', color:'#f43f5e', icon: '🛍️'},
	{id:'other-expense', name: '📦 Altro', type:'expense', color:'#6b7280', icon: '📦'},
]


export const INCOME_CATEGORIES: Category[] = [
	{id:'salary', name: '💼 Stipendio', type:'income', color:'#22c55e', icon: '💼'},
	{id:'freelance', name: '💻 Freelance', type:'income', color:'#14b8a6', icon: '💻'},
	{id:'investment', name: '📈 Investimenti', type:'income', color:'#0ea5e9', icon: '📈'},
	{id:'gift', name: '🎁 Regali', type:'income', color:'#a855f7', icon: '🎁'},
	{id:'bonus', name: '🎉 Bonus', type:'income', color:'#eab308', icon: '🎉'},
	{id:'other-income', name: '💰 Altro', type:'income', color:'#84cc16', icon: '💰'},
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const CATEGORY_MAP = ALL_CATEGORIES.reduce((acc,category) => {
	acc[category.id] = category; 
	return acc;
}, {} as Record<string,Category>);

export const STORAGE_KEY = 'budget-tracker-transaction';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DISPLAY_DATE_FORMAT = 'dd/MM/yyyy';