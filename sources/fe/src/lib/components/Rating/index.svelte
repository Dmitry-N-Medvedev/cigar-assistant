<script>
  export let items;
  export let isControl = false;
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

    /* background-color: antiquewhite; */
  }

  li {
    display: flex;
    align-items: stretch;
  }

  .key, .value, meter {
    display: flex;
    flex: 1 0 50%;
    align-items: center;
    height: 100%;
  }

  .key {
    justify-content: start;
  }

  .value, meter {
    justify-content: end;
  }

  label {
    cursor: pointer;
  }

  input[type='range'] {
    cursor: ew-resize;
  }

  .isControl {
    pointer-events: all;
  }
</style>

<ul>
  {#each items as {i, mn, mx, n, l, v}(i)}
    <li>
      <label for={i} class='key' class:isControl>{l}</label>
      {#if isControl === true}
        <input type='range' id={i} name={n} min={mn} max={mx} value={v} class='value' class:isControl />
        {:else}
        <meter id={i} min={mn} max={mx} low={2} high={5} optimum={8} value={v} class='value' class:isControl>{v}</meter>
      {/if}
    </li>
  {/each}
</ul>