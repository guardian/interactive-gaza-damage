<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import ScrollyVisualisation from "./ScrollyVisualisation.svelte"
  import ScrollyForeground from "./ScrollyForeground.svelte"
  import ScrollyBox from "./ScrollyBox.svelte"
  import BeitHanounIntro from "./BeitHanounIntro.svelte";
  import { windowInnerWidth, windowInnerHeight } from '$lib/stores/dimensions.js';

  let index = 0
  let progress, offset;

  $: step = progress > 0 ? index + 1 : index;
  // $: step = index;
  $: console.log('step', step);
</script>

<svelte:window bind:innerWidth={$windowInnerWidth} bind:innerHeight={$windowInnerHeight} />

<div class="atom">
    <Scroller top="{0}" bottom="{1}" threshold="{0.8}" query=".scrolly-foreground-element" bind:index bind:progress bind:offset>
      <div slot="background">
        {#if typeof document !== "undefined"}
          <ScrollyVisualisation {step} {offset} />
        {/if}
      </div>
      <div slot="foreground">
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground type="overlay">
          <BeitHanounIntro />
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
      </div>
    </Scroller>
</div>

<style lang="scss">
  .atom {
    border-top: 12px solid #121212;
    border-bottom: 12px solid #121212;
    overflow: hidden;
    background-color: #FFF;
  }

  [slot="foreground"] {
    padding-top: 95vh;
	}

  p {
    @include f-bodyCopy();
    font-size: 17px;
    line-height: 1.4;
    font-weight: 400;
    margin-bottom: 14px;
    color: #121212;
  }

  p:last-child {
    margin-bottom: 0;
  }

  a {
    color: #C70000 !important;
  }
</style>
