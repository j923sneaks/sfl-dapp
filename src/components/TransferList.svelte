<script lang="ts">
  import type { FormData } from "../types";
  import { ALL } from '../constants';

  import TransferListItem from "./ui/TransferListItem.svelte";

  export let list: FormData[] = [];

</script>

<div class="container">
  {#each list as item}
    <div>
      <p>To: {item.to}</p>
      {#each item.tokenIds as tokenId, index}
        <TransferListItem item={ALL[tokenId]} amount={item.amounts[index].toNumber()} />
      {/each}
    </div>
  {/each}
</div>