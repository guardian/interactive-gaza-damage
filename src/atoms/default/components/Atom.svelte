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
  $: console.log('step', step);
</script>

<svelte:window bind:innerWidth={$windowInnerWidth} bind:innerHeight={$windowInnerHeight} />

<div class="atom">
    <Scroller top="{0}" bottom="{1}" threshold="{0.8}" query=".scrolly-foreground-element" bind:index bind:progress bind:offset>
      <div slot="background">
          <ScrollyVisualisation {step} {offset} />
      </div>
      <div slot="foreground">
        <ScrollyForeground type="overlay">
          <BeitHanounIntro />
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Six of those companies <a href="https://www.theguardian.com/business/2023/aug/09/public-could-receive-hundreds-of-millions-as-water-firms-face-sewage-lawsuit">now face a class action legal claim</a> alleging that they have failed to reveal the true scale of raw sewage discharges.</p>
            <p>A spokesperson for Water UK, the industry body, has described the claim as “entirely without merit”.</p>
          </ScrollyBox>
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
