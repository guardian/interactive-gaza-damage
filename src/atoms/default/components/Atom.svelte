<script>
  import { windowInnerWidth, windowInnerHeight } from '$lib/stores/dimensions.js';

  export let name = "atom";
</script>

<svelte:window bind:innerWidth={$windowInnerWidth} bind:innerHeight={$windowInnerHeight} />

<div class="atom">
  <h2>Hello {name}</h2>
</div>

<style lang="scss">
  h2 {
    @include f-headline();
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
