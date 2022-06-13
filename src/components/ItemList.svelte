<script lang="ts">
	import type { Item, ItemRecord } from '../types';
	import ItemCard from './ui/ItemCard.svelte';

	export let allItems: Item[] = [];
	export let showZeroBalance = false;
	export let title = '';
	export let record: ItemRecord = {};
	export let loading = false;

	$: keys = Object.keys(record).map(Number);

	$: categorizedList = allItems.filter((item: Item) => keys.includes(item.tokenId));

	$: filteredList = showZeroBalance
		? categorizedList
		: categorizedList.filter((item: Item) => item.amount?.gt(0));
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
