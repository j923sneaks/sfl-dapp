import type { ItemRecord } from 'src/types';
import { MAINNET } from './contract-addresses';

/**
 * List Crops and Limited Items i.e. withdrawable items for now
 */

export const CROPS: ItemRecord = {
	201: {
		tokenId: 201,
		name: 'Sunflower',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/201.png'
	},
	202: {
		tokenId: 202,
		name: 'Potato',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/202.png'
	},
	203: {
		tokenId: 203,
		name: 'Pumpkin',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/203.png'
	},
	204: {
		tokenId: 204,
		name: 'Carrot',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/204.png'
	},
	205: {
		tokenId: 205,
		name: 'Cabbage',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/205.png'
	},
	206: {
		tokenId: 206,
		name: 'Beetroot',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/206.png'
	},
	207: {
		tokenId: 207,
		name: 'Cauliflower',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/207.png'
	},
	208: {
		tokenId: 208,
		name: 'Parsnip',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/208.png'
	},
	209: {
		tokenId: 209,
		name: 'Radish',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/209.png'
	},
	210: {
		tokenId: 210,
		name: 'Wheat',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/210.png'
	}
};

export const TOOLS: ItemRecord = {
	301: {
		tokenId: 301,
		name: 'Axe',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/301.png'
	},
	302: {
		tokenId: 302,
		name: 'Pickaxe',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/302.png'
	},
	303: {
		tokenId: 303,
		name: 'Axe',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/303.png'
	},
	304: {
		tokenId: 304,
		name: 'Axe',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/304.png'
	}
};

export const RESOURCES: ItemRecord = {
	601: {
		tokenId: 601,
		name: 'Wood',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/601.png'
	},
	602: {
		tokenId: 602,
		name: 'Stone',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/602.png'
	},
	603: {
		tokenId: 603,
		name: 'Iron',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/603.png'
	},
	604: {
		tokenId: 604,
		name: 'Gold',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/604.png'
	},
	605: {
		tokenId: 605,
		name: 'Egg',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/605.png'
	},
	606: {
		tokenId: 606,
		name: 'Chicken',
		unit: 'ether',
		imageUrl: 'https://sunflower-land.com/play/erc1155/606.png'
	}
};

/**
 * NFTs such as Sunflower Statue, Kuebiko, etc
 */
export const NFTs: ItemRecord = {
	401: {
		tokenId: 401,
		name: 'Sunflower Statue',
		unit: 'wei',
		imageUrl: 'https://sunflower-land.com/play/erc1155/401.png'
	},
	409: {
		tokenId: 409,
		name: 'Gold Egg',
		unit: 'wei',
		imageUrl: 'https://sunflower-land.com/play/erc1155/409.png'
	},
	804: {
		tokenId: 804,
		name: 'Chinese Flag',
		unit: 'wei',
		imageUrl: 'https://sunflower-land.com/play/erc1155/804.gif'
	}
};

export const ALL: ItemRecord = { ...CROPS, ...RESOURCES, ...NFTs, ...TOOLS };

export { MAINNET };
