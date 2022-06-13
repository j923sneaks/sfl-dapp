<script lang="ts">
	import { selectedAccount } from 'svelte-web3';

	import ItemList from '../components/ItemList.svelte';
	import { CROPS, NFTs, RESOURCES, TOOLS } from '../constants';

	export let inventory: any;
	let showZeroBalance = false;
	let cropsList: any;
	let resourcesList: any;
	let nftsList: any;
	let toolsList: any;

	const toggleHide = () => (showZeroBalance = !showZeroBalance);

	const refreshAll = () => {
		cropsList.getItems();
		resourcesList.getItems();
		nftsList.getItems();
		toolsList.getItems();
	};
</script>

<!-- arbitrary order -->
<p class="">Balances of <span class="monospace">{$selectedAccount}</span></p>
<input type="checkbox" on:click={toggleHide} /> show zero amount
<br /><br />
<button on:click={refreshAll}>Refresh</button>
<ItemList title="Crops" {inventory} {showZeroBalance} record={CROPS} bind:this={cropsList} />
<ItemList
	title="Resources"
	{inventory}
	{showZeroBalance}
	record={RESOURCES}
	bind:this={resourcesList}
/>
<ItemList title="NFTs" {inventory} {showZeroBalance} record={NFTs} bind:this={nftsList} />
<ItemList title="Tools" {inventory} {showZeroBalance} record={TOOLS} bind:this={toolsList} />
