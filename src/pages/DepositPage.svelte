<script lang="ts">
	import { selectedAccount, web3 } from 'svelte-web3';
	import Decimal from 'decimal.js-light';
	import type { Farm, Item } from 'src/types';
	import { ALL } from '../constants';
	import { batchAccounts } from '../utils';

	export let farm: any;
	export let inventory: any;
	let useFarmAddress = true;
	let destAddress = '';
	let selectItems: Item[] = [];

	const toggleUseFarmAddress = () => (useFarmAddress = !useFarmAddress);

	const getFarmAddress = async () => {
		// getFarms returns array so get the 1st element
		const [farmDetail]: [Farm] = await farm.methods
			.getFarms($selectedAccount)
			.call({ from: $selectedAccount });

		destAddress = farmDetail.account;
	};

	const getItems = async () => {
		const keys = Object.keys(ALL) as unknown as number[];
		const batchedAccounts = batchAccounts(keys.length, $selectedAccount);

		const rawBalances = await inventory.methods.balanceOfBatch(batchedAccounts, keys).call();
		selectItems = rawBalances
			.map((rawBalance: string, index: number) => {
				const tokenId = keys[index];
				return {
					...ALL[tokenId],
					amount: new Decimal($web3.utils.fromWei(rawBalance, ALL[tokenId].unit))
				} as Item;
			})
			.filter((item: Item) => item.amount?.gt(0));
	};

	$: if (useFarmAddress) {
		getFarmAddress();
	}

	$: getFarmAddress();
	$: getItems();
</script>

<div class="container">
	<!-- TODO: get farm address and auto populate -->
	<div class="content">
		<h2>Deposit</h2>
		<!-- separate component? -->
		<div class="selection">
			<select>
				{#each selectItems as item}
					<option value={item.tokenId}>{item.name}</option>
				{/each}
			</select>
			<button>Add</button>
		</div>
		<div class="list" />
	</div>
	<div class="footer__container">
		<div class="footer">
			<div class="destination">
				<label for="dest-address">To: </label>
				<input
					type="text"
					name="dest-address"
					placeholder="0x..."
					size="42"
					disabled={useFarmAddress}
					bind:value={destAddress}
				/>
				<br />
				<input type="checkbox" checked={useFarmAddress} on:click={toggleUseFarmAddress} /> farm address
			</div>
			<div class="warning">Always check details before proceeding!</div>
			<button>DEPOSIT</button>
		</div>
	</div>
</div>

<style>
	.container {
		position: relative; /* for footer container position */
		background-color: blanchedalmond;
		border-radius: 10px;
		min-height: 600px;
		min-width: 300px;
	}
	.content {
		padding: 10px;
	}

	.footer__container {
		position: absolute;
		bottom: 0;
		width: 100%;
		margin-bottom: 20px;
	}

	.footer {
		margin: 4px;
		text-align: center;
	}

	.warning {
		padding: 20px;
		font-style: italic;
	}
</style>
