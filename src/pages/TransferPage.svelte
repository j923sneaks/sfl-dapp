<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { batchAccounts } from '../utils';

	import { inventoryStore } from '../stores';

	import type { FormData, Item } from 'src/types';
	import { ALL } from '../constants';

	import TransferForm from '../components/TransferForm.svelte';
	import TransferList from '../components/TransferList.svelte';

	let items: Item[] = [];
	let batchTransfer: FormData[] = [];
	const keys = Object.keys(ALL).map(Number);

	const getItems = async () => {
		const rawBalances = await $inventoryStore?.methods.balanceOfBatch(batchedAccounts, keys).call() || [];
		items = rawBalances
			.map((rawBalance: string, index: number) => {
				const tokenId = keys[index];
				return {
					...ALL[tokenId],
					amount: new Decimal($web3.utils.fromWei(rawBalance, ALL[tokenId].unit)),
					disabled: false,
				} as Item;
			})
			.filter((item: Item) => item.amount?.gt(0));
	};

	// enable, subtract amounts from select items, add to batchTransfer
	const handleFormSave = (event: any) => {
		const { tokenIds, amounts } = event.detail;

		// @todo more efficient way
		for (let i in tokenIds) {
			const index = items.findIndex((item) => item.tokenId === tokenIds[i]);

			items[index].disabled = false;
			items[index].amount = items[index].amount?.minus(amounts[i]);
		}

		batchTransfer.push(event.detail);

		items = items;
		batchTransfer = batchTransfer;
	};

	$: batchedAccounts = batchAccounts(keys.length, $selectedAccount);

	$: ($inventoryStore && batchedAccounts), getItems();
</script>
<div>
	<!-- Form Page -->
	<TransferForm selectItems={items} on:save={handleFormSave} />
	<!-- Summary Page -->
	<TransferList list={batchTransfer} />
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
