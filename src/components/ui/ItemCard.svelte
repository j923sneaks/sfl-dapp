<script lang="ts">
	import type { Item } from '../../types';

	export let item: Item | undefined = undefined;
</script>

<!-- TEMPORARY UI COMPONENT UNTIL USE OF MATERIAL UI -->

{#if item}
	<div class="card">
		{#if item.imageUrl}
			<img src={item.imageUrl} alt={item.name} height="70%" width="100%" />
		{/if}
		<div class="content">
			<span class="title">
				<strong>{item.name}</strong>
				<span class="right gray">{item.tokenId}</span>
			</span>
			<br />
			<span>Balance: {item.amount?.toString()}</span>
		</div>
	</div>
{/if}

<style>
	.card {
		height: 250px;
		width: 200px;
		background-color: gainsboro;
		border-radius: 10px;
		margin: 4px;
	}

	img {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.content {
		padding: 8px;
	}

	.right {
		float: right;
	}

	.gray {
		color: grey;
	}
</style>
