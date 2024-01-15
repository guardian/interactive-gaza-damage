<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import ScrollyVisualisation from "./ScrollyVisualisation.svelte"
  import ScrollyForeground from "./ScrollyForeground.svelte"
  import BeitHanounIntro from "./BeitHanounIntro.svelte";
  import ScrollyBox from "./ScrollyBox.svelte"
  import { loadAnnotationFeatures } from '../stores/annotations.js';
  import { windowInnerWidth, windowInnerHeight } from '$lib/stores/dimensions.js';
  import { onMount } from "svelte";

  let index = 0
  let progress, offset;
  let scrollyReady = false;

  $: step = progress > 0.02 ? index + 1 : index;
  $: console.log('step', step);

  onMount(async () => {
    await loadAnnotationFeatures();
    scrollyReady = true;
  })
</script>

<svelte:window bind:innerWidth={$windowInnerWidth} bind:innerHeight={$windowInnerHeight} />

<div class="atom">
    {#if scrollyReady}
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
        <ScrollyForeground>
          <ScrollyBox>
            <p>A video from early December showed Israeli forces blowing up a UNRWA school building in Beit Hanoun.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Video filmed from a car moving along a road in November showed flattened and damaged buildings in the west of Beit Hanoun.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
      </div>
    </Scroller>
    {/if}
</div>

<style lang="scss">
  .atom {
    border-top: 12px solid #121212;
    border-bottom: 12px solid #121212;
    overflow: hidden;
    background-color: #FFF;
    pointer-events: none;
  }

  [slot="foreground"] {
    padding-top: 95vh;
    pointer-events: none;
	}

  [slot="background"] {
    pointer-events: none;
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

  // a {
  //   color: #C70000 !important;
  // }
</style>
