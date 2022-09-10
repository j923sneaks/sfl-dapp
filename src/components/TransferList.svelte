<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { FormData } from '../types';
	import { ALL } from '../constants';

	import TransferListItem from './ui/TransferListItem.svelte';

	export let list: FormData[] = [];
	const dispatch = createEventDispatcher();

	const handleRemoveItem = (index: number) => {
		dispatch('remove', { index });
	};
</script>

<div class="container">
	<h3>Summary</h3>
	<div class="scroll">
		{#each list as item, index}
			<div class="card">
				<button class="right" on:click={() => handleRemoveItem(index)}>X</button>
				<p>To: {item.to}</p>
				{#each item.tokenIds as tokenId, index}
					<TransferListItem item={ALL[tokenId]} amount={item.amounts[index].toNumber()} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		word-wrap: break-word;
	}
	.scroll {
		padding: 0;
		max-height: 400px;
		overflow: auto;
	}
	.card {
		margin: 10px 0;
		background-color: gainsboro;
		border-radius: 10px;
		padding: 10px;
	}

	.right {
		float: right;
	}
</style>
