import type { ItemRecord } from 'src/types';
import { CROPS } from './crops';
// import { NFTs } from './nft';
import { RESOURCES } from './resources';
import { TOOLS } from './tools';
import { MAINNET } from './config';

export const ALL: ItemRecord = { ...CROPS, ...RESOURCES, ...TOOLS };

export { MAINNET, CROPS, RESOURCES, TOOLS };
