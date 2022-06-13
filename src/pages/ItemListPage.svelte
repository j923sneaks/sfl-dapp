<script lang="ts">
	import { selectedAccount } from 'svelte-web3';

	import ItemList from '../components/ItemList.svelte';
	import { CROPS, NFTs, RESOURCES, TOOLS } from '../constants';

	export let inventory: any;
	let showZeroBalance = false;

	const toggleHide = () => (showZeroBalance = !showZeroBalance);
</script>

<!-- arbitrary order -->
<p class="">Balances of <span class="monospace">{$selectedAccount}</span></p>
<input type="checkbox" on:click={toggleHide} /> show zero balances
<ItemList {inventory} {showZeroBalance} record={CROPS} title="Crops" />
<ItemList {inventory} {showZeroBalance} record={RESOURCES} title="Resources" />
<ItemList {inventory} {showZeroBalance} record={NFTs} title="NFTs" />
<ItemList {inventory} {showZeroBalance} record={TOOLS} title="Tools" />


