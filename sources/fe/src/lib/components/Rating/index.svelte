<script>
  import {
    browser as isBrowser,
  } from '$app/environment';
	import { get } from 'svelte/store';
  import RatingRange from './RatingRange.svelte';
  import {
    FilterStore,
  } from '$lib/stores/filter.store';
  /**
	 * @type {any}
	 */
  export let items;
  export let isControl = false;

  const handleValueChanged = (/** @type {CustomEvent} */ customEvent) => {
    const {
      detail: {
        payload: {
          id,
          name,
          value,
        },
      },
    } = customEvent;

    FilterStore.setFilter({ name, value });
  }

  $: if (items) {
    const initialValues = [];

    for (const item of items) {
      initialValues.push([item.n, item.v]);
    }

    FilterStore.populate(initialValues);
  }
</script>

<style>
  :root {
    --radial-ctrl-value-padding: 0.25vw;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    /* gap: min(0.25vh, 0.25vw); */
    aspect-ratio: 1 / 1;
  }

  li {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      'label control'
    ;
  }

  li > :first-child,
  li > :last-child {
    display: flex;
    flex: 1 0 100%;
    align-items: center;
  }

  li > :first-child {
    grid-area: label;
    justify-content: start;
    cursor: pointer;
  }

  li > :last-child {
    grid-area: control;
    justify-content: end;
    cursor: ew-resize;
  }

  .isControl {
    pointer-events: all;
  }
</style>

<ul>
  {#each items as {i, mn, mx, n, l, v}(i)}
    <li>
      <label
        for={i}
        class='key'
        class:isControl
      >
        {l}
      </label>
      <RatingRange
        id={i}
        name={n}
        min={mn}
        max={mx}
        value={v}
        {isControl}
        on:valueChanged={handleValueChanged}
      />
    </li>
  {/each}
</ul>