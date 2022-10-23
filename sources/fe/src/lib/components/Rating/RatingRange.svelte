<script>
  import {
    browser as inBrowser,
  } from '$app/environment';
  import {
    createEventDispatcher,
  } from 'svelte';

  /** @type {Boolean} */
  export let isControl = false;
  /** @type {String} */
  export let id;
  /** @type {String} */
  export let name;
  /** @type {Number} */
  export let min;
  /** @type {Number} */
  export let max;
  /** @type {Number} */
  export let value;

  const dispatch = createEventDispatcher();
  
  let me;

  const handleChanged = (/** @type {Event} */ event) => {
    requestAnimationFrame(() => {
      dispatch('valueChanged', {
        payload: {
          id,
          name,
          // @ts-ignore
          value: parseInt(event.target.value, 10),
        },
      });
    });
  }

  $: if (value) {
    if (inBrowser === true) {
    }
  }
</script>

<style>
  .isControl {
    pointer-events: all;
  }

  input[type='range'] {
    cursor: ew-resize;
  }
</style>

{#if isControl === true}
  <input
    type='range'
    {id}
    {name}
    {min}
    {max}
    class:isControl
    {value}
    bind:this={me}
    on:change|capture|nonpassive|stopPropagation|trusted={handleChanged}
  />
{:else}
  <meter
    {id}
    {min}
    {max}
    low={2}
    high={5}
    optimum={8}
    {value}
    class='value'
    class:isControl
  >{value}</meter>
{/if}