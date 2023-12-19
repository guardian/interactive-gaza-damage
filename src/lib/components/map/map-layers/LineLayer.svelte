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
    export let displaySymbols = false;

    const { addLayer, removeLayer, setPaintProperty, updateZIndexForLayer } = getContext('map');

    const defaultLayout = {
        "line-join": "round",
        "line-cap": "butt",
    }

    const layer = {
        "id": id,
        "type": "line",
        "source": source,
        "source-layer": sourceLayer,
        "layout": {
            ...defaultLayout,
            ...layout,
        },
        "paint": {
            "line-color": "#CCC",
            "line-color-transition": { duration: 1000 },
            "line-width": 1,
            "line-opacity": 0,
            "line-opacity-transition": { duration: 500 },
            ...paint
        },
        ...(filter && {"filter": filter})
    };

    const symbolLayer = {
        "id": id + "-symbols",
        "type": "symbol",
        "source": source,
        "source-layer": sourceLayer,
        "layout": {
            "text-size": [
                    "interpolate",
                    ["linear"], 
                    ["zoom"], 
                    6, 
                    14, 
                    9, 
                    [
                        'case',
                        ['==', ["get", "name"], "River Wye"],
                        16,
                        14    
                    ],
            ], 
            "text-font": ["Source Sans Pro SemiBold"],
            "text-line-height": 1,
            "text-padding": 2,
            "text-field": [
                "let", 
                "name",
                ["get", "name"],
                [
                    'case',
                    ['==', ["get", "osm_id"], "4078508"],
                    ["concat", ["var", "name"], " ", "(Afon Gŵy)"],
                    ["var", "name"]
                ]
            ]
        },
        "paint": {
            "text-color": "#55595c",
            "text-halo-color": "#f1efec",
            "text-halo-width": 2,
            "text-halo-blur": 1,
            "text-opacity": 1
        },
        "filter": ["match", ["get", "osm_id"], ["4078508", "4075419", "205976472", "401854354", "23688690", "424818064", "45725708"], true, false]
    };

    $: if (paint) {
        for (const [key, value] of Object.entries(paint)) {
            setPaintProperty(id, "line-color-transition", { duration: 1000 });
            setPaintProperty(id, key, value);
        }
    }

    $: updateZIndexForLayer(id, zIndex);

    onMount(() => {
        addLayer(layer, zIndex, beforeId);
        if (displaySymbols) {
            addLayer(symbolLayer, zIndex, beforeId);
        } 



        return () => {
            removeLayer(layer.id);
            if (displaySymbols) removeLayer(symbolLayer.id);
        }
    });
</script>