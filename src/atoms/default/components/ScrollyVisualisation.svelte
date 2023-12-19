<script>
    import Map from "$lib/components/map/Map.svelte";
    import LineLayer from "$lib/components/map/map-layers/LineLayer.svelte";
    import CircleLayer from "$lib/components/map/map-layers/CircleLayer.svelte";
    import PolygonLayer from "$lib/components/map/map-layers/PolygonLayer.svelte";
    import SymbolLayer from "$lib/components/map/map-layers/SymbolLayer.svelte";
    import RasterLayer from "$lib/components/map/map-layers/RasterLayer.svelte";
    import AnnotationsLayer from "$lib/components/map/AnnotationsLayer.svelte"
    import Annotation from "$lib/components/map/Annotation.svelte";
    import TextAnnotation from "$lib/components/map/TextAnnotation.svelte";
    import Legend from "./Legend.svelte";
    import { ecoStatusCategories } from "$lib/helpers/colourScales.js";
    import { isMobile } from "$lib/stores/devices";
    import { annotations, annotationsMobile } from "../annotations.js";
    import { camera, cameraMobile } from "../camera.js";

    export let step = 0;
    export let offset = 0;
    
    let map, mapWidth = 0;

    $: blurAmount = step == 4 || step == 9 ? 10 : 0;
    $: coverMap = blurAmount > 0;
    
    $: if (map) {
        // hide boundaries when scrolly starts
        map.setPaintProperty("boundaries", "line-opacity", step == 0 || step >= 3 ? 1 : 0);
    }
    
    let cameraPosition;
    $: currentCamera = $isMobile ? cameraMobile : camera;
    $: {
        let view;
        switch (step) {
        case 5:
            view = currentCamera.thamesRiverBasin;
            if (!$isMobile) {
                view.padding.right = 0.2 * Math.max(0, mapWidth - 1000)
            }
            cameraPosition = view
            break;
        case 6:
            cameraPosition = currentCamera.mogden
            break;
        case 7:
            cameraPosition = currentCamera.mogdenCloseUp
            break;
        case 8:
            cameraPosition = currentCamera.mogdenSpills
            break;
        case 9:
            cameraPosition = currentCamera.mogdenSpills
            break;
        default:
            view = currentCamera.englandAndWales;
            if (!$isMobile) {
                view.padding.right = 0.3 * Math.max(0, mapWidth - 1000)
            }
            cameraPosition = view
            break;
        }
    }

    $: if (step == 9 && offset >= 0.4) {
        // change camera position without animation during second overlay step
        let newPosition = currentCamera.englandAndWales;
        newPosition.animate = false;
        cameraPosition = newPosition;
    }

    const namedInLawsuit = ["Severn Trent Water", "Thames Water", "United Utilities", "Anglian Water", "Yorkshire Water", "Northumbrian Water"]
    
    // ecological status
    const ecologicalStatusPaintSettings = {
        "line-color": [
        "case",
        ["==", ["get", "eco_status"], ecoStatusCategories[0].label],
        ecoStatusCategories[0].colour,
        ["==", ["get", "eco_status"], ecoStatusCategories[1].label],
        ecoStatusCategories[1].colour,
        ["==", ["get", "eco_status"], ecoStatusCategories[2].label],
        ecoStatusCategories[2].colour,
        ["==", ["get", "eco_status"], ecoStatusCategories[3].label],
        ecoStatusCategories[3].colour,
        ["==", ["get", "eco_status"], ecoStatusCategories[4].label],
        ecoStatusCategories[4].colour,
        "#CCCCCC"
        ],
        "line-width": [
            "interpolate", ["linear"], ["zoom"],
            5, 1,
            9, 3
        ],
    };

    function annnotationsForStep(step, annotations) {
        const key = `step-${step}`
        if (key in annotations) {
            return annotations[key].map(d => ({
                ...d,
                id: Math.random().toString(36) // `${d.text.title}-${step}`,
            }));
        }
        return [];
    }

    $: annotationsForCurrentStep = $isMobile ? annnotationsForStep(step, annotationsMobile) : annnotationsForStep(step, annotations);
    $: mapCoverOpacity = step == 9 ? 1 : 0.5;
</script>

