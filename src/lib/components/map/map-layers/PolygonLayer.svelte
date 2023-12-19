<script>
    import { onMount, getContext } from "svelte";

    export let id
    export let source;
    export let sourceLayer;
    export let zIndex = 0;
    export let beforeId = undefined;
    export let filter = undefined;
    export let opacity = 1;

    export let fillLayout = {};
    export let fillPaint = undefined;

    export let strokeLayout = {};
    export let strokePaint = undefined;

    const { addLayer, removeLayer, setPaintProperty } = getContext('map');

    let isReady = false;
    let fillLayer, strokeLayer

    $: _fillPaint = {
        'fill-opacity': opacity,
        ...fillPaint,
    }

    $: _strokePaint = {
        'line-opacity': opacity,
        ...strokePaint
    }

    $: if (fillPaint && !fillLayer) {
        fillLayer = {
            id: id + '-fill',
            type: "fill",
            source: source,
            "source-layer": sourceLayer,
            layout: fillLayout,
            paint: _fillPaint,
            ...(filter && {"filter": filter})
        }

        if (isReady) {
            addLayer(fillLayer, zIndex, beforeId)
        }
    }

    $: if (strokePaint && !strokeLayer) {
        strokeLayer = {
            id: id + '-line',
            type: "line",
            source: source,
            "source-layer": sourceLayer,
            layout: strokeLayout,
            paint: _strokePaint,
            ...(filter && {"filter": filter})
        }

        if (isReady) {
            addLayer(strokeLayer, zIndex, beforeId)
        }
    }

    $: if (fillLayer && isReady) {
        for (const [key, value] of Object.entries(_fillPaint)) {
            setPaintProperty(fillLayer.id, key, value);
        }
    }

    $: if (strokeLayer && isReady) {
        for (const [key, value] of Object.entries(_strokePaint)) {
            setPaintProperty(strokeLayer.id, key, value);
        }
    }

    onMount(() => {
        if (fillLayer) addLayer(fillLayer, zIndex, beforeId);
        if (strokeLayer) addLayer(strokeLayer, zIndex, beforeId);

        isReady = true

        return () => {
            if (fillLayer) removeLayer(fillLayer.id);
            if (strokeLayer) removeLayer(strokeLayer.id);
        }
    });
</script>