export interface Category {
	id:string;
	name: string;
	type: 'income' | 'expense';
	color: string;
	icon: string;
}

export type CategoryMap = Record<string,Category>