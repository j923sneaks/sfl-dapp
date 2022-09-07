<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { web3 } from 'svelte-web3';
  import Decimal from 'decimal.js-light';

  import type { Item } from '../types';
  import { ALL } from '../constants';

  import TransferListItem from './ui/TransferListItem.svelte';

  type SelectItem = Item & { disabled: Boolean };

  type FormData = {
    to: string;
    tokenIds: number[];
    amounts: Decimal[];
  };

  type ToAdd = {
    tokenId: number;
    amount: number;
  };

  export let items: Item[] = [];
  const dispatch = createEventDispatcher();
  const VALID_NUMBER = new RegExp(/^\d*\.?\d*$/);

  let selectItems: SelectItem[] = []; // array to be manipulated
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

  // add to formData, hide in selectItems, reset itemToAdd
  const handleAdd = () => {
    const { amount, tokenId } = itemToAdd;
    const index = selectItems.findIndex((item: Item) => item.tokenId === tokenId);

    if (index === -1) return;

    formData.tokenIds.push(tokenId);
    formData.amounts.push(new Decimal(amount));
    itemToAdd = { tokenId: 0, amount: 0 };
    
    selectItems[index].disabled = true;

    // re render
    formData = formData;
    selectItems = selectItems;
  };

  // remove from formData, show in selectItems
  const handleListItemClick = (index: number) => {
    const { tokenId } = list[index];
    const selectItemIndex = selectItems.findIndex((item: Item) => item.tokenId === tokenId);

    if (selectItemIndex === -1) return;

    selectItems[selectItemIndex].disabled = false;

    formData.tokenIds.splice(index, 1);
    formData.amounts.splice(index, 1);

    // re render
    formData = formData;
    selectItems = selectItems;
  };

  const handleSave = () => {
    dispatch('save', { 
      ...formData 
    });
  };

  $: selectItems = items as SelectItem[];

  // validate itemToAdd
  $: {
    const { amount, tokenId } = itemToAdd;
    const index = selectItems.findIndex((item: Item) => item.tokenId === tokenId);

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
        <option value={item.tokenId} disabled={!!item.disabled}>{item.name}</option>
      {/each}
    </select>
    <input type="number" name="amount" min="0" bind:value={itemToAdd.amount} on:input={handleAmountChange} />
    <button disabled={isAddDisabled} on:click={handleAdd}>Add</button>
  </div>
  <div class="container__block">
    {#each list as item, index}
      <TransferListItem hasClose item={ALL[item.tokenId]} amount={item.amount} on:click={() => handleListItemClick(index)}/>
    {/each}
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

  @media screen and (max-width: 640px) {
    .container {
      padding: 10px;
    }
  }

  .container__block {
    margin: 10px;
  }
</style>