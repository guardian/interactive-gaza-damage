import { quadInOut } from "svelte/easing";

export const camera = {
  gazaNorth: {
    bounds: [
      [34.44475, 31.492539],
      [34.579689, 31.602306],
    ],
    bearing: 41,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: true,
  },
  beitHanoun: {
    center: [34.54019, 31.539],
    zoom: 14,
    // bounds: [
    //   [34.53216, 31.55156],
    //   [34.54878, 31.52642],
    // ],
    bearing: 41,
    padding: { top: 0, bottom: 300, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: true,
  },
  beitHanounDetail1: {
    center: [34.55016, 31.54694],
    zoom: 15.5,
    bearing: 41,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: true,
  },
  beitHanounDetail2: {
    center: [34.53465, 31.54647],
    zoom: 15.5,
    bearing: 41,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    duration: 1000,
    easing: quadInOut,
    essential: true,
  },
};

export const cameraMobile = {};
