<script>
    import { onMount, onDestroy, setContext } from 'svelte'
    import { Map, LngLat, LngLatBounds, Point } from "maplibre-gl";
    import { resolvePadding } from '$lib/helpers/util';
    import { isMobile } from '$lib/stores/devices';
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
    export let showBeforeOnHover;
    export let isShowingBefore = false;

    let map, mapContainer, mapContainerWidth, mapContainerHeight;
    let layersToAdd = [];
    let layers = [];

    export function project(coordinates) {
		return map.project(coordinates);
	}

    export function onMove(callback) {
        map.on('move', callback);
    }

    export let step = 0;
    const layerVisibility = {};

    function updateLayerVisibility(step) {
        if (!isReady) return;
        const orderedLayerIds = map.getLayersOrder();
        for (const layerID of orderedLayerIds) {
            const layer = map.getLayer(layerID);
            const metadata = layer.metadata;
            if (metadata && "interactive:steps" in metadata) {
                const visibleSteps = metadata["interactive:steps"]
                if (layer.type === "line") {
                    const opacity = visibleSteps.includes(step) ? 1 : 0;
                    setPaintProperty(layerID, "line-opacity", opacity);
                }
            }
        }
    }
    $: isReady && updateLayerVisibility(step)

   export let isReady = false;

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
            map.fitBounds(cameraPosition.bounds, {offset, padding: cameraPosition.padding, bearing: cameraPosition.bearing, duration: cameraPosition.duration || 0});
        } else if (cameraPosition.animate) {
            if (cameraPosition.zoom === map.getZoom()) {
                map.easeTo(cameraPosition);
            } else {
                map.flyTo(cameraPosition);
            }
        } else {
            map.setCenter(cameraPosition.center);
            map.setZoom(cameraPosition.zoom);
            map.setBearing(cameraPosition.bearing || 0);
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

        map.on("style.load", () => {
            isReady = true;

            if (cameraPosition) {
                moveTo({
                    ...cameraPosition,
                    animate: false,
                });
            }
        });

        map.on('resize', function() {
            if (isReady && cameraPosition) {
                moveTo({
                    ...cameraPosition,
                    animate: false,
                });
            }
        });

        map.on('error', function(error) {
            console.log('Map error', error);
        });

        // createListeners(map);

        // STUFF FOR DEBUGGING
        // map.on('zoomend', () => {
        //     console.log('zoom level: ', map.getZoom())
        //     // console.log('map bounds', map.getBounds())
        // })

        // map.on('mouseup', (e) => {
        //     console.log('long/lat', JSON.stringify(e.lngLat.toArray()))
        // });
    });

    onDestroy(() => {
        if (map) map.remove();
        isReady = false;
    });

    let beforeTilesTimeoutID;
    $: isReady && createListeners(map, $isMobile);

    function clearBeforeTilesTimeout() {
        if (beforeTilesTimeoutID) {
            clearTimeout(beforeTilesTimeoutID)
        }
    }

    function createListeners(map, isMobile) {
        const layers = ['annotation-fills-beit-hanoun', 'annotation-fills-al-zahra', 'annotation-fills-khan-younis']
        if (isMobile) {
            map.on('touchstart', showBeforeTiles(true));
            map.on('touchend', hideBeforeTiles);
            map.on('touchcancel', hideBeforeTiles);
        } else {
            for (const layer of layers) {
                map.on('mouseover', layer, showBeforeTiles(false))
                map.on('mouseout', layer, hideBeforeTiles)
            }
        }
    }

    function showBeforeTiles(isTouch) {
        const delay = isTouch ? 200 : 200;

        return (e) => {
            if (!showBeforeOnHover) return;
            clearBeforeTilesTimeout();

            beforeTilesTimeoutID = setTimeout(() => {
                isShowingBefore = true;
                map.setPaintProperty("satellite-before-tiles", "raster-opacity", 1);
            }, delay)
        }
    }

    function hideBeforeTiles() {
        clearBeforeTilesTimeout();
        isShowingBefore = false;
        map.setPaintProperty("satellite-before-tiles", "raster-opacity", 0);
    }

    function setVisible(layerID, visible) {
        const visibility = visible ? 'visible' : 'none';
        layerVisibility[layerID] = visibility;

        if (map && map.getLayer(layerID)) {
            map.setLayoutProperty(layerID, 'visibility', visibility);
        }
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
    
    export function getBounds() {
        if (!map) return;
        return map.getBounds()
    }

    export function cameraForBounds(bounds, options = {}) {
        if (!isReady) return;

        bounds = LngLatBounds.convert(bounds);

        const bearing = options && options.bearing || 0;
        options.padding = resolvePadding(options.padding)
        options.minZoom = options.minZoom || map.minZoom;
        options.maxZoom = options.maxZoom || map.maxZoom;
        return _cameraForBoxAndBearing(bounds.getSouthWest(), bounds.getNorthEast(), bearing, options);
    }

    export function updateHighlightedAnnotations(highlighted = []) {
        if (!map) return;
        const mapLayers = map.getLayersOrder()
        const annotationFillLayers = mapLayers.filter(layerID => {
            return layerID.startsWith("annotation-fills")
        })
        if (annotationFillLayers.length === 0) return;

        const fillFeatures = map.queryRenderedFeatures({ layers: annotationFillLayers })
        for (const feature of fillFeatures) {
            const shouldBeHighlighted = highlighted.includes(feature.properties.id)
            map.setFeatureState(feature, {highlighted: shouldBeHighlighted})
        }
    }

    function _cameraForBoxAndBearing(p0, p1, bearing, options) {

        // convert points to screen coordinates
        const p0_screen = map.project(LngLat.convert(p0));
        const p1_screen = map.project(LngLat.convert(p1));

        const upperLeft = new Point(Math.min(p0_screen.x, p1_screen.x), Math.min(p0_screen.y, p1_screen.y));
        const lowerRight = new Point(Math.max(p0_screen.x, p1_screen.x), Math.max(p0_screen.y, p1_screen.y));

        const size = lowerRight.sub(upperLeft);

        const scaleX = (mapContainerWidth - options.padding.left - options.padding.right) / size.x //(size.x + options.padding.left + options.padding.right);
        const scaleY = (mapContainerHeight - options.padding.top - options.padding.bottom) / size.y // + options.padding.top + options.padding.bottom);

        const currentZoomScale = Math.pow(2, map.getZoom())
        const newZoomScale = currentZoomScale * Math.min(scaleX, scaleY)
        const newZoom = Math.log(newZoomScale) / Math.LN2
        const zoom = Math.max(Math.min(newZoom, options.maxZoom), 13)
        const actualZoomScale = Math.pow(2, zoom)

        const paddingOffsetX = (options.padding.left - options.padding.right) / 2;
        const paddingOffsetY = (options.padding.top - options.padding.bottom) / 2;
        const paddingOffset = new Point(paddingOffsetX, paddingOffsetY);
        const offsetAtFinalZoom = paddingOffset.mult(currentZoomScale / actualZoomScale);
        const center =  map.unproject(p0_screen.add(p1_screen).div(2).sub(offsetAtFinalZoom));

        return {
            center,
            zoom,
            bearing
        };
  }

    function setFilter(layerID, filter) {
        if (map && map.getLayer(layerID)) {
            map.setFilter(layerID, filter);
        }
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

    function flushLayersToAdd() {
        layersToAdd.forEach(({layer, zIndex, beforeId}) => {
            layers.push({layer, zIndex, beforeId});
            map.addLayer(layer, beforeId);
            map.setLayoutProperty(layer.id, 'visibility', layerVisibility[layer.id]);
        });
        layersToAdd = [];
    }

    $: setContext('map', {
        setVisible,
        setPaintProperty,
        setLayoutProperty,
        setFilter,
        addLayer,
        removeLayer,
    });
</script>
  
<svelte:options accessors={true} />

<div class="map-container" bind:this={mapContainer} bind:clientWidth={mapContainerWidth} bind:clientHeight={mapContainerHeight}>
    {#if isReady}
        <slot />
    {/if}
</div>

<style lang="scss">
    .map-container {
        width: 100%;
        height: 100%;
        pointer-events: all;
    }
</style>