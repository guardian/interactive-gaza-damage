import { quadInOut } from "svelte/easing"

export const camera = {
  gazaOverview: {
    center: [34.49731003903227, 31.55],
    zoom: 12.5,
    bearing: 41,
    padding: { top: 20, bottom: 20, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: false,
  },
  gazaCity: {
    center: [34.4046458278726, 31.454140399206565],
    zoom: 13,
    padding: { top: 20, bottom: 20, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: false,
    align: "right",
  },
  mogden: {
    center: [-0.3402392716489544, 51.4626667050633],
    zoom: 12,
    padding: { top: 40, bottom: 40, left: 40, right: 40 },
    duration: 1000,
    easing: quadInOut,
    essential: false,
  },
  mogdenCloseUp: {
    center: [-0.3402392716489544, 51.4626667050633],
    zoom: 15,
    padding: { top: 40, bottom: 40, left: 40, right: 40 },
    duration: 1000,
    easing: quadInOut,
    essential: false,
  },
  mogdenSpills: {
    center: [-0.323355573849, 51.466717239401277],
    zoom: 15,
    padding: { top: 40, bottom: 40, left: 40, right: 40 },
    duration: 1000,
    easing: quadInOut,
    essential: false,
  },
};

export const cameraMobile = {
    englandAndWales: {
        bounds: [
            [-6.2, 49.76680721768],
            [2.1, 55.71852607341], 
        ],
        padding: {top: 60, bottom:0, left: 0, right: 0},
        duration: 1000,
        easing: quadInOut,
        essential: false,
        align: "right",
    },
    thamesRiverBasin: {
        bounds: [
            [-1.429620, 51.4632084],
            [-0.34008184576336475, 51.7732048],
        ],
        padding: {top: 0, bottom:0, left: 50, right: 80},
        duration: 1000,
        easing: quadInOut,
        essential: false,
        align: "right",
    },
    mogden: {
        center: [-0.3402392716489544, 51.4626667050633],
        zoom: 12,
        padding: {top: 40, bottom:40, left: 40, right: 40},
        duration: 1000,
        easing: quadInOut,
        essential: false,   
    }, 
    mogdenCloseUp: {
        center: [-0.3402392716489544, 51.4626667050633],
        zoom: 14,
        padding: {top: 40, bottom:40, left: 40, right: 40},
        duration: 1000,
        easing: quadInOut,
        essential: false,   
    },
    mogdenSpills: {
        center: [-0.320652985, 51.466436],
        zoom: 14,
        padding: {top: 0, bottom:0, left: 0, right: 0},
        duration: 1000,
        easing: quadInOut,
        essential: false,   
    }
}

