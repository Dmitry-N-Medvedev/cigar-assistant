<script>
  import {
    browser as isBrowser,
  } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';
  import TastesRadialChart from '$lib/components/TastesRadialChart/index.svelte';
  import Rating from '$lib/components/Rating/index.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  onMount(() => {
    if (isBrowser === true) {}
  });

  onDestroy(() => {
    if (isBrowser === true) {}
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