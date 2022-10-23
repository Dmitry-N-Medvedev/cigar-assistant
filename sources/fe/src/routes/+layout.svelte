<script>
  import {
    browser as inBrowser,
  } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import {
    FilterStore,
  } from '$lib/stores/filter.store';
  import TastesRadialChart from '$lib/components/TastesRadialChart/index.svelte';
  import Rating from '$lib/components/Rating/index.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  const unsubscribeFromFilterStore = FilterStore.subscribe((state) => {
    if (state.size === 0) {
      return;
    }

    console.log('FilterStore:', state);
  });

  onMount(() => {
    if (inBrowser === true) {}
  });

  onDestroy(() => {
    if (inBrowser === true) {}

    unsubscribeFromFilterStore();
  });
</script>

<style>
</style>

<header>header</header>
<section id='left'>
  <TastesRadialChart />
  <Rating items={data?.ratingFilterItems} isControl={true} />
</section>
<main>
  <slot />
</main>
<section id='right'>right</section>
<footer>footer</footer>