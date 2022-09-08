import type { Decimal } from 'decimal.js-light';

export type Unit = 'ether' | 'wei';

export type Item = {
	tokenId: number;
	name?: string;
	amount?: Decimal;
	unit?: Unit;
	imageUrl?: string;
	disabled?: boolean;
};

export type FormData = {
	to: string;
	tokenIds: number[];
	amounts: Decimal[];
};

export type ItemRecord = Record<number, Item>;
