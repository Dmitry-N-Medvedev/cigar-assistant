<script>
  import {
    browser as isBrowser,
  } from '$app/environment';
  import {
    onMount,
    onDestroy,
  } from 'svelte';

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
<section id='left'>left</section>
<main>
  <slot />
</main>
<section id='right'>right</section>
<footer>footer</footer>