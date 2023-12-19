<script>
    import { onMount, onDestroy, getContext } from "svelte";

    export let id
    export let source;
    export let sourceLayer;
    export let zIndex = 0;
    export let beforeId = undefined;
    export let filter = undefined;

    export let layout;
    export let paint = undefined; 

    let isReady = false;

    const { addLayer, removeLayer, setLayoutProperty, setPaintProperty } = getContext('map');

    const symbolLayer = {
        id,
        type: "symbol",
        source,
        "source-layer": sourceLayer,
        layout,
        ...(paint && {paint}),
        ...(filter && {'filter': filter})
    };

    $: if (layout && isReady) {
        for (const [key, value] of Object.entries(layout)) {
            setLayoutProperty(symbolLayer.id, key, value);
        }
    }

    $: if (paint && isReady) {
        for (const [key, value] of Object.entries(paint)) {
            setPaintProperty(symbolLayer.id, key, value);
        }
    }

    onMount(() => {
        addLayer(symbolLayer, zIndex, beforeId);
        isReady = true
    });

    onDestroy(() => {
        removeLayer(symbolLayer.id);
	});
</script>