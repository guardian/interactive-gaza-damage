<script>
    import { onMount, getContext } from "svelte";

    export let layerName;
    export let opacity = 0;
    export let beforeId = undefined;

    const { addLayer, removeLayer, setPaintProperty } = getContext('map');

    let isReady = false;

    const imageLayer = {
        id: layerName,
        source: "raster-tiles",
        type: "raster",
        paint: {
            "raster-opacity": 0,
        }
    };

    $: if(isReady) {
        const delay = opacity === 1 ? 800 : 0;
        setPaintProperty(imageLayer.id, "raster-opacity-transition", { duration: 500, delay: delay });
        setPaintProperty(imageLayer.id, "raster-opacity", opacity);
    }

    onMount(() => {
        addLayer(imageLayer, 0, beforeId);

        isReady = true

        return () => {
            if (imageLayer) removeLayer(imageLayer.id);
        }
    });
</script>