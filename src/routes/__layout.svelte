<script lang="ts">
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import { defaultEvmStores, makeContractStore } from 'svelte-web3';
	import Decimal from 'decimal.js-light';

	import { inventoryStore, inventoryExtendedStore } from '../stores';
	import { MAINNET } from '../constants';
	import InventoryJSON from '../abi/Inventory.json';
	import InventoryExtendedJSON from '../abi/InventoryExtended.json';

	import NavLinks from '../components/ui/NavLinks.svelte';

	import '../styles/global.css';

	let inventory: any, inventoryExtended: any;

	// acceptable to execute here?
	// initialize contracts and Decimal config to be shared across descendants
	onMount(() => {
		defaultEvmStores.setProvider();

		inventory = makeContractStore(InventoryJSON, MAINNET.INVENTORY) as any;
		inventoryExtended = makeContractStore(InventoryExtendedJSON, MAINNET.INVENTORY_EXTENDED) as any;

		Decimal.set({
			toExpPos: 30,
			toExpNeg: -30
		});
	});

	// react on completed stores
	$: {
		inventoryStore.set($inventory);
		inventoryExtendedStore.set($inventoryExtended);
	}

	const toHome = () => goto('/');
</script>

<header>
	<h3 on:click={toHome}>SFL dApp</h3>
	<NavLinks />
</header>
<main>
	<slot />
</main>
<footer>
</footer>

<style>
	header,
	main,
	footer {
		padding: 0 8px;
	}

	header,
	footer {
		display: flex;
		align-items: center;
		width: 100%;
		margin: 8px 0;
		height: 30px;
	}

	footer {
		justify-content: center;
	}

	header h3 {
		margin-right: 12px;
	}

	header h3:hover {
		cursor: pointer;
	}

	main {
		min-height: calc(100vh - 60px - 32px);
	}
</style>
