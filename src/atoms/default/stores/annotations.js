import { writable } from 'svelte/store';
import { fetchJSON } from '$lib/helpers/fetchJSON.js';

export const annotationFeatures = writable(null);

export async function fetchAnnotationFeatures() {
  const fetchBeitHanoun = fetchJSON("__assetsPath__/geojson/beit-hanoun-annotations-simplified.geojson")
  const fetchAlZahra = await fetchJSON("__assetsPath__/geojson/al-zahra-annotations-simplified.geojson")

  Promise.all([fetchBeitHanoun, fetchAlZahra]).then(([beitHanoun, alZahra]) => {
      annotationFeatures.set({
        beitHanoun: beitHanoun.features,
        alZahra: alZahra.features,
      });
  });
}

export function annotationLabelsForIDs(annotationIDs, area) {
  const annotationsForArea = annotations[area];
  return annotationsForArea.filter(d => {
    return annotationIDs.includes(d.id)
  }) 
}

// IDs match those in spreadsheet
const beitHanoun = [
  {
    id: 1,
    location: [34.55, 31.54908],
    config: {
      text: "Razed orchards and agricultural fields",
      textWidth: 158,
      lineLength: 20,
    },
  },
  {
    id: 2,
    location: [34.54719, 31.54389],
    config: {
      text: "Three destroyed greenhouses and nearby solar panels",
      textWidth: 220,
      lineLength: 24,
      lineDirection: "right",
      textPosition: "end",
    },
  },
  {
    id: 3,
    location: [34.54259, 31.54358],
    config: {
      text: "27 destroyed greenhouses",
      textWidth: 110,
      lineLength: 20,
    },
  },
  {
    id: 4,
    location: [34.54185, 31.54866],
    config: {
      text: "Seven destroyed solar panels and one greenhouse",
      textWidth: 220,
      lineLength: 20,
    },
  },
  {
    id: 35,
    visibleForSteps: [],
    location: [34.55012, 31.53463],
    config: {
      text: "Razed fields",
      textWidth: 97,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "center",
    },
  },
  {
    id: 5,
    visibleForSteps: [],
    location: [34.55014, 31.53942],
    config: {
      text: "Entire neighborhood, with over 150 buildings, flattened",
      textWidth: 236,
      lineLength: 32,
      textPosition: "start",
    },
  },
  {
    id: 7,
    visibleForSteps: [],
    location: [34.547, 31.53882],
    config: {
      text: "Destroyed mosque",
      textWidth: 160,
      lineLength: 0,
      lineDirection: "down",
    },
  },
  {
    id: 6,
    visibleForSteps: [5, 6],
    location: [34.54533, 31.53639],
    config: {
      text: "Demolished UNRWA school",
      textWidth: 200,
      lineLength: 20,
      lineDirection: "right",
      textPosition: "start",
    },
  },
  {
    id: 8,
    visibleForSteps: [],
    location: [34.54013, 31.54019],
    config: {
      text: "Destroyed secondary schools",
      textWidth: 97,
      lineLength: 20,
      lineDirection: "right",
      textPosition: "center",
    },
  },
  {
    id: 9,
    visibleForSteps: [5, 6],
    location: [34.53802, 31.53864],
    config: {
      text: "Damaged Beit Hanoun hospital",
      textWidth: 110,
      lineLength: 60,
      lineDirection: "right",
      textPosition: "end",
    },
  },
  {
    id: 33,
    visibleForSteps: [5, 6],
    location: [34.53770, 31.53860],
    config: {
      text: "Damaged bakery",
      textWidth: 90,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "start",
    },
  },
  {
    id: 34,
    visibleForSteps: [5, 6],
    location: [34.53799, 31.53888],
    config: {
      text: "Damaged library",
      textWidth: 90,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "center",
    },
  },
  {
    id: 10,
    visibleForSteps: [5, 6],
    location: [34.53641, 31.54063],
    config: {
      text: "Bulldozed cemetery",
      textWidth: 70,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "center",
    },
  },
  {
    id: 11,
    visibleForSteps: [5, 6],
    location: [34.53621, 31.54163],
    config: {
      text: "Damaged Umm al-Nasr mosque",
      textWidth: 140,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "center",
    },
  },
  {
    id: 12,
    visibleForSteps: [],
    location: [34.54073, 31.54505],
    config: {
      text: "Destroyed agriculture school and greenhouses",
      textWidth: 200,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "end",
    },
  },
  {
    id: 14,
    visibleForSteps: [],
    location: [34.53325, 31.54200],
    config: {
      text: "Damaged mosque",
      textWidth: 100,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "center",
    },
  },
  {
    id: 15,
    visibleForSteps: [],
    location: [34.53077, 31.53727],
    config: {
      text: "Bulldozed and cratered football stadium",
      textWidth: 200,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "center",
    },
  },
  {
    id: 27,
    visibleForSteps: [],
    location: [34.53664, 31.53833],
    config: {
      text: "Destroyed supermarket",
      textWidth: 100,
      lineLength: 30,
      lineDirection: "down",
      textPosition: "center",
    },
  },
  {
    id: 13,
    visibleForSteps: [6],
    location: [34.53571, 31.54735      ],
    config: {
      text: "Destroyed neighbourhood, with 40 buildings levelled",
      textWidth: 220,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "center",
    },
  },
  {
    id: 17,
    visibleForSteps: [6],
    location: [34.52556, 31.54546],
    config: {
      text: "Damaged mosque",
      textWidth: 120,
      lineLength: 20,
      lineDirection: "right",
      textPosition: "start",
    },
  },
  {
    id: 18,
    visibleForSteps: [6],
    location: [34.52503, 31.54904],
    config: {
      text: "Destroyed residential area, multiple buildings levelled",
      textWidth: 220,
      lineLength: 40,
      lineDirection: "up",
      textPosition: "end",
    },
  },
  {
    id: 19,
    visibleForSteps: [6],
    location: [34.51907, 31.54814],
    config: {
      text: "Destroyed Balsam Hospital",
      textWidth: 130,
      lineLength: 20,
      lineDirection: "left",
      textPosition: "end",
    },
  },
  {
    id: 20,
    location: [34.52031, 31.54641],
    config: {
      text: "Damaged school campus",
      textWidth: 200,
      lineLength: 40,
      lineDirection: "up",
      textPosition: "start",
    },
  },
  {
    id: 21,
    location: [34.51883, 31.54552],
    config: {
      text: "Destroyed tower blocks, some buildings levelled",
      textWidth: 200,
      lineLength: 40,
      lineDirection: "right",
      textPosition: "start",
    },
  },
  {
    id: 22,
    location: [34.51713, 31.54580],
    config: {
      text: "Damaged school",
      textWidth: 80,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "center",
    },
  }
];

const alZahra = [
  {
    id: 2,
    location: [34.43077, 31.48736],
    config: {
      text: "Wastewater treatment plant",
      textWidth: 130,
      lineLength: 20,
    },
  },
]

const annotations = {
  'beit-hanoun': beitHanoun,
  'al-zahra': alZahra,
}


