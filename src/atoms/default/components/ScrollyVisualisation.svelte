<script>
    import { onMount } from 'svelte';
    import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";
    import { getCameraForStep, map, mapWidth, mapHeight } from "../stores/camera.js";
    import { loadAnnotationFeatures } from '../stores/annotations.js';
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "./AnnotationsLayer.svelte"
    import VideoOverlay from "$lib/components/VideoOverlay.svelte";

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    const stepsWithBackgroundBlur = [5]
    $: blurAmount = stepsWithBackgroundBlur.includes(step) ? 5 : 0;
    $: coverMap = blurAmount > 0;
    $: mapCoverOpacity = blurAmount > 0 ? 0.6 : 0;

    let cameraPosition;

    function updateCameraPosition(getCameraForStep, step, offset) {
        const start = getCameraForStep(step);

        if (cameraPosition === undefined) {
            cameraPosition = start
            return;
        }

        const end = getCameraForStep(step + 1);
        if (start === end) return;

        const centerInterpolator = geoInterpolate(start.center, end.center);
        const zoomInterpolator = interpolateNumber(start.zoom, end.zoom);
        const bearingInterpolator = interpolateNumber(start.bearing, end.bearing);

        const easedOffset = easeQuadInOut(offset)

        cameraPosition = {
            center: centerInterpolator(easedOffset),
            zoom: zoomInterpolator(easedOffset),
            bearing: bearingInterpolator(easedOffset),
            animate: false,
        }
    }

    // uncomment for scroll animations
    $: updateCameraPosition($getCameraForStep, step, offset)

    // uncomment for smooth animations
    // $: cameraPosition = $getCameraForStep(step);

    onMount(() => {
       loadAnnotationFeatures();
    })

</script>

<div class="background-container"  bind:clientWidth={$mapWidth} bind:clientHeight={$mapHeight}>
    <div class="map-container" style="--blur-amount: {blurAmount}px;">
        <Map bind:this={$map} {step} {cameraPosition} interactive={false} />
    </div>
    {#if $map}
        <div class="annotations-layer">
            <AnnotationsLayer {step} project={$map.project} onMapMove={$map.onMove} />   
        </div>           
    {/if}
    <div class="map-cover" style="opacity: {coverMap ? mapCoverOpacity : 0};"></div>
    <div class="media-layer">
        <VideoOverlay {step} />
    </div>
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
        transition: 0.5s filter linear;
   }

    .annotations-layer {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
   }

   .map-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #121212;
        transition: 0.5s opacity linear;
        z-index: 20;
   }

    .media-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 30;
   }


</style>