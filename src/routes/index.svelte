<script lang="ts">
	import { chainId, connected, defaultEvmStores, makeContractStore } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { onMount } from 'svelte/internal';

	import InventoryJSON from '../abi/Inventory.json';
	import FarmJSON from '../abi/Farm.json';
	import ItemListPage from '../pages/ItemListPage.svelte';
	import DepositPage from '../pages/DepositPage.svelte';
	import { MAINNET } from '../constants';

	/**
	 * TODO: find a way to avoid prop drilling
	 */
	let inventory: any;
	let farm: any;

	onMount(() => {
		defaultEvmStores.setProvider();

		inventory = makeContractStore(InventoryJSON, MAINNET.INVENTORY) as any;
		farm = makeContractStore(FarmJSON, MAINNET.FARM) as any;

		// global setting
		Decimal.set({
			toExpPos: 30,
			toExpNeg: -30
		});
	});
</script>

{#if $connected}
	<section class="detail">
		<p>Connected! chain: {$chainId}</p>
	</section>
	<section class="lists-deposit">
		<section class="lists">
			<ItemListPage inventory={$inventory} />
		</section>
		<section class="deposit"><DepositPage farm={$farm} inventory={$inventory} /></section>
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
		word-wrap: break-word;
	}

	.deposit {
		width: 30%;
	}

	@media screen and (max-width: 400px) {
		.lists-deposit {
			flex-direction: column-reverse;
		}
	}
</style>
