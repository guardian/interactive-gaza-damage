import memoize from 'memoize';
import { writable, derived } from 'svelte/store';
import { annotationFeatures } from './annotations.js';
import { scrollyConfigForStep } from './config.js';
import { featureCollection, convex, centroid, transformRotate, bbox, bboxPolygon } from '@turf/turf';
import { interpolateNumber, geoInterpolate, easeQuadInOut } from "d3";
import { isMobile } from '$lib/stores/devices.js';

export const map = writable(null);
export const mapReady = writable(false);
export const mapWidth = writable(0);
export const mapHeight = writable(0);

const BEARING = 40;
const PADDING = 150;
const PADDING_MOBILE = 10;

const views = {
  gazaStrip: {
    bounds: [[34.145183842591706,31.293017884366193], [34.620276889728956,31.53216883814096]],
    padding: 0,
    bearing: BEARING,
  },
  gazaNorth: {
    bounds: [[34.44335174167617,31.556791157130164],[34.581539765863226,31.541116822731496]],
    bearing: BEARING,
  },
  beitHanoun: {
    bounds: [[34.51703,31.54613], [34.55906, 31.54258]],
    bearing: BEARING,
    minZoom: 13,
  },
  alZahraRegion: {
    bounds: [[34.296206449006604,31.504841453386504], [34.545718107997715,31.45196524674172]],
    bearing: BEARING,
    minZoom: 13,
  },
  alZahra: {
    bounds: [[34.40741104010476, 31.460389184069285], [34.434034824752985, 31.49279261026933]],
    padding: 50,
    bearing: BEARING,
  },
  alZahraRegion2: {
    bounds: [[34.31433772234382,31.48956558085183], [34.49092491856595,31.452342287768985]],
    minZoom: 13,
    bearing: BEARING,
  },
  khanYounisRegion: {
    bounds: [[34.21003820321607, 31.37074345116784], [34.41691586322145, 31.327011850190047]],
    minZoom: 13,
    bearing: BEARING,
  },
  khanYounis: {
    bounds: [[34.29088745483136, 31.334316346540497], [34.332649836006226, 31.359644467950872]],
    padding: 50,
    bearing: BEARING,
  },
};

export const annotationFeaturesForStep = derived([annotationFeatures], ([$annotationFeatures]) => {
    return (step) => {
        if (step <=14) {
            return $annotationFeatures.beitHanoun
        } else if (step > 14 && step < 28) {
            return $annotationFeatures.alZahra;
        } if (step >= 28) {
            return $annotationFeatures.khanYounis
        }
        throw "Undefined region"
    }
})

export const getCameraForStep = derived([map, mapReady, mapWidth, mapHeight, isMobile, scrollyConfigForStep, annotationFeaturesForStep], ([$map, $mapReady, $mapWidth, $mapHeight, $isMobile, $scrollyConfigForStep, $annotationFeaturesForStep]) => {
    const defaultPadding = $isMobile ? PADDING_MOBILE : PADDING;
    
    const cameraForStep = (step) => {
        if (!$map) return views.gazaNorth;

        const config = $scrollyConfigForStep(step);
        const annotationsInFocus = config.annotationsInFocus
        const annotationFeatures = $annotationFeaturesForStep(step)
        if (annotationsInFocus && annotationFeatures) {
            // create camera object with bounding box for annotations
            const bounds = boundsForAnnotations(annotationsInFocus, annotationFeatures);
            const cameraForAnnotations = {
                bounds,
                bearing: BEARING,
                padding: config.padding || defaultPadding,
            }
            return transformCameraIfNeeded($map, cameraForAnnotations, config);
        }

        switch (step) {
            case 0:
            case 1:
            case 2:
            case 15:
                return transformCameraIfNeeded($map, views.gazaNorth, config);
            case 3:
            case 4:
                return transformCameraIfNeeded($map, views.beitHanoun, config);
            case 16:
                return transformCameraIfNeeded($map, views.alZahraRegion, config);
            case 17:
            case 18:
                return transformCameraIfNeeded($map, views.alZahra, config);
            case 28:
                return transformCameraIfNeeded($map, views.alZahraRegion2, config);
            case 29:
            case 42:
                return transformCameraIfNeeded($map, views.khanYounis, config);
            case 43:
                return transformCameraIfNeeded($map, views.gazaStrip, config);
            case 44:
                return transformCameraIfNeeded($map, views.gazaStrip, config);
            case 30:
            case 31:
                return transformCameraIfNeeded($map, views.khanYounis, config);
            default:
                throw `Camera undefined for ${step}`
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
            minZoom: config.minZoom || 9,
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
    let features;
    if (annotationsInFocus === 'all') {
        features = annotationFeatures
    } else {
        features = annotationFeatures.filter(d => annotationsInFocus.includes(d.properties.id))
    }

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