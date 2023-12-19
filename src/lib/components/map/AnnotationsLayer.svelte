<script>
    import { onMount, setContext } from 'svelte';

    // Expects a function that returns {x, y} in screen coordinates for a given [lon, lat]
    export let project;
    export let onMapMove;

    onMapMove(() => {
        updatePositions();
    })

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
    })
</script>

<svelte:window on:resize={updatePositions} />

<div class="annotations-container">
    <slot/>
</div>

<style>
    .annotations-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
</style>