<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { batchAccounts } from '../utils';
	import type { Item, ItemRecord } from '../types';
	import ItemCard from './ui/ItemCard.svelte';

	export let inventory: any;
	export let showZeroBalance = false;
	export let record: ItemRecord = {};
	export let title = '';
	let loading = false;
	let items: Item[] = [];

	// TODO finalize placement of function i.e. here or on parent component???
	export const getItems = async () => {
		console.log('getting items...');
		loading = true;

		const keys = Object.keys(record) as unknown as number[];

		const cropRawBalances = await inventory.methods
			.balanceOfBatch(batchAccounts(keys.length, $selectedAccount), keys)
			.call();

		items = cropRawBalances.map((rawBalance: string, index: number) => {
			const tokenId = keys[index];
			return {
				...record[tokenId],
				amount: new Decimal($web3.utils.fromWei(rawBalance, record[tokenId].unit))
			} as Item;
		});

		loading = false;
	};

	$: filteredList = showZeroBalance ? items : items.filter((item: Item) => item.amount?.gt(0));

	getItems();
</script>

<h2>{title}</h2>
{#if loading}
	<span>Loading...</span>
{:else if filteredList.length}
	<div class="list">
		{#each filteredList as item}
			<ItemCard {item} />
		{/each}
	</div>
{:else}
	<span>Empty list</span>
{/if}

<style>
	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
