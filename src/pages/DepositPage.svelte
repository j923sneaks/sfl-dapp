<script lang="ts">
	import Deposit from "../components/Deposit.svelte";
	export let farm: any;
	export let inventory: any;
</script>

<Deposit {farm} {inventory} />
