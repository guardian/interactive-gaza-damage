<script>
    import Map from "$lib/components/map/Map.svelte";
    import AnnotationsLayer from "$lib/components/map/AnnotationsLayer.svelte"
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";
    import Legend from "./Legend.svelte";
    import { ecoStatusCategories } from "$lib/helpers/colourScales.js";
    import { isMobile } from "$lib/stores/devices";
    import { annotations, annotationsMobile } from "../annotations.js";
    import { camera, cameraMobile } from "../camera.js";

    export let step = 0;
    export let offset = 0;
    
    let map, mapWidth = 0;
    const stepsWithBackgroundBlur = [1,2]

    $: blurAmount = 0; // stepsWithBackgroundBlur.includes(step) ? 10 : 0;
    $: coverMap = blurAmount > 0;
    
    let cameraPosition;
    $: currentCamera = $isMobile ? cameraMobile : camera;
    $: {
        let view;
        switch (step) {
        case 1:
        case 2:
            view = currentCamera.beitHanoun;
            cameraPosition = view
            break;
        default:
            view = currentCamera.gazaNorth;
            cameraPosition = view
            break;
        }
    }

    $: if (step == 9 && offset >= 0.4) {
        // change camera position without animation during second overlay step
        let newPosition = currentCamera.englandAndWales;
        newPosition.animate = false;
        cameraPosition = newPosition;
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
    $: mapCoverOpacity = step == 9 ? 1 : 0.8;
</script>

<div class="background-container" style="--blur-amount: {blurAmount}px;" bind:clientWidth={mapWidth}>
    <Map bind:this={map} {cameraPosition} interactive={false}>

    </Map>
    <div class="map-cover" style="opacity: {coverMap ? mapCoverOpacity : 0};"></div>
    <div class="legend-container" style="opacity: {step == 3 || step == 10 || step == 11 ? 1 : 0};">
        {#if step >= 2 && step <= 4}
            <Legend 
                title="Total spilling duration in 2022"
                subtitle="Spilling is allowed under certain conditions"
                image="__assetsPath__/img/bubble-legend.svg"
            />
        {:else if step == 10 || step == 11}
            <Legend 
                title="Ecological status"
                subtitle="Most recent classification"
                categories={ecoStatusCategories} 
            />
        {/if}
    </div>
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
   
   .legend-container {
        --margin: 10px;
        position: absolute;
        top: 10px;
        width: calc(100% - var(--margin) * 2);
        margin: 0 var(--margin);
        transition: opacity 0.5s;
        padding: 4px 10px 12px 10px;
        background-color: rgba(246, 245, 243, 0.8);
        border-top: 1px solid #999;

        @include mq($from: tablet) {
            width: auto;
            margin: 0;
            right: 10px;
        }
   }

   :global(.android .legend-container) {
        top: 60px;
   }

   .legend-container h3 {
        @include f-headline();
        font-size: 20px;
        line-height: 115%;
        font-weight: 700;
        margin-bottom: 12px;
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