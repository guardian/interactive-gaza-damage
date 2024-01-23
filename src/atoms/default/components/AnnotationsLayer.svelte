<script>
    import { onMount, setContext } from 'svelte';
    import { annotationLabelsForIDs } from '../stores/annotations';
    import { isMobile } from "$lib/stores/devices";
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";

    export let area;
    export let annotationsInFocus;

    // Expects a function that returns {x, y} in screen coordinates for a given [lon, lat]
    export let project;
    export let onMapMove;

    function updatePositions() {
        for (let callback of callbacks) {
            callback(project);
        }
    }

    let callbacks = [];
    function register(callback) {
        callbacks.push(callback);
        callback(project);
    }

    setContext('annotations', {
        updatePosition: register,
    });

    onMount(() => {
        updatePositions();

        // register for updates
        onMapMove(() => {
            updatePositions();
        })
    })


    $: annotationLabels = area && annotationsInFocus ? $annotationLabelsForIDs(annotationsInFocus, area) : [];
</script>

<svelte:window on:resize={updatePositions} />

<div class="annotations-container" style="opacity: {annotationsInFocus ? 1 : 0};">
    {#each annotationLabels as annotation (annotation.id)}
        <Annotation center={annotation.location}>
            <TextAnnotation
                {...annotation.config}
            />
        </Annotation>
        <!-- {#if annotation.hint}
            <Annotation center={annotation.hint.location}>
                <TextAnnotation
                    text={$isMobile ? "Tap to see before" : "Hover to see before"}
                    textWidth={$isMobile ? 110 : 155}
                    textRadialOffset={4}
                    lineLength={0}
                    fontStyle='italic'
                    textClass='text-alt'
                />
            </Annotation>
        {/if} -->
    {/each}
    <div class="debug hidden"></div>
    <div class="debug2 hidden"></div>
</div>

<style>
    .annotations-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        transition: opacity 0.5s;
    }

    .debug {
        position: absolute;
        background-color: aqua;
        opacity: 0.25;
        top: 0;
        left: 0;
        width: 100vw;
        height: 50px;
    }

    .debug2 {
        position: absolute;
        background-color: aqua;
        opacity: 0.25;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 50px;
    }

    .hidden {
        display: none;
    }
</style>