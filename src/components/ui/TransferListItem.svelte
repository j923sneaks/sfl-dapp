<script lang="ts">
  import type { Item } from "../../types";

  export let item: Item = { tokenId: 0 };
  export let amount = 0;
  export let hasClose = false;
</script>

<div class="container">
  <div>{item.name}</div>
  <div>{amount}</div>
  {#if hasClose}
    <div><button class="right" on:click>X</button></div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }

  .container div {
    width: 30%;
  }

  .right {
    float: right;
  }
</style>