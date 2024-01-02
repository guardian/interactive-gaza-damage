<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import ScrollyVisualisation from "./ScrollyVisualisation.svelte"
  import ScrollyForeground from "./ScrollyForeground.svelte"
  import ScrollyBox from "./ScrollyBox.svelte"
  import BeitHanounIntro from "./BeitHanounIntro.svelte";
  import SecondOverlaySection from "./SecondOverlaySection.svelte";
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
        <ScrollyForeground>
          <ScrollyBox>
            <p>More than <strong>384,000 raw sewage discharges</strong> were reported by water companies across England and Wales in 2022, adding up to <strong>2.3m hours of spilling</strong>.</p>
            <p>In the vast majority of these cases, including the ones highlighted here, we do not have the data to analyse whether any specific discharge was legal or illegal.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground type="overlay">
          <BeitHanounIntro />
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Those four treatment works collectively spilled 1,839 hours in 2022 — the equivalent to almost 77 days, according to public records.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Mogden, close to the River Thames, also tracks the volume of raw sewage it discharges.</p>
            <p>Between early 2019 and May this year it spilled <strong>20.6bn litres</strong> – the equivalent to roughly <strong>8,000 Olympic pools</strong>, according to data released by Thames Water in response to an environmental information request.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Importantly, those numbers cannot be extrapolated to the rest of the country, as it serves about 2.1 million people and is many times larger than most treatment works.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>When spills occur at Mogden, untreated sewage is piped to a discharge point that feeds directly into the River Thames.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground type="overlay">
          <SecondOverlaySection />
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox --background-color="rgba(241, 239, 236, 0.9)">
            <p>Only 15% of rivers in England achieved good ecological status in 2019, down from 23% in 2009.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox --background-color="rgba(241, 239, 236, 0.9)">
            <p>In Wales, things are a little better, with 45% of rivers achieving good ecological status in 2021. This was an improvement from 2009, when only 27% made the mark.</p>
          </ScrollyBox>
        </ScrollyForeground>
      </div>
    </Scroller>
</div>

<style lang="scss">
  .atom {
    border-top: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
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
