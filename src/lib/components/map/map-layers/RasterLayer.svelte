<script>
    import { onMount, getContext } from "svelte";
    import { isMobile } from "$lib/stores/devices";

    export let layerName;
    export let beforeId = undefined;

    const { addLayer, removeLayer } = getContext('map');

    let isReady = false;

    $: imageLayer = {
        id: layerName,
        source: $isMobile ? "satellite-after-high-res-jpg" : "satellite-after-high-res-png",
        type: "raster",
        minzoom: 13,
        maxzoom: 17,
        paint: {
        "raster-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            0,
            14,
            1.0
            ]
        }
    };

    function removeAndAdd(layer) {
        if (!isReady) return;
        removeLayer(layer.id);
        addLayer(layer, 0, beforeId);
    }
    $: removeAndAdd(imageLayer)

    onMount(() => {
        isReady = true;
        removeAndAdd(imageLayer);

        return () => {
            if (imageLayer) removeLayer(imageLayer.id);
        }
    });
</script>