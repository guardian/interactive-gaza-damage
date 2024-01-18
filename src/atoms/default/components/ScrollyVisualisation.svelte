<script>
    import { fade } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { getCameraForStep, map, mapReady, mapWidth, mapHeight, canInterpolateCamera, interpolateBetween } from "../stores/camera.js";
    import { scrollyConfigForStep } from '../stores/config.js';
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "./AnnotationsLayer.svelte"
    import VideoOverlay from "$lib/components/VideoOverlay.svelte";
    import InsetMap from "./InsetMap.svelte";
    import { onDestroy } from "svelte";

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    let cameraPosition;

    function updateCameraPosition(getCameraForStep, step, offset) {
        if (step >= 39) return;

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

    $: scrollyConfig = scrollyConfigForStep(step)
    $: scrollyConfigForNextStep = offset > 0.5 ? scrollyConfigForStep(step+1) : scrollyConfig;
    $: blurAmount = scrollyConfig.video ? 5 : 0;
    $: $map && $map.updateHighlightedAnnotations(scrollyConfigForNextStep.highlighted)

    // $: console.log('config', scrollyConfig);

    onDestroy(() => {
        map.set(null)
    })
</script>

<div class="background-container"  bind:clientWidth={$mapWidth} bind:clientHeight={$mapHeight}>
    <div class="map-container" style="--blur-amount: {blurAmount}px;">
        <Map 
            bind:this={$map} 
            bind:isReady={$mapReady} 
            {step} 
            {cameraPosition} 
            interactive={false}
            showBeforeOnHover={step>=3 && step < 13} />
    </div>
    {#if $map}
        <div class="annotations-layer">
            <AnnotationsLayer area={scrollyConfig.area} annotationsInFocus={scrollyConfigForNextStep.annotationsInFocus} project={$map.project} onMapMove={$map.onMove} />   
        </div>           
    {/if}
    {#if scrollyConfigForNextStep.inset}
        <div class="inset-map-layer" out:fade>
            <InsetMap image={scrollyConfigForNextStep.inset.image} />
        </div>
    {/if}
    {#if scrollyConfig.video}
        <div class="map-cover" transition:fade={{delay: 0}}></div>
        <div class="media-layer" transition:fade={{delay: 0}}>
            {#if scrollyConfig.video}
                <VideoOverlay video={scrollyConfig.video} />
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
   .background-container {
        position: relative;
        width: 100%;
        @include dynamic-viewport-height;
   }

   .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;


        filter: blur(var(--blur-amount));
        transition: 0.5s 0.5s filter linear;
   }

    .annotations-layer {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
   }

   .inset-map-layer {
        position: absolute;
        width: 100%;
        height: 100%;
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