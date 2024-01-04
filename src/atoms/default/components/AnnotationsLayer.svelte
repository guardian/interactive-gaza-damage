<script>
    import { onMount, setContext } from 'svelte';
    import { annnotationsForStep } from '../annotations';
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";

    export let step;

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


    $: annotations = annnotationsForStep(step);
    // $: console.log('annotations for step', step, annotations.length)
</script>

<svelte:window on:resize={updatePositions} />

<div class="annotations-container" style="opacity: {annotations.length ? 1 : 0};">
    {#each annotations as annotation (annotation.id)}
        <Annotation center={annotation.location}>
            <TextAnnotation
                {...annotation.config}
            />
        </Annotation>
    {/each}
</div>

<style>
    .annotations-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        /* transition: opacity 0.5s; */
    }
</style>