import {format, parseISO} from 'date-fns';
import { it } from 'date-fns/locale';

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat('it-IT', {
		style:'currency',
		currency:'EUR',
	}).format(amount);
};

export const formatDate = (dateString:string): string => {
	try {
		return format(parseISO(dateString), 'dd/MM/yyyy', {locale:it});
	}
	catch {
		return dateString;
	}
};

export const formatDateLong = (dateString: string): string => {
	try {
		return format(parseISO(dateString), 'dd MMMMM yyyy', {locale:it});
	} catch {
		return dateString;
	}
};

export const getCurrentDate = (): string => {
	return new Date().toISOString();
};

export const generateId = (): string => {
	return `${Date.now()}-${Math.random().toString(36).substring(2,9)}`;
}