import type { ItemRecord } from 'src/types';
import { ERC1155URI } from './config';

export const RESOURCES: ItemRecord = {
	601: {
		tokenId: 601,
		name: 'Wood',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/601.png`
	},
	602: {
		tokenId: 602,
		name: 'Stone',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/602.png`
	},
	603: {
		tokenId: 603,
		name: 'Iron',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/603.png`
	},
	604: {
		tokenId: 604,
		name: 'Gold',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/604.png`
	},
	605: {
		tokenId: 605,
		name: 'Egg',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/605.png`
	},
	606: {
		tokenId: 606,
		name: 'Chicken',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/606.png`
	}
};