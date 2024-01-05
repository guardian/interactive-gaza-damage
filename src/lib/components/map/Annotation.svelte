<script>
    import { getContext } from 'svelte';
    import { fade } from 'svelte/transition';

    export let center;

    const { updatePosition } = getContext('annotations');
    
    let position;

    updatePosition((project) => {
        position = project(center);
    });
</script>

<div class="annotation" style="left: {position.x}px; top: {position.y}px;" transition:fade="{{duration: 500}}">
    <slot />
</div>

<style>
    .annotation {
        position: absolute;
        transform: translate(-50%, -50%);
        overflow: visible;
    }
</style>