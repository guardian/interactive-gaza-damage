import { writable, derived } from 'svelte/store';
import { isMobile } from '$lib/stores/devices';
import { fetchJSON } from '$lib/helpers/fetchJSON.js';
import { extend } from '$lib/helpers/util';

export const annotationFeatures = writable(null);

export async function fetchAnnotationFeatures() {
  const fetchBeitHanoun = fetchJSON("__assetsPath__/geojson/beit-hanoun-annotations-simplified.geojson")
  const fetchAlZahra = await fetchJSON("__assetsPath__/geojson/al-zahra-annotations-simplified.geojson")
  const fetchKhanYounis = await fetchJSON("__assetsPath__/geojson/khan-younis-annotations-simplified.geojson")

  Promise.all([fetchBeitHanoun, fetchAlZahra, fetchKhanYounis]).then(([beitHanoun, alZahra, khanYounis]) => {
      annotationFeatures.set({
        beitHanoun: beitHanoun.features,
        alZahra: alZahra.features,
        khanYounis: khanYounis.features,
      });
  });
}

export const annotationLabelsForIDs = derived([isMobile], ([$isMobile]) => {
  return (annotationIDs, area) => {
    const annotationsForArea = annotations[area];
    const filtered = annotationsForArea.filter(d => {
      return annotationIDs.includes(d.id)
    }) 

    return filtered.map((d) => {
        if ($isMobile && d.mobile) {
          return extend(d, d.mobile)
        }

        return d;
    })
  }
})

// IDs match those in spreadsheet
const beitHanoun = [
  {
    id: 1,
    location: [34.55129, 31.54814],
    config: {
      text: "Razed orchards and agricultural fields",
      textWidth: 158,
      lineLength: 20,
    },
    hint: {
      location: [34.54889, 31.54571],
    },
    mobile: {
      config: {
        textWidth: 130,
        textRadialOffset: 4,
      }
    }
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
    location: [34.53571, 31.54735],
    config: {
      text: "Destroyed neighbourhood, with 40 buildings levelled",
      textWidth: 220,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "center",
    },
    hint: {
      location: [34.53383, 31.54557],
    }
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
      text: "Damaged buildings around wastewater treatment plant",
      textWidth: 160,
      lineLength: 20,
    },
    hint: {
      location: [34.42917, 31.48572]
    }
  },
  {
    id: 3,
    location: [34.42161, 31.48623],
    config: {
      text: "Paths for armoured vehicles over farmland",
      textWidth: 186,
      lineLength: 20,
    },
    hint: {
      location: [34.41977, 31.48367]
    }
  },
  {
    id: 4,
    location: [34.42767, 31.48255],
    config: {
      text: "Destroyed agricultural land",
      textWidth: 134,
      lineLength: 20,
    },
  },
  {
    id: 5,
    location: [34.42510, 31.48451],
    config: {
      text: "Destroyed orchards",
      textWidth: 80,
      lineLength: 20,
    },
  },
  {
    id: 7,
    location: [34.42772, 31.47846],
    config: {
      text: "Damaged buildings in university compound",
      textWidth: 96,
      lineLength: 20,
    },
  },
  {
    id: 8,
    location: [34.43483, 31.47687],
    config: {
      text: "Destroyed mosque",
      textWidth: 70,
      lineLength: 20,
      lineDirection: "up",
      textPosition: "center",
    },
  },
  {
    id: 9,
    location: [34.43484, 31.47572],
    config: {
      text: "Destroyed greenhouses and agricultural land",
      textWidth: 190,
      lineLength: 20,
      lineDirection: "down",
    },
  },
  {
    id: 19,
    location: [34.43727, 31.48456],
    config: {
      text: "Damage reported at school",
      textWidth: 200,
      lineLength: 20,
      lineDirection: "right",
      textPosition: "center",
    },
  },
  {
    id: 22,
    location: [34.42810, 31.47148],
    config: {
      text: "Destroyed greenhouses and agricultural land",
      textWidth: 190,
      lineLength: 20,
    },
  },
  {
    id: 10,
    location: [34.42095, 31.46700],
    config: {
      text: "Large crater where building stood",
      textWidth: 160,
      lineLength: 20,
    },
  },
  {
    id: 11,
    location: [34.41871, 31.46916],
    config: {
      text: "Destroyed buildings",
      textWidth: 80,
      lineLength: 28,
      lineDirection: "down",
    },
  },
  {
    id: 12,
    location: [34.41690, 31.47059],
    config: {
      text: "Reportedly damaged school",
      textWidth: 140,
      lineLength: 28,
      lineDirection: "down",
    },
  },
  {
    id: 20,
    location: [34.42155, 31.47049],
    config: {
      text: "Damaged mosque",
      textWidth: 80,
      lineLength: 20,
    },
  },
  {
    id: 24,
    location: [34.41789, 31.47145],
    config: {
      text: "Destroyed buildings",
      textWidth: 100,
      lineLength: 24,
    },
  },
  {
    id: 13,
    location: [34.41724, 31.47857],
    config: {
      text: "Craters and tire tracks around Turkish-Palestinian Friendship hospital",
      textWidth: 220,
      lineLength: 20,
    },
  },
  {
    id: 15,
    location: [34.41424, 31.47531],
    config: {
      text: "Buildings levelled",
      textWidth: 150,
      lineLength: 28,
      lineDirection: "down",
    },
  },
  {
    id: 16,
    location: [34.40367, 31.47673],
    config: {
      text: "Damaged Palestine University",
      textWidth: 160,
      lineLength: 20,
      lineDirection: "left",
    },
  },
  {
    id: 23,
    location: [34.40822, 31.48216],
    config: {
      text: "Damage at Israa University",
      textWidth: 126,
      lineLength: 20,
      lineDirection: "left",
    },
  },
  {
    id: 25,
    location: [34.40559, 31.47947],
    config: {
      text: "Craters around university building",
      textWidth: 150,
      lineLength: 20,
      lineDirection: "right",
    },
  },
  {
    id: 18,
    location: [34.40204, 31.47165],
    config: {
      text: "12 tower blocks levelled, others destroyed",
      textWidth: 140,
      lineLength: 20,
      lineDirection: "left",
    },
  },
  {
    id: 21,
    location: [34.40004, 31.46933],
    config: {
      text: "Damaged mosque",
      textWidth: 100,
      lineLength: 20,
      lineDirection: "down",
    },
  },
]

