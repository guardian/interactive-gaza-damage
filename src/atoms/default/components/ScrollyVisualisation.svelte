<script>
    import { onMount } from 'svelte';
    import { featureCollection, convex, centroid, transformRotate, bbox, bboxPolygon } from '@turf/turf';
    import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";
    import Map from "$lib/components/map/Map.svelte";
    import { isMobile } from "$lib/stores/devices";
    import { camera, cameraMobile } from "../camera.js";
    import AnnotationsLayer from "./AnnotationsLayer.svelte"
    import VideoOverlay from "$lib/components/VideoOverlay.svelte";
    import { annotationsInFocusForStep } from '../annotations';
    import { fetchJSON } from '$lib/helpers/fetchJSON.js';

    export let step = 0;
    export let offset = 0;
    // $: console.log('offset', offset);

    $: currentCamera = $isMobile ? cameraMobile : camera;
    
    let map, mapWidth = 0;

    const stepsWithBackgroundBlur = [6]
    $: blurAmount = stepsWithBackgroundBlur.includes(step) ? 5 : 0;
    $: coverMap = blurAmount > 0;
    $: mapCoverOpacity = blurAmount > 0 ? 0.6 : 0;
    
    $: cameraPositionForStep = (camera, step) => {

        // console.log('camera for step', step)

        // const annotations = annotationsInFocusForStep(step);
        // if (annotations.length > 0 && annotationFeatures) {
        //     // create camera object with bounding box for annotations

        //     const IDs = annotations.map(d => d.id)

        //     // find map features matching these IDs
        //     const features = annotationFeatures.filter(d => IDs.includes(d.properties.id))
        //     const collection = featureCollection(features);
        //     // console.log('feature collection', collection)

        //     const convexHull = convex(collection)
        //     console.log('convex hull', convexHull);

        //     const annotationsCentroid = centroid(convexHull);
        //     console.log('centroid', annotationsCentroid.geometry.coordinates);

        //     const rotatedHull = transformRotate(convexHull, -40, { pivot: annotationsCentroid.geometry.coordinates })
        //     console.log('rotated hull', rotatedHull);

        //     const boundingBox = bbox(rotatedHull);
        //     console.log('bounding box', boundingBox);

        //     const polygonBox = bboxPolygon(boundingBox);
        //     console.log('bounding box poly', polygonBox);

        //     const rotatedBoundingBox = transformRotate(polygonBox, 40, { pivot: annotationsCentroid.geometry.coordinates })
        //     const coordinates = rotatedBoundingBox.geometry.coordinates[0]
        //     console.log('rotated bounding box', [coordinates[0], coordinates[2]]);

        //     // output
        //     [
        //         [
        //             34.537660948491066,
        //             31.545143361563145
        //         ],
        //         [
        //             34.55350903130011,
        //             31.546559708799975
        //         ]
        //     ]

        //     const cameraForAnnotations = {
        //         bounds: [coordinates[0], coordinates[2]],
        //     }

        //     return transformCameraIfNeeded(cameraForAnnotations);
        // }


        switch (step) {
        case 0:
        case 1:
            return transformCameraIfNeeded(camera.gazaNorth);
        case 2:
            return transformCameraIfNeeded(camera.beitHanoun);
        default:
            return transformCameraIfNeeded(camera.beitHanounDetail1);
        }
    }

    function transformCameraIfNeeded(camera) {
        if (camera.center && camera.zoom) return camera;

        const derivedCamera = map.cameraForBounds(
            camera.bounds, {
              bearing: camera.bearing,
              padding: 50,
            //   maxZoom: 17,
            })

        // console.log('original', camera, 'derived', derivedCamera)

        return {
            center: [derivedCamera.center.lng, derivedCamera.center.lat],
            zoom: derivedCamera.zoom,
            bearing: derivedCamera.bearing,
        }
    }

    let cameraPosition;

    function updateCameraPosition(camera, step, offset) {
        const start = cameraPositionForStep(camera, step);

        if (cameraPosition === undefined) {
            cameraPosition = start
            return;
        }

        const end = cameraPositionForStep(camera, step + 1);
        if (start === end) return;

        const centerInterpolator = geoInterpolate(start.center, end.center);
        const zoomInterpolator = interpolateNumber(start.zoom, end.zoom);
        const bearingInterpolator = interpolateNumber(start.bearing, end.bearing);

        const easedOffset = easeQuadInOut(offset)

        cameraPosition = {
            center: centerInterpolator(easedOffset),
            zoom: zoomInterpolator(easedOffset),
            bearing: bearingInterpolator(easedOffset),
            animate: false,
        }

        // console.log('map bounds', map.getBounds());
    }

    // $: updateCameraPosition(currentCamera, step, offset)

    // smooth animations
    $: cameraPosition = cameraPositionForStep(camera, step);

    let annotationFeatures;
    onMount(async () => {
        const geoJSON = await fetchJSON("__assetsPath__/geojson/beit-hanoun-annotations-simplified.geojson")
        annotationFeatures = geoJSON.features;
    })

    // $: console.log('focused annotations', step, annotationsInFocusForStep(step))

</script>

<div class="background-container"  bind:clientWidth={mapWidth}>
    <div class="map-container" style="--blur-amount: {blurAmount}px;">
        <Map bind:this={map} {step} {cameraPosition} interactive={false} />
    </div>
    {#if map}
        <div class="annotations-layer">
            <AnnotationsLayer {step} project={map.project} onMapMove={map.onMove} />   
        </div>           
    {/if}
    <div class="map-cover" style="opacity: {coverMap ? mapCoverOpacity : 0};"></div>
    <div class="media-layer">
        <VideoOverlay {step} />
    </div>
</div>

<style lang="scss">
   .background-container {
        position: relative;
        width: 100%;
        @include dynamic-viewport-height;
   }

   .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;


        filter: blur(var(--blur-amount));
        transition: 0.5s filter linear;
   }

    .annotations-layer {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
   }

   .map-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #121212;
        transition: 0.5s opacity linear;
        z-index: 20;
   }

    .media-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 30;
   }


</style>