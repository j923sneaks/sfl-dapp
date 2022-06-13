<script lang="ts">
  import { selectedAccount } from "svelte-web3";
  import type { Farm } from "src/types";

  export let farm: any;
  let useFarmAddress = true;
  let destAddress =  "";

  const toggleUseFarmAddress = () => useFarmAddress = !useFarmAddress;

  const getFarmAddress = async () => {
    // getFarms returns array so get the 1st element
    const [farmDetail]: [Farm] = await farm.methods.getFarms($selectedAccount).call({ from: $selectedAccount });

    destAddress = farmDetail.account;
  };

  $: if (useFarmAddress) {
    getFarmAddress();
  }

  getFarmAddress();
</script>

<div class="container">
	<!-- TODO: get farm address and auto populate -->
  <div class="content">
    <h2>Deposit</h2>
    <div class="">

    </div>
  </div>
  <div class="footer__container">
    <div class="footer">
      <div class="destination">
        <label for="dest-address">To: </label>
        <input type="text" name="dest-address" placeholder="0x..." size="42" disabled={useFarmAddress} bind:value={destAddress} />
        <br>
        <input type="checkbox" checked={useFarmAddress}  on:click={toggleUseFarmAddress} /> farm address
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
