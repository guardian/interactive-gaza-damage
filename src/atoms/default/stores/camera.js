import memoize from 'memoize';
import { writable, derived } from 'svelte/store';
import { annotationFeatures } from './annotations.js';
import { scrollyConfigForStep } from './config.js';
import { featureCollection, convex, centroid, transformRotate, bbox, bboxPolygon } from '@turf/turf';
import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";

export const map = writable(null);
export const mapReady = writable(false);
export const mapWidth = writable(0);
export const mapHeight = writable(0);

const BEARING = 40;
const PADDING = 150;

const views = {
  gazaNorth: {
    // bounds: [
    //   [34.44475, 31.492539],
    //   [34.579689, 31.602306],
    // ],
    center: [34.51, 31.54],
    zoom: 12.5,
    bearing: BEARING,
  },
  beitHanoun: {
    bounds: [34.51703,31.54613,34.55906, 31.54258],
    bearing: BEARING,
  },
};

export const getCameraForStep = derived([map, mapReady, mapWidth, mapHeight, annotationFeatures], ([$map, $mapReady, $mapWidth, $mapHeight, $annotationFeatures]) => {
    console.log('update camera for step funciton', $mapReady, $mapWidth, $mapHeight);

    const cameraForStep = (step) => {
        if (!$map) return views.gazaNorth;

        const config = scrollyConfigForStep(step);
        const annotationsInFocus = config.annotationsInFocus
        if (annotationsInFocus && $annotationFeatures) {
            // create camera object with bounding box for annotations
            const bounds = boundsForAnnotations(annotationsInFocus, $annotationFeatures);
            // console.log('bounds for step', step, $annotationFeatures);
            const cameraForAnnotations = {
                bounds,
                bearing: BEARING,
                padding: PADDING,
            }
            return transformCameraIfNeeded($map, cameraForAnnotations, config);
        }

        switch (step) {
            case 0:
            case 1:
                return transformCameraIfNeeded($map, views.gazaNorth, config);
            case 2:
                return transformCameraIfNeeded($map, views.beitHanoun, config);
            default:
                return transformCameraIfNeeded($map, views.beitHanoun, config);
        }
    }

    // memoize camera function to prevent running expensive calculations multiple times
    return memoize(cameraForStep)
});

function transformCameraIfNeeded(map, camera, config) {
    if (camera.center && camera.zoom) return camera;

    const derivedCamera = map.cameraForBounds(
        camera.bounds, {
            bearing: camera.bearing,
            padding: camera.padding || 0,
            maxZoom: config.maxZoom || 15,
        })

    if (!derivedCamera) {
        // console.log('no derived camera for', camera)
        return camera;
    }

    return {
        center: [derivedCamera.center.lng, derivedCamera.center.lat],
        zoom: derivedCamera.zoom,
        bearing: derivedCamera.bearing,
    }
}

function boundsForAnnotations(annotationsInFocus, annotationFeatures) {
    // find map features matching these IDs
    const features = annotationFeatures.filter(d => annotationsInFocus.includes(d.properties.id))
    if (!features.length) {
        throw "No features found"
    }
    const collection = featureCollection(features);

    const convexHull = convex(collection)
    // console.log('convex hull', convexHull);

    const annotationsCentroid = centroid(convexHull);
    // console.log('centroid', annotationsCentroid.geometry.coordinates);

    const rotatedHull = transformRotate(convexHull, -40, { pivot: annotationsCentroid.geometry.coordinates })
    // console.log('rotated hull', rotatedHull);

    const boundingBox = bbox(rotatedHull);
    // console.log('bounding box', boundingBox);

    const polygonBox = bboxPolygon(boundingBox);
    // console.log('bounding box poly', polygonBox);

    const rotatedBoundingBox = transformRotate(polygonBox, 40, { pivot: annotationsCentroid.geometry.coordinates })
    const coordinates = rotatedBoundingBox.geometry.coordinates[0]
    // console.log('rotated bounding box', [coordinates[0], coordinates[2]]);

    return [coordinates[0], coordinates[2]]        
}


export function interpolateBetween(start, end, progress) {
    if (!canInterpolateCamera(start) || !canInterpolateCamera(end)) {
        throw `Can't interpolate between start: ${start} and end: ${end}`
    }

    const centerInterpolator = geoInterpolate(start.center, end.center);
    const zoomInterpolator = interpolateNumber(start.zoom, end.zoom);
    const bearingInterpolator = interpolateNumber(start.bearing, end.bearing);

    const easedProgress = easeQuadInOut(progress)

    return {
        center: centerInterpolator(easedProgress),
        zoom: zoomInterpolator(easedProgress),
        bearing: bearingInterpolator(easedProgress),
        animate: false,
    }
}

export function canInterpolateCamera(camera) {
    return camera.center && camera.zoom && camera.bearing
}