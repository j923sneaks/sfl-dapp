<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { batchAccounts } from '../utils';

	import { inventoryStore } from '../stores';

	import type { Item } from 'src/types';
	import { ALL } from '../constants';

	import TransferForm from '../components/TransferForm.svelte';

	let items: Item[] = [];
	const keys = Object.keys(ALL).map(Number);

	const getItems = async () => {
		const rawBalances = await $inventoryStore?.methods.balanceOfBatch(batchedAccounts, keys).call() || [];
		items = rawBalances
			.map((rawBalance: string, index: number) => {
				const tokenId = keys[index];
				return {
					...ALL[tokenId],
					amount: new Decimal($web3.utils.fromWei(rawBalance, ALL[tokenId].unit))
				} as Item;
			})
			.filter((item: Item) => item.amount?.gt(0));
	};

	const handleFormSave = (event: any) => {
		console.log(event.detail);
	};

	$: batchedAccounts = batchAccounts(keys.length, $selectedAccount);

	$: ($inventoryStore && batchedAccounts), getItems();
</script>
<div>
	<!-- Form Page -->
	<TransferForm {items} on:save={handleFormSave} />
	<!-- Summary Page -->
	<!-- Confirm Modal ? -->
</div>
<style>
 /* pad when screen is larger */
 @media screen and (min-width: 640px) {
	div {
		padding: 0 20%;
	}
 }
</style>
