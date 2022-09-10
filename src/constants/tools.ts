import type { ItemRecord } from 'src/types';
import { ERC1155URI } from './config';

export const TOOLS: ItemRecord = {
	301: {
		tokenId: 301,
		name: 'Axe',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/301.png`
	},
	302: {
		tokenId: 302,
		name: 'Pickaxe',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/302.png`
	},
	303: {
		tokenId: 303,
		name: 'Stone Pickaxe',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/303.png`
	},
	304: {
		tokenId: 304,
		name: 'Iron Pickaxe',
		unit: 'ether',
		imageUrl: `${ERC1155URI}/304.png`
	}
};
