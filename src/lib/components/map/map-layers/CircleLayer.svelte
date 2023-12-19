<script>
    import { onMount, getContext } from "svelte";

    export let id
    export let source;
    export let sourceLayer;
    export let filter = undefined;
    export let layout = {};
    export let paint = {};
    export let zIndex = 0;
    export let beforeId = undefined;

    const { addLayer, removeLayer, setPaintProperty, setLayoutProperty, updateZIndexForLayer } = getContext('map');

    const layer = {
        id,
        layout,
        "type": "circle",
        "source": source,
        "source-layer": sourceLayer,
        "paint": {
            "circle-color": "#C70000",
            "circle-radius": 6,
            "circle-opacity": 1,
            "circle-opacity-transition": { duration: 500 },
            "circle-stroke-opacity-transition": { duration: 500 },
            ...paint
        },
        ...(filter && {"filter": filter})
    };

    $: if (layout) {
        for (const [key, value] of Object.entries(layout)) {
            setLayoutProperty(id, key, value);
        }
    }

    $: if (paint) {
        for (const [key, value] of Object.entries(paint)) {
            setPaintProperty(id, key, value);
        }
    }

    $: updateZIndexForLayer(id, zIndex);

    onMount(() => {
        addLayer(layer, zIndex, beforeId);

        return () => {
            removeLayer(id);
        }
    });
</script>