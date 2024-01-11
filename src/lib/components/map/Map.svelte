<script>
    import { onMount, onDestroy, setContext } from 'svelte'
    import { Map, LngLat, LngLatBounds, Point } from "maplibre-gl";
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

    let map, mapContainer, mapContainerWidth, mapContainerHeight;

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
            console.log('fit to bounds', cameraPosition);
            
            map.fitBounds(cameraPosition.bounds, {
                padding: {top: 100, bottom:25, left: 100, right: 50},
                // bearing: cameraPosition.bearing
            });

            // map.fitBounds(cameraPosition.bounds, {offset, padding: cameraPosition.padding, bearing: cameraPosition.bearing});

            setTimeout(function() {
                console.log('map bounds', map.getBounds(), map.getPadding());
            }, 1000);
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

        map.on("load", () => {
            isReady = true;

            // map.showPadding = true
        });

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

        map.on('zoomend', () => {
            console.log('zoom level: ', map.getZoom())
        })
    });

    onDestroy(() => {
        if (map) map.remove();
        isReady = false;
    });

    function setVisible(layerID, visible) {
        const visibility = visible ? 'visible' : 'none';
        layerVisibility[layerID] = visibility;

        // console.log('visible', visible, 'layer.id', layerID);

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
        if (!map) return;

        bounds = LngLatBounds.convert(bounds);

        const bearing = options && options.bearing || 0;
        return _cameraForBoxAndBearing(bounds.getSouthWest(), bounds.getNorthEast(), bearing, options);
    }

    function _cameraForBoxAndBearing(p0, p1, bearing, options) {
        const defaultPadding = {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
        };

        if (typeof options.padding === 'number') {
            const p = options.padding;
            options.padding = {
                top: p,
                bottom: p,
                right: p,
                left: p
            };
        }

        options.padding = {
          ...defaultPadding,
          ...options.padding,
        }

        options.maxZoom = options.maxZoom || map.maxZoom;

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
        const zoom = Math.min(newZoom, options.maxZoom)
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

    $: setContext('map', {
        setVisible,
        setPaintProperty,
        setLayoutProperty,
        setFilter,
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
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>