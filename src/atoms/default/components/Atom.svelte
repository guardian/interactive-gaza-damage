<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import ScrollyVisualisation from "./ScrollyVisualisation.svelte"
  import ScrollyForeground from "./ScrollyForeground.svelte"
  import BeitHanounIntro from "./BeitHanounIntro.svelte";
  import AlZahraIntro from "./AlZahraIntro.svelte";
  import KhanYounisIntro from "./KhanYounisIntro.svelte";
  import ScrollyBox from "./ScrollyBox.svelte"
  import { fetchAnnotationFeatures } from '../stores/annotations.js';
  import { windowInnerWidth, windowInnerHeight, relativeScrollyInsets } from '$lib/stores/dimensions.js';
  import { onMount } from "svelte";

  let index = 0
  let progress, offset;
  let scrollyReady = false;

  $: step = stepValue(index,progress);
  $: console.log('step', step);

  function stepValue(index, progress) {
    if (progress >= 1) return index + 2;
    else if (progress > 0) return index + 1;
    else return index;
  }

  onMount(async () => {
    await fetchAnnotationFeatures();
    scrollyReady = true;

    // setTimeout(() => {
    //   const element = document.querySelector("#beit-hanoun-intro")
    //   element.scrollIntoView()
    // }, 1000);

    // setTimeout(() => {
    //   const element = document.querySelector("#al-zahra-intro")
    //   element.scrollIntoView()
    // }, 1000);
  })
</script>

<svelte:window bind:innerWidth={$windowInnerWidth} bind:innerHeight={$windowInnerHeight} />

<div class="atom">
    {#if scrollyReady}
    <Scroller top={$relativeScrollyInsets.top} bottom={$relativeScrollyInsets.bottom} threshold="{0.8}" query=".scrolly-foreground-element" bind:index bind:progress bind:offset>
      <div slot="background">
        {#if typeof document !== "undefined"}
          <ScrollyVisualisation {step} offset={Math.max(0, offset)} />
        {/if}
      </div>
      <div slot="foreground">
        <ScrollyForeground>
          <ScrollyBox>
            <p>As of 17 January, analysis of satellite data by Corey Scher of the City University of New York and Jamon van den Hoek of Oregon State University reveals that between 50% and 62% of all buildings in Gaza have likely been damaged or destroyed.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>The Guardian’s interactive scrolls through three such damaged areas of Gaza: Beit Hanoun, al-Zahra and Khan Younis. Where possible, specific instances of damage have been highlighted in yellow in the imagery that follows.</p>
          </ScrollyBox>
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
            <p>A video released on 12 December  — after this satellite image was taken — showed Israeli forces blowing up a school building run by the UNRWA (United Nations Relief and Works Agency for Palestine Refugees). Israel said the building was a Hamas outpost.</p>
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
            <p>A video filmed from a car moving along a road on 25 November showed flattened and damaged buildings in the west of Beit Hanoun.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground type="overlay">
          <AlZahraIntro />
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
            <p>A video from 30 October showed fire and smoke rising from the courtyard of the Turkish-Palestinian Friendship hospital.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>Video footage from 21 October showed 25 apartment blocks in al-Zahra neighbourhood flattened by Israeli airstrike. Hundreds of people were displaced by the strike.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground type="overlay">
          <KhanYounisIntro />
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
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>A video from 23 December showed blown-out shopfronts and extensive damage along a narrow street in Khan Younis, leading on to Jalal street where visible damage could be seen to apartments, bakeries and shops.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>A video from 9 November showed the aftermath of a strike on the Khaled bin al-Walid mosque.</p>
          </ScrollyBox>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
        </ScrollyForeground>
        <ScrollyForeground>
          <ScrollyBox>
            <p>The Guardian has documented the destruction of hundreds of examples of civilian infrastructure critical to the lives of future returnees in the three areas of Gaza it analysed. These are not comprehensive analyses of the entire Gaza Strip, where more damage exists.</p>
          </ScrollyBox>
        </ScrollyForeground>
      </div>
    </Scroller>
    {/if}
</div>

<style lang="scss">
  .atom {
    border-top: 12px solid #121212;
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
    pointer-events: all;
  }

  p:last-child {
    margin-bottom: 0;
  }

  // a {
  //   color: #C70000 !important;
  // }
</style>
