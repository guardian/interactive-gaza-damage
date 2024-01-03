<script>
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "$lib/components/map/AnnotationsLayer.svelte"
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";
    import { isMobile } from "$lib/stores/devices";
    import { annotations, annotationsMobile } from "../annotations.js";
    import { camera, cameraMobile } from "../camera.js";
    import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    $: currentCamera = $isMobile ? cameraMobile : camera;
    
    let map, mapWidth = 0;

    // const stepsWithBackgroundBlur = [1,2]
    $: blurAmount = 0; // stepsWithBackgroundBlur.includes(step) ? 10 : 0;
    $: coverMap = blurAmount > 0;
    
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
        default:
            return camera.beitHanounDetail3;
        }
    }

    let cameraPosition;

    function updateCameraPosition(camera, step, offset) {
        // console.log('update camera', camera,' for step:', step, 'and offset:', offset)

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

    function annnotationsForStep(step, annotations) {
        const key = `step-${step}`
        if (key in annotations) {
            return annotations[key].map(d => ({
                ...d,
                id: Math.random().toString(36) // `${d.text.title}-${step}`,
            }));
        }
        return [];
    }

    $: annotationsForCurrentStep = $isMobile ? annnotationsForStep(step, annotationsMobile) : annnotationsForStep(step, annotations);
    // $: mapCoverOpacity = 0;
</script>

<div class="background-container" style="--blur-amount: {blurAmount}px;" bind:clientWidth={mapWidth}>
    <Map bind:this={map} {cameraPosition} interactive={false}>

    </Map>
    <div class="map-cover" style="opacity: {coverMap ? mapCoverOpacity : 0};"></div>
    {#if map }
        <div class="annotations-container" style="opacity: {annotationsForCurrentStep.length ? 1 : 0};">
            <AnnotationsLayer project={map.project} onMapMove={map.onMove}>
                {#each annotationsForCurrentStep as annotation (annotation.id)}
                    <Annotation center={[annotation.longitude, annotation.latitude]}>
                        {#if annotation.text}
                        <TextAnnotation 
                            {...annotation.text}
                        /> 
                        {/if}
                    </Annotation>
                {/each}
            </AnnotationsLayer>
        </div>
    {/if}
</div>

<style lang="scss">
   .background-container {
        width: 100%;
        position: relative;

        filter: blur(var(--blur-amount));
        transition: 0.5s filter linear;

        height: calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0));

        @supports(height: 100dvh) {
            height: 100dvh;
        }

        @supports (-webkit-touch-callout: none) {
            /* height fix for older versions of Safari on iOS */
            min-height: -webkit-fill-available;
        }
   }

   .map-annotations {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: antiquewhite;
        opacity: 0.5;
   }

   .map-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #f6f5f3;
        transition: 0.5s opacity linear;
        display: none;
   }

   .annotations-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.5s;
        z-index: 100;
   }
</style>