<script lang="ts">
	import {
		chainId,
		connected,
		defaultEvmStores,
		makeContractStore,
		selectedAccount
	} from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { onMount } from 'svelte/internal';

	import InventoryJSON from '../abi/Inventory.json';
	import { CROPS, FLAGS, MAINNET_ADDRESS, NFTs, RESOURCES, TOOLS } from '../constants';

	import ItemList from '../components/ItemList.svelte';

	let inventory: any;
	// todo get from localstorage?
	let showZeroBalance = false;

	onMount(() => {
		defaultEvmStores.setProvider();

		inventory = makeContractStore(InventoryJSON, MAINNET_ADDRESS) as any;

		// global setting
		Decimal.set({
			toExpPos: 30,
			toExpNeg: -30
		});
	});

	const toggleHide = () => (showZeroBalance = !showZeroBalance);
</script>

<h1>SFL Item Batch Transfers</h1>
{#if $connected}
	<p>Connected! chain: {$chainId}</p>
	<p>Balances of <span class="monospace">{$selectedAccount}</span></p>
	<input type="checkbox" on:click={toggleHide} /> show zero balances
	<!-- arbitrary order -->
	<ItemList inventory={$inventory} {showZeroBalance} record={CROPS} title="Crops" />
	<ItemList inventory={$inventory} {showZeroBalance} record={RESOURCES} title="Resources" />
	<ItemList inventory={$inventory} {showZeroBalance} record={NFTs} title="NFTs" />
	<ItemList inventory={$inventory} {showZeroBalance} record={TOOLS} title="Tools" />
	<ItemList inventory={$inventory} {showZeroBalance} record={FLAGS} title="Flags" />
{:else}
	<p>Not connected!</p>
{/if}
