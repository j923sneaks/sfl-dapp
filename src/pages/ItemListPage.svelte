<script lang="ts">
	import ItemList from '../components/ItemList.svelte';
	import { CROPS, NFTs, RESOURCES, TOOLS } from '../constants';

	export let inventory: any;
	export let showZeroBalance = false;
</script>

<!-- arbitrary order -->
<ItemList {inventory} {showZeroBalance} record={CROPS} title="Crops" />
<ItemList {inventory} {showZeroBalance} record={RESOURCES} title="Resources" />
<ItemList {inventory} {showZeroBalance} record={NFTs} title="NFTs" />
<ItemList {inventory} {showZeroBalance} record={TOOLS} title="Tools" />
