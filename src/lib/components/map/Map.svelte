<script>
    import { onMount, onDestroy, setContext } from 'svelte'
    import { Map, LngLat } from "maplibre-gl";
    import style from './map-style-gaza';
    import "maplibre-gl/dist/maplibre-gl.css";

    export let cameraPosition = undefined;
    export let cameraTransitionDelay = 0;
    export let interactive = true;
    export let center = [34.4046458278726, 31.454140399206565];
    export let zoom = 10;  // starting zoom level
    export let bearing = 0;
    export let pitch = 0;
    export let bounds = undefined;

    let map, mapContainer, mapContainerWidth;

    export function project(coordinates) {
		return map.project(coordinates);
	}

    export function onMove(callback) {
        map.on('move', callback);
    }

    let sourcesToAdd = [];
    let layersToAdd = [];
    let layers = [];
    const layerVisibility = {};

    let isReady = false;

    $: if (isReady && cameraPosition) {
        if (cameraTransitionDelay > 0) {
            setTimeout(() => {
                moveTo(cameraPosition);
            }, cameraTransitionDelay);
        } else {
            moveTo(cameraPosition);
        }
    }

    $: if(mapContainerWidth) {
        // resize map to fit container
        map && map.resize();
    }

    function moveTo(cameraPosition) {

        let offset = [0, 0];

        if (cameraPosition.bounds && cameraPosition.align) {
            const center = map.getCenter();
            const zoom = map.getZoom();

            const targetBounds = cameraPosition.bounds
            const targetSW = new LngLat(...targetBounds[0]);

            map.fitBounds(targetBounds, {animate: false});

            const mapBounds = map.getBounds();
            const mapSW = mapBounds.getSouthWest()

            const mapSWProjected = map.project(mapSW);
            const targetSWProjected = map.project(targetSW);

            if (targetSWProjected.x > mapSWProjected.x) {
                const diff = targetSWProjected.x - mapSWProjected.x;

                switch (cameraPosition.align) {
                    case "left":
                        offset = [-diff / 2, 0];
                        break;
                    case "right":
                        offset = [diff / 2, 0];
                        break;
                    default:
                        break;
                }
            }

            map.jumpTo({ center, zoom })
        }
        
        if (cameraPosition.bounds) {
            // console.log('fit to bounds', cameraPosition);
            map.fitBounds(cameraPosition.bounds, {offset, ...cameraPosition});
        } else if (cameraPosition.zoom === map.getZoom()) {
            map.easeTo(cameraPosition);
        } else {
            // console.log('fly to', cameraPosition);
            map.flyTo(cameraPosition);
        }
    }

    onMount(async () => {
        let mapPosition;
        if (bounds) {
            mapPosition = {
                bounds,
            }
        } else {
            mapPosition = {
                center,
                zoom
            }
        }

        map = new Map({
            container: mapContainer,
            style,
            interactive,
            bearing,
            pitch,
            minZoom: 3,
            maxZoom: 22,
            ...mapPosition,
        });

        map.on("load", onMapLoad);

        map.on('resize', function() {
            if (cameraPosition) {
                moveTo({
                    ...cameraPosition,
                    duration: 0,
                });
            }
        });

        map.on('error', function(error) {
            console.log('Map error', error);
        });

        // map.on('zoomend', () => {
        //     console.log('zoom level: ', map.getZoom())
        // })
    });

    onDestroy(() => {
        if (map) map.remove();
        isReady = false;
    });

    function onMapLoad() {
        isReady = true;

        sourcesToAdd.forEach(source => map.addSource(source.id, source.data));
        sourcesToAdd = [];
        flushLayersToAdd();
    }

    function addSource(sourceID, source) {
        if (isReady) {
            map.addSource(sourceID, source);
        } else {
            sourcesToAdd.push({
                id: sourceID,
                data: source
            });
        }
    }

    function removeSource(sourceID) {
        if (isReady) {
            if (map.getSource(sourceID)) {
            map.removeSource(sourceID);
        }
        } else {
            sourcesToAdd = sourcesToAdd.filter(source => source.id !== sourceID);
        }
    }

    function getSource(sourceID) {
        if (!isReady) return;

        return map && map.getSource(sourceID);
    }

    function addLayer(layer, zIndex = 0, beforeId) {
        layersToAdd.push({layer, zIndex, beforeId});

        if (isReady) {
            flushLayersToAdd();
        }
    }

    function removeLayer(layerID) {
        if (isReady) {
            if (map.getLayer(layerID)) {
                map.removeLayer(layerID);
                layers = layers.filter(({layer}) => layer.id !== layerID);
            }
        } else {
            layersToAdd = layersToAdd.filter(({layer}) => layer.id !== layerID);
        }
    }

    function setVisible(layerID, visible) {
        let visibility = visible ? 'visible' : 'none';
        layerVisibility[layerID] = visibility;

        // console.log('visible', visible, 'layer.id', layerID);

        if (map && map.getLayer(layerID)) {
            map.setLayoutProperty(layerID, 'visibility', visibility);
        }
    }

    function flushLayersToAdd() {
        layersToAdd.forEach(({layer, zIndex, beforeId}) => {
            layers.push({layer, zIndex, beforeId});
            map.addLayer(layer, beforeId);
            map.setLayoutProperty(layer.id, 'visibility', layerVisibility[layer.id]);
        });
        layersToAdd = [];
        // updateLayerOrder();
    }

    function updateZIndexForLayer(layerName, zIndex) {
        let layer = layers.find(({layer}) => layer.id === layerName);
        if (layer) {
            layer.zIndex = zIndex;
            updateLayerOrder();
        }
    }

    function updateLayerOrder() {
        // sort layers by zIndex
        layers.sort((a, b) => a.zIndex - b.zIndex);

        let firstNegativeZindex = true;

        layers.reverse().forEach(({layer, zIndex}, index) => {
            const nextLayerIndex = index - 1;
 
            if (nextLayerIndex >= 0) {
                const nextLayer = layers[nextLayerIndex].layer;
                map.moveLayer(layer.id, nextLayer.id);
            }

            if (zIndex < 0 && firstNegativeZindex) {
                map.moveLayer(layer.id, "building-3d");
                firstNegativeZindex = false;
            }
        });
    }

    export function setPaintProperty(layerID, property, value) {
        if (map && map.getLayer(layerID)) {
            map.setPaintProperty(layerID, property, value);
        }
    }

    export function setLayoutProperty(layerID, property, value) {
        if (map && map.getLayer(layerID)) {
            map.setLayoutProperty(layerID, property, value);
        }
    }

    function setFilter(layerID, filter) {
        if (map && map.getLayer(layerID)) {
            map.setFilter(layerID, filter);
        }
    }

    $: setContext('map', {
        addSource,
        removeSource,
        getSource,
        addLayer,
        removeLayer,
        setVisible,
        setPaintProperty,
        setLayoutProperty,
        updateZIndexForLayer,
        setFilter,
    });
</script>
  
<svelte:options accessors={true} />

<div class="map-container" bind:this={mapContainer} bind:clientWidth={mapContainerWidth}>
    {#if isReady}
        <slot />
    {/if}
</div>

<style lang="scss">
    .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>