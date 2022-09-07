<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { web3 } from 'svelte-web3';
  import Decimal from 'decimal.js-light';

  import type { Item } from '../types';
  import { ALL } from '../constants';

  export let selectItems: Item[] = [];
  const dispatch = createEventDispatcher();
  const VALID_NUMBER = new RegExp(/^\d*\.?\d*$/);

  type FormData = {
    to: string;
    tokenIds: number[];
    amounts: Decimal[];
  };

  type ToAdd = {
    tokenId: number;
    amount: number;
  };

  let formData: FormData = { to: '', tokenIds: [], amounts: [] };
  let itemToAdd: ToAdd = { tokenId: 0, amount: 0 };
  let isAddDisabled = true;
  let isSaveDisabled = true;
  let list: ToAdd[] = [];

  const handleItemChange = () => (itemToAdd.amount = 0);

  const handleAmountChange = (event: any) => {
    // validate amount, reset to 0 if error
    itemToAdd.amount = VALID_NUMBER.test(event.target.value) ? Number(event.target.value) : 0;
  };

  // add to formData, remove from selectItems, reset itemToAdd
  const handleAdd = () => {
    const { amount, tokenId } = itemToAdd;
    const index = selectItems.findIndex((item) => item.tokenId === tokenId);

    if (index === -1) return;

    selectItems.splice(index, 1);
    formData.tokenIds.push(tokenId);
    formData.amounts.push(new Decimal(amount));
    itemToAdd = { tokenId: 0, amount: 0 };

    // re render
    formData = formData;
    selectItems = selectItems;

  };

  const handleSave = () => {
    dispatch('save', { 
      ...formData 
    });
  };

  // validate itemToAdd
  $: {
    const { amount, tokenId } = itemToAdd;
    const index = selectItems.findIndex((item) => item.tokenId === tokenId);

    isAddDisabled = 
      index === -1 || 
      amount === null ||
      amount === 0 || 
      new Decimal(amount).greaterThan(selectItems[index]?.amount || new Decimal(0));
  };

  $: {
    list = [];
    for (let index in formData.tokenIds) {
      list.push({
        tokenId: formData.tokenIds[index],
        amount: formData.amounts[index].toNumber(),
      });
    }

    list = list;
  }

</script>
<div class="container">
  <div class="container__block">
    <label for="destAddress">To:</label>
    <input type="text" name="destAdress" placeholder="address" bind:value={formData.to} />
  </div>
  <div class="container__block">
    <select bind:value={itemToAdd.tokenId} on:change={handleItemChange}>
      <option value={0} hidden disabled>select item</option>
      {#each selectItems as item}
        <option value={item.tokenId}>{item.name}</option>
      {/each}
    </select>
    <input type="number" name="amount" min="0" bind:value={itemToAdd.amount} on:input={handleAmountChange} />
    <button disabled={isAddDisabled} on:click={handleAdd}>Add</button>
  </div>
  <div class="container__block">
    <ul>
      {#each list as item}
        <li>{ALL[item.tokenId].name} - {item.amount}</li>
      {/each}
    </ul>
  </div>
  <button disabled={isSaveDisabled} on:click={handleSave}>Save</button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    background-color:ghostwhite;
    border-radius: 10px;
    padding: 10px 64px;
  }

  .container__block {
    margin: 10px;
  }
</style>