<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import { batchAccounts } from '../utils';

	import { inventoryStore, inventoryExtendedStore } from '../stores';

	import type { FormData, Item } from 'src/types';
	import { ALL } from '../constants';

	import TransferForm from '../components/TransferForm.svelte';
	import TransferList from '../components/TransferList.svelte';

	const keys = Object.keys(ALL).map(Number);
	let items: Item[] = [];
	let batchTransfer: FormData[] = [];

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
	const handleFormSave = (event: CustomEvent) => {
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

	// remove from batchTransfer, add amounts to items
	const handleRemove = (event: CustomEvent) => {
		const { index } = event.detail;

		for (let i = 0; i < batchTransfer[index].tokenIds.length; i += 1) {
			const itemIndex = items.findIndex((item) => item.tokenId === batchTransfer[index].tokenIds[i]);

			items[itemIndex].amount = items[itemIndex].amount?.add(batchTransfer[index].amounts[i]);
		}

		batchTransfer.splice(index, 1);

		// re render
		batchTransfer = batchTransfer;
		items = items;
	};

	// convert Decimal to wei, contract call
	const handleTransfer = async () => {
		const gasPrice = await $web3.eth.getGasPrice();
		const sanitized = [];

		for (let transfer of batchTransfer) {

			sanitized.push([
				transfer.to,
				transfer.tokenIds,
				transfer.amounts.map((amount) => $web3.utils.toWei(amount.toString())),
			]);
		}

		await $inventoryExtendedStore.methods.multiItemMultiTransfer(sanitized).send({ from: $selectedAccount, gasPrice });
	};

	$: batchedAccounts = batchAccounts(keys.length, $selectedAccount);

	$: ($inventoryStore && batchedAccounts), getItems();
</script>
<div>
	<!-- Form Page -->
	<TransferForm selectItems={items} on:save={handleFormSave} />
	<!-- Summary Page -->
	<TransferList list={batchTransfer} on:remove={handleRemove}/>
	<!-- Transfer Button -->
	<button class="transfer" disabled={!batchTransfer.length} on:click={handleTransfer}>Transfer</button>
	<!-- Results? -->
	<!-- Confirm Modal ? -->
</div>
<style>
 /* pad when screen is larger */
 @media screen and (min-width: 640px) {
	div {
		padding: 0 20%;
	}
 }

 .transfer {
	width: 100%;
	margin-top: 10px;
 }
</style>
