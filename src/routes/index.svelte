<script lang="ts">
	import { connected } from 'svelte-web3';
	import ItemListPage from '../pages/ItemListPage.svelte';
</script>

{#if $connected}
	<ItemListPage />
{:else}
	<p>Not connected!</p>
{/if}
