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
	import { MAINNET_ADDRESS } from '../constants';
	import ItemListPage from '../pages/ItemListPage.svelte';
	import DepositPage from '../pages/DepositPage.svelte';

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

{#if $connected}
	<section class="detail">
		<p>Connected! chain: {$chainId}</p>
		<p>Balances of <span class="monospace">{$selectedAccount}</span></p>
	</section>
	<section class="lists-deposit">
		<section class="lists">
			<input type="checkbox" on:click={toggleHide} /> show zero balances
			<ItemListPage inventory={$inventory} {showZeroBalance} />
		</section>
		<section class="deposit"><DepositPage /></section>
	</section>
{:else}
	<p>Not connected!</p>
{/if}

<style>
	.lists-deposit {
		display: flex;
		justify-content: space-between;
	}

	.lists {
		width: 70%;
	}

	.deposit {
		width: 30%;
	}
</style>
