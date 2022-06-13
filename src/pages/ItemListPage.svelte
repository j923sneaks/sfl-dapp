<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import ItemList from '../components/ItemList.svelte';
	import { batchAccounts } from '../utils';
	import { ALL, CROPS, NFTs, RESOURCES, TOOLS } from '../constants';
	import type { Item } from '..//types';

	export let inventory: any;
	let showZeroBalance = false;
	let loading = false;
	let items: Item[] = [];
	const keys = Object.keys(ALL).map(Number);

	const toggleHide = () => (showZeroBalance = !showZeroBalance);

	const getItems = async () => {
		loading = true;

		// recreate batchedAccounts every call?
		const batchedAccounts = batchAccounts(keys.length, $selectedAccount);
		const rawBalances = await inventory.methods.balanceOfBatch(batchedAccounts, keys).call();

		items = rawBalances.map((rawBalance: string, index: number) => {
			const tokenId = keys[index];
			return {
				...ALL[tokenId],
				amount: new Decimal($web3.utils.fromWei(rawBalance, ALL[tokenId].unit))
			} as Item;
		});

		loading = false;
	};

	$: getItems();
</script>

<p>Balances of <span class="monospace">{$selectedAccount}</span></p>
<input type="checkbox" on:click={toggleHide} /> show zero amount
<br /><br />
<button on:click={getItems}>Refresh</button>
<!-- arbitrary order -->
<ItemList title="Crops" {showZeroBalance} {loading} record={CROPS} allItems={items} />
<ItemList title="Resources" {showZeroBalance} {loading} record={RESOURCES} allItems={items} />
<ItemList title="NFTs" {showZeroBalance} {loading} record={NFTs} allItems={items} />
<ItemList title="Tools" {showZeroBalance} {loading} record={TOOLS} allItems={items} />