<div class="background-container" style="--blur-amount: {blurAmount}px;" bind:clientWidth={mapWidth}>
    <Map bind:this={map} {cameraPosition} interactive={false}>

        <PolygonLayer
            id="sewerage-services-areas"
            beforeId="greenspace names"
            source="data-tiles"
            sourceLayer="Sewerageservicesareas"
            filter={["==", ["get", "CoType"], "regional water and sewerage company"]}
            strokePaint={{
                'line-width': 1,
                'line-color': '#BABABA',
            }}
            opacity={step == 1 || step == 2 ? 1 : 0}
        />

        <PolygonLayer
            id="sewerage-services-areas-lawsuit"
            beforeId="greenspace names"
            source="data-tiles"
            sourceLayer="Sewerageservicesareas"
            filter={["in", ["get", "COMPANY"], ["literal", namedInLawsuit]]}
            fillPaint={{
                'fill-color': '#CC0A11',
            }}
            strokePaint={{
                'line-width': 2,
                'line-color': '#707070',
            }}
            opacity={step == 2 ? 0.4 : 0}
        />

        <SymbolLayer
            id="sewerage-company-names"
            source="data-tiles"
            sourceLayer="WaterCompanyLabels"
            layout={{
                "text-size": 14,
                "text-field": ['get', 'name'],
                "text-letter-spacing": 0.03,
                "text-radial-offset": 0.5,
                "text-variable-anchor": ['top', 'bottom', 'center', 'left', 'right'],
                "text-justify": "auto",
                "text-font": ["Gdn Text Sans TS3Regular"],
                "visibility": step == 1 || step == 2 ? "visible" : "none",
            }}
            paint={{
                "text-color": "#121212",
                "text-halo-color": "#f1efec",
                "text-halo-width": 2,
                "text-halo-blur": 1,
            }}
        />

        <CircleLayer
            id="emd-spills-2022"
            source="data-tiles"
            sourceLayer="EDMspills2022"
            beforeId="greenspace names"
            paint={{
                "circle-opacity": 0,
                "circle-radius": [ // sqrt(totalDuration / Math.PI) / 4
                    "/",
                    ["sqrt", ["/", ["get", "duration"], ["literal", Math.PI]]],
                    ["literal", $isMobile ? 8 : 4]
                ],
                "circle-stroke-color": "#7b5a00",
                "circle-stroke-width": 1,
                "circle-stroke-opacity": step == 3 ? 0.5 : 0,
            }}
        />

        <CircleLayer
            id="emd-spills-2022-annotated"
            source="data-tiles"
            sourceLayer="EDMspills2022top10"
            beforeId="greenspace names"
            paint={{
                "circle-opacity": 0,
                "circle-radius": [ // sqrt(duration / Math.PI) / 4
                    "/",
                    ["sqrt", ["/", ["get", "duration"], ["literal", Math.PI]]],
                    ["literal", $isMobile ? 8 : 4]
                ],
                "circle-stroke-color": "#121212",
                "circle-stroke-width": 1,
                "circle-stroke-opacity": step == 3 ? 1 : 0,
            }}
        />

        <PolygonLayer
            id="thames-river-basin-inverted"
            source="data-tiles"
            sourceLayer="Thamesriverbasininverted"
            fillPaint={{
                'fill-color': "#A1A1A1",
            }}
            strokePaint={{
                'line-width': 1,
                'line-color': '#333',
                
            }}
            opacity={ step == 5 ? 0.1 : 0}
        />

  
        <RasterLayer
            layerName="raster-layer-mogden"
            opacity={ step == 7 || step == 8 ? 1 : 0}
            />

        <LineLayer 
        id="rivers-england-wales"
        source="data-tiles"
        sourceLayer="ecologicalstatus"
        beforeId="greenspace names"
            filter={
                ["in", ["get", "country"], ["literal", ["England", "Wales"]]]
            }
            paint={{
                "line-color": ecoStatusCategories[2].colour,
                "line-opacity": step == 10 || step == 11 ? 0.7 : 0,
                "line-width": [
                    "interpolate", ["linear"], ["zoom"],
                    5, 1,
                    9, 3
                ],
            }}
        />

        <LineLayer 
            id="ecological-status-england"
            source="data-tiles"
            sourceLayer="ecologicalstatus"
            beforeId="greenspace names"
            filter={[
                "all",
                ["==", ["get", "country"], "England"],
                ["in", ["get", "eco_status"], ["literal", ["Bad", "Poor", "Good", "High"]]]
            ]}
            paint={{
                ...ecologicalStatusPaintSettings,
                "line-opacity": step == 10 ? 1 : step == 11 ? 0.6 : 0,
            }}
        />

        <PolygonLayer
            id="england-boundary"
            beforeId="greenspace names"
            source="data-tiles"
            sourceLayer="CountriesGB"
            filter={["==", ["get", "country"], "England"]}
            strokePaint={{
                'line-width': 1,
                'line-color': '#707070',
            }}
            opacity={step == 10 ? 1 : 0}
        />

        <LineLayer 
            id="ecological-status-wales"
            source="data-tiles"
            sourceLayer="ecologicalstatus"
            beforeId="greenspace names"
            filter={[
                "all",
                ["==", ["get", "country"], "Wales"],
                ["in", ["get", "eco_status"], ["literal", ["Bad", "Poor", "Good", "High"]]]
            ]}
            paint={{
                ...ecologicalStatusPaintSettings,
                "line-opacity": step == 11 ? 1 : 0,
            }}
        />

        <PolygonLayer
            id="wales-boundary"
            beforeId="greenspace names"
            source="data-tiles"
            sourceLayer="CountriesGB"
            filter={["==", ["get", "country"], "Wales"]}
            strokePaint={{
                'line-width': 1,
                'line-color': '#707070',
            }}
            opacity={step == 11 ? 1 : 0}
        />
    </Map>
    <div class="map-cover" style="opacity: {coverMap ? mapCoverOpacity : 0};"></div>
    <div class="legend-container" style="opacity: {step == 3 || step == 10 || step == 11 ? 1 : 0};">
        {#if step >= 2 && step <= 4}
            <Legend 
                title="Total spilling duration in 2022"
                subtitle="Spilling is allowed under certain conditions"
                image="__assetsPath__/img/bubble-legend.svg"
            />
        {:else if step == 10 || step == 11}
            <Legend 
                title="Ecological status"
                subtitle="Most recent classification"
                categories={ecoStatusCategories} 
            />
        {/if}
    </div>
    {#if map }
        <div class="annotations-container" style="opacity: {annotationsForCurrentStep.length ? 1 : 0};">
            <AnnotationsLayer project={map.project} onMapMove={map.onMove}>
                {#each annotationsForCurrentStep as annotation (annotation.id)}
                    <Annotation center={[annotation.longitude, annotation.latitude]}>
                        {#if annotation.text}
                        <TextAnnotation 
                            {...annotation.text}
                        /> 
                        {/if}
                    </Annotation>
                {/each}
            </AnnotationsLayer>
        </div>
    {/if}
</div>

<style lang="scss">
   .background-container {
        width: 100%;
        position: relative;

        filter: blur(var(--blur-amount));
        transition: 0.5s filter linear;

        height: calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0));

        @supports(height: 100dvh) {
            height: 100dvh;
        }

        @supports (-webkit-touch-callout: none) {
            /* height fix for older versions of Safari on iOS */
            min-height: -webkit-fill-available;
        }
   }

   .map-annotations {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: antiquewhite;
        opacity: 0.5;
   }

   .map-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #f6f5f3;
        transition: 0.5s opacity linear;
   }
   
   .legend-container {
        --margin: 10px;
        position: absolute;
        top: 10px;
        width: calc(100% - var(--margin) * 2);
        margin: 0 var(--margin);
        transition: opacity 0.5s;
        padding: 4px 10px 12px 10px;
        background-color: rgba(246, 245, 243, 0.8);
        border-top: 1px solid #999;

        @include mq($from: tablet) {
            width: auto;
            margin: 0;
            right: 10px;
        }
   }

   :global(.android .legend-container) {
        top: 60px;
   }

   .legend-container h3 {
        @include f-headline();
        font-size: 20px;
        line-height: 115%;
        font-weight: 700;
        margin-bottom: 12px;
   }

   .annotations-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.5s;
        z-index: 100;
   }
</style>