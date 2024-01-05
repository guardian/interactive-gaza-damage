<script>
    import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";
    import Map from "$lib/components/map/Map.svelte";
    import { isMobile } from "$lib/stores/devices";
    import { camera, cameraMobile } from "../camera.js";
    import AnnotationsLayer from "./AnnotationsLayer.svelte"
    import VideoOverlay from "$lib/components/VideoOverlay.svelte";

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    $: currentCamera = $isMobile ? cameraMobile : camera;
    
    let map, mapWidth = 0;

    const stepsWithBackgroundBlur = [6]
    $: blurAmount = stepsWithBackgroundBlur.includes(step) ? 5 : 0;
    $: coverMap = blurAmount > 0;
    $: mapCoverOpacity = blurAmount > 0 ? 0.6 : 0;
    
    $: cameraPositionForStep = (camera, step) => {
        switch (step) {
        case 0:
        case 1:
            return camera.gazaNorth;
        case 2:
            return camera.beitHanoun;
        case 3:
            return camera.beitHanoun;
        case 4:
            return camera.beitHanounDetail1;
        case 5:
            return camera.beitHanounDetail2;
        case 6:
            return camera.beitHanounDetail3;
        case 7:
            return camera.beitHanounDetail3;
        default:
            return camera.beitHanoun;
        }
    }

    let cameraPosition;

    function updateCameraPosition(camera, step, offset) {
        const start = cameraPositionForStep(camera, step);

        if (cameraPosition === undefined) {
            cameraPosition = start
            return;
        }

        const end = cameraPositionForStep(camera, step + 1);
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

    $: updateCameraPosition(currentCamera, step, offset)

</script>

<div class="background-container"  bind:clientWidth={mapWidth}>
    <div class="map-container" style="--blur-amount: {blurAmount}px;">
        <Map bind:this={map} {step} {cameraPosition} interactive={false} />
    </div>
    {#if map}
        <div class="annotations-layer">
            <AnnotationsLayer {step} project={map.project} onMapMove={map.onMove} />   
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