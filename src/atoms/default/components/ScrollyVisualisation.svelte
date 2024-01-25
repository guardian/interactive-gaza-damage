<script>
    import { fade } from "svelte/transition";
    import { getCameraForStep, map, mapReady, mapWidth, mapHeight, canInterpolateCamera, interpolateBetween } from "../stores/camera.js";
    import { scrollyConfigForStep } from '../stores/config.js';
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "./AnnotationsLayer.svelte"
    import VideoOverlay from "$lib/components/VideoOverlay.svelte";
    import InsetMap from "./InsetMap.svelte";
    import DamageKey from "./DamageKey.svelte";
    import BeforeAfterHint from "./BeforeAfterHint.svelte";
    import { onDestroy } from "svelte";

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    let cameraPosition;

    function updateCameraPosition(getCameraForStep, step, offset) {
        if (step >= 42) return;

        const start = getCameraForStep(step);
        if (cameraPosition === undefined) {
            cameraPosition = start
            return;
        }

        const end = getCameraForStep(step + 1);
        if (!start || !end || start === end) return;

        if (canInterpolateCamera(start) && canInterpolateCamera(end)) {
            cameraPosition = interpolateBetween(start, end, offset)
        } else {
            throw "Unable to interpolate camera position"
        }
    }

    // uncomment for scroll animations
    $: $mapReady && updateCameraPosition($getCameraForStep, step, offset)

    // uncomment for smooth animations
    // $: cameraPosition = $mapReady && {
    //     ...$getCameraForStep(step),
    //     animate: true,
    // };

    $: scrollyConfig = $scrollyConfigForStep(step)
    $: scrollyConfigForNextStep = offset > 0.4 ? $scrollyConfigForStep(step+1) : scrollyConfig;
    $: blurAmount = scrollyConfig.video ? 5 : 0;
    $: $map && $map.updateHighlightedAnnotations(scrollyConfigForNextStep.highlighted)

    let isShowingBefore;
    $: showBeforeOnHover = (scrollyConfig.annotationsInFocus instanceof Array) && scrollyConfig.area;

    onDestroy(() => {
        map.set(null)
    })
</script>

<div class="background-container"  bind:clientWidth={$mapWidth} bind:clientHeight={$mapHeight}>
    <div class="map-container" style="--blur-amount: {blurAmount}px;">
        <Map 
            bind:this={$map} 
            bind:isReady={$mapReady} 
            bind:isShowingBefore
            {step} 
            {cameraPosition} 
            interactive={false}
            {showBeforeOnHover}
            />
    </div>
    {#if $map}
        <div class="annotations-layer">
            <AnnotationsLayer area={scrollyConfig.area} annotationsInFocus={scrollyConfigForNextStep.annotationsInFocus} project={$map.project} onMapMove={$map.onMove} />   
        </div>           
    {/if}
    {#if scrollyConfigForNextStep.inset}
        <div class="map-overlay" out:fade>
            <InsetMap id={scrollyConfigForNextStep.inset.id} />
        </div>
    {/if}
    {#if scrollyConfigForNextStep.showDamageKey}
        <div class="map-overlay top-inset" out:fade>
            <DamageKey />
        </div>
    {/if}
    {#if showBeforeOnHover && !scrollyConfig.video}
        <div class="map-overlay top-inset">
            <BeforeAfterHint {isShowingBefore} area={scrollyConfig.area} />
        </div>
    {/if}
    {#if scrollyConfig.video && scrollyConfig.video.src}
        <div class="map-cover" transition:fade={{delay: 0}}></div>
        <div class="media-layer top-inset" transition:fade={{delay: 0}}>
            <VideoOverlay video={scrollyConfig.video} />
        </div>
    {/if}
</div>

<style lang="scss">
   .background-container {
        position: relative;
        width: 100%;
        @include dynamic-viewport-height;
        pointer-events: none;
   }

   .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;

        filter: blur(var(--blur-amount));
        transition: 0.5s 0.5s filter linear;
   }

    .annotations-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        pointer-events: none;
   }

   .map-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 11;
        top: 20px;
        left: 0;
        bottom: 0;
   }

   .top-inset {
        padding-top: var(--top-inset);
   }

   .map-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #121212;
        opacity: 0.6;
        z-index: 20;
   }

    .media-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 30;
   }
</style>