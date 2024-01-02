<script>
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "$lib/components/map/AnnotationsLayer.svelte"
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";
    import { isMobile } from "$lib/stores/devices";
    import { annotations, annotationsMobile } from "../annotations.js";
    import { camera, cameraMobile } from "../camera.js";
    import { geoInterpolate } from "d3";

    export let step = 0;
    export let offset = 0;
    $: console.log('offset', offset);
    
    let map, mapWidth = 0;
    const stepsWithBackgroundBlur = [1,2]

    $: blurAmount = 0; // stepsWithBackgroundBlur.includes(step) ? 10 : 0;
    $: coverMap = blurAmount > 0;
    
    let cameraPosition;
    $: currentCamera = $isMobile ? cameraMobile : camera;
    $: {
        switch (step) {
        case 0:
            cameraPosition = currentCamera.gazaNorth;
        case 1:
            cameraPosition = currentCamera.beitHanoun;
            break;
        case 2:
            cameraPosition = currentCamera.beitHanounDetail1;
            break;
        // case 3:
        //     cameraPosition = currentCamera.beitHanounDetail2;
        //     break;
        default:
            cameraPosition = currentCamera.beitHanounDetail2;
            break;
        }
    }

    $: if (step === 2) {
        const start = currentCamera.beitHanounDetail1;
        const end = currentCamera.beitHanounDetail2;
        const interpolator = geoInterpolate(start.center, end.center)

        cameraPosition = {
            center: interpolator(offset),
            zoom: 15.5,
            bearing: start.bearing,
            animate: false,
        }
    }

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
    $: mapCoverOpacity = 0;
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