const khanYounis = [
  {
    id: 1,
    location: [34.30606, 31.35816],
    config: {
      text: "Six destroyed greenhouses",
      textWidth: 110,
      lineLength: 20,
    },
  },
  {
    id: 3,
    location: [34.31057, 31.35252],
    config: {
      text: "Damaged residential block",
      textWidth: 120,
      lineLength: 20,
      lineDirection: "right",
    },
  },
  {
    id: 4,
    location: [34.30620, 31.35168],
    config: {
      text: "Destroyed Al-Katiba mosque",
      textWidth: 168,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "start",
    },
  },
  {
    id: 36,
    location: [34.31274, 31.35478],
    config: {
      text: "Destroyed sports ground",
      textWidth: 116,
      lineLength: 20,
    },
  },
  {
    id: 42,
    location: [34.32855, 31.34347],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 23,
    location: [34.32716, 31.34919],
    config: {
      text: "Large craters and over 100 greenhouses destroyed",
      textWidth: 220,
      lineLength: 28,
      lineDirection: "down",
      textPosition: "start",
    },
  },
  {
    id: 24,
    location: [34.32383, 31.35283],
    config: {
      text: "Destroyed Jaafar mosque",
      textWidth: 136,
      lineLength: 20,
      lineDirection: "down",
    },
  },
  {
    id: 33,
    location: [34.31875, 31.35198],
    config: {
      text: "Damaged residential buildings and agricultural fields",
      textWidth: 244,
      lineLength: 20,
    },
  },
  {
    id: 25,
    location: [34.33612, 31.34580],
    config: {
      text: "Destroyed supermarket",
      textWidth: 110,
      lineLength: 20,
    },
  },
  {
    id: 26,
    location: [34.33396, 31.34464],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 30,
    location: [34.33030, 31.34554],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 21,
    location: [34.32280, 31.34284],
    config: {
      text: "Damaged pharmacy",
      textWidth: 100,
      lineLength: 20,
      textPosition: "start",
    },
  },
  {
    id: 22,
    location: [34.32235, 31.34358],
    config: {
      text: "Destroyed mosque",
      textWidth: 76,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "end",
    },
  },
  {
    id: 31,
    location: [34.32343, 31.34621],
    config: {
      text: "Damaged kindergarten",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 29,
    location: [34.32724, 31.34086],
    config: {
      text: "Damaged pharmacy",
      textWidth: 80,
      lineLength: 20,
    },
  },
  {
    id: 16,
    location: [34.31677, 31.34397],
    config: {
      text: "Damaged boys' school",
      textWidth: 100,
      lineLength: 20,
    },
  },
  {
    id: 17,
    location: [34.31532, 31.34478],
    config: {
      text: "Damaged girls' school",
      textWidth: 108,
      lineLength: 20,
    },
  },
  {
    id: 39,
    location: [34.31387, 31.34273],
    config: {
      text: "Damaged Khaled al Hassan school",
      textWidth: 140,
      lineLength: 20,
      lineDirection: "right",
    },
  },
  {
    id: 50,
    location: [34.31783, 31.34108],
    config: {
      text: "Destroyed cemetery",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 19,
    location: [34.32010, 31.34432],
    config: {
      text: "Damaged primary school",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 41,
    location: [34.32301, 31.34428],
    config: {
      text: "Destroyed historical landmark",
      textWidth: 154,
      lineLength: 20,
    },
  },
  {
    id: 20,
    location: [34.31992, 31.34338],
    config: {
      text: "Damaged medical centre",
      textWidth: 143,
      lineLength: 20,
      lineDirection: "down",
      textPosition: "end",
    },
  },
  {
    id: 18,
    location: [34.32135, 31.34234],
    config: {
      text: "Destroyed cemetery",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 12,
    location: [34.30679, 31.34756],
    config: {
      text: "Damage around Khalil Rahman mosque",
      textWidth: 140,
      lineLength: 20,
    },
  },
  {
    id: 6,
    location: [34.30866, 31.34747],
    config: {
      text: "Residential buildings destroyed",
      textWidth: 60,
      lineLength: 20,
      textPosition: "end",
    },
  },
  {
    id: 5,
    location: [34.30745, 31.34451],
    config: {
      text: "Damage around secondary school",
      textWidth: 140,
      lineLength: 20,
      lineDirection: "down",
    },
  },
  {
    id: 35,
    location: [34.30944, 31.34521],
    config: {
      text: "Destroyed residential buildings",
      textWidth: 260,
      lineLength: 12,
      lineDirection: "down",
      textPosition: "start",
    },
  },
  {
    id: 51,
    location: [34.31001, 31.34653],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 20,
      textPosition: "end",
    },
  },
  {
    id: 8,
    location: [34.31100, 31.34687],
    config: {
      text: "Destroyed park",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 9,
    location: [34.31088, 31.34523],
    config: {
      text: "Cratered roads around Al Bandar Al Sharqi hospital",
      textWidth: 160,
      lineLength: 20,
      textPosition: "start",
    },
  },
  {
    id: 13,
    location: [34.28773, 31.35088],
    config: {
      text: "Damaged refugee camp buildings",
      textWidth: 90,
      lineLength: 20,
    },
  },
  {
    id: 53,
    location: [34.28744, 31.34852],
    config: {
      text: "Khaled bin Al-Walid Mosque",
      textWidth: 90,
      lineLength: 20,
      lineDirection: "down",
    },
  },
]

const annotations = {
  'beit-hanoun': beitHanoun,
  'al-zahra': alZahra,
  'khan-younis': khanYounis,
}


