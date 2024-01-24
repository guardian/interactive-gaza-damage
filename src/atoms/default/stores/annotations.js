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
      text: "Destroyed orchards and agricultural fields",
      textWidth: 158,
      lineLength: 16,
    },
    hint: {
      location: [34.54889, 31.54571],
    },
    mobile: {
      config: {
        textWidth: 130,
        lineLength: 12,
      }
    }
  },
  {
    id: 2,
    location: [34.54693, 31.54459],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 110,
      lineLength: 16,
      textPosition: "center",
    },
    mobile: {
      location: [34.54693, 31.54459],
      config: {
        textWidth: 90,
        lineLength: 12,
        lineDirection: "up",
        textPosition: "center",
      }
    }
  },
  {
    id: 3,
    location: [34.54259, 31.54358],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 110,
    },
    mobile: {
      config: {
        textWidth: 86,
        lineLength: 12,
      }
    }
  },
  {
    id: 4,
    location: [34.54185, 31.54866],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 110,
      lineLength: 16,
    },
    mobile: {
      config: {
        lineLength: 12,
        textWidth: 30,
        textPosition: "start",
      }
    }
  },
  {
    id: 35,
    visibleForSteps: [],
    location: [34.55122, 31.53580],
    config: {
      text: "Flattened fields",
      textWidth: 97,
      lineDirection: "up",
      textPosition: "center",
      lineLength: 16,
    },
    mobile: {
      config: {
        lineLength: 12,
      }
    }
  },
  {
    id: 5,
    visibleForSteps: [],
    location: [34.55014, 31.53942],
    config: {
      text: "More than 150 buildings flattened",
      textWidth: 180,
      lineLength: 20,
      textPosition: "start",
    },
    mobile: {
      config: {
        textWidth: 120,
        textPosition: "center",
        lineLength: 16,
      }
    }
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
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 6,
    visibleForSteps: [5, 6],
    location: [34.54533, 31.53639],
    config: {
      text: "Demolished UNRWA school",
      textWidth: 160,
      lineDirection: "right",
      textPosition: "start",
    },
    mobile: {
      location: [34.54444, 31.53615],
      config: {
        textWidth: 96,
        lineLength: 12,
        lineDirection: "down",
        textPosition: "center",
      }
    }
  },
  {
    id: 8,
    visibleForSteps: [],
    location: [34.54013, 31.54019],
    config: {
      text: "Destroyed secondary schools",
      textWidth: 97,
      lineDirection: "right",
      textPosition: "center",
    },
    mobile: {
      config: {
        lineLength: 12,
      }
    }
  },
  {
    id: 9,
    visibleForSteps: [5, 6],
    location: [34.53802, 31.53864],
    config: {
      text: "Damaged Beit Hanoun hospital",
      textWidth: 110,
      lineLength: 40,
      lineDirection: "right",
      textPosition: "end",
      textRadialOffset: 8,
    },
    mobile: {
      location: [34.53715, 31.53946],
      config: {
        textWidth: 84,
        textRadialOffset: -12,
        lineLength: 20,
        lineDirection: "left",
        textPosition: "start",
      }
    }
  },
  {
    id: 33,
    visibleForSteps: [5, 6],
    location: [34.53770, 31.53860],
    config: {
      text: "Damaged bakery",
      textWidth: 90,
      lineLength: 28,
      lineDirection: "down",
      textPosition: "start",
    },
    mobile: {
      config: {
        text: "",
        lineLength: 0,
      }
    }
  },
  {
    id: 34,
    visibleForSteps: [5, 6],
    location: [34.53799, 31.53888],
    config: {
      text: "Damaged library",
      textWidth: 90,
      lineLength: 36,
      lineDirection: "up",
      textPosition: "center",
    },
    mobile: {
      config: {
        text: "Damaged library and bakery",
        textWidth: 68,
        textPosition: "end",
      }
    }
  },
  {
    id: 10,
    visibleForSteps: [5, 6],
    location: [34.53641, 31.54063],
    config: {
      text: "Bulldozed cemetery",
      textWidth: 70,
      lineDirection: "down",
      textPosition: "center",
    },
    mobile: {
      location: [34.53693, 31.54118],
      config: {
        lineLength: 12,
        lineDirection: "up",
      }
    }
  },
  {
    id: 11,
    visibleForSteps: [5, 6],
    location: [34.53621, 31.54163],
    config: {
      text: "Damaged Umm al-Nasr mosque",
      textWidth: 140,
      lineDirection: "up",
      textPosition: "center",
    },
    mobile: {
      location: [34.53600, 31.54162],
       config: {
          text: "Damaged Umm al-Nasr mosque",
          textWidth: 86,
          lineLength: 16,
          lineDirection: "left",
          textPosition: "center",
        },
    }
  },
  {
    id: 12,
    visibleForSteps: [],
    location: [34.54073, 31.54505],
    config: {
      text: "Destroyed agriculture school and greenhouses",
      textWidth: 200,
      lineDirection: "up",
      textPosition: "end",
    },
    mobile: {
      config: {
        textWidth: 80,
        lineLength: 12,
      }
    }
  },
  {
    id: 14,
    visibleForSteps: [],
    location: [34.53347, 31.54221],
    config: {
      text: "Damaged mosque",
      textWidth: 74,
      lineLength: 16,
      textPosition: "center",
    },
  },
  {
    id: 15,
    visibleForSteps: [],
    location: [34.53179, 31.53837],
    config: {
      text: "Bulldozed and cratered football stadium",
      textWidth: 190,
      lineLength: 16,
      lineDirection: "up",
      textPosition: "center",
    },
    mobile: {
      config: {
        textWidth: 110,
        lineLength: 12,
        textPosition: "center",
      }
    }
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
    mobile: {
      config: {
        lineLength: 12,
      }
    }
  },
  {
    id: 13,
    visibleForSteps: [6],
    location: [34.53571, 31.54735],
    config: {
      text: "More than 40 buildings levelled",
      textWidth: 150,
      lineDirection: "up",
      textPosition: "center",
    },
    hint: {
      location: [34.53383, 31.54557],
    },
    mobile: {
      config: {
        textWidth: 120,
        lineLength: 12,
      }
    }
  },
  {
    id: 17,
    visibleForSteps: [6],
    location: [34.52556, 31.54546],
    config: {
      text: "Damaged mosque",
      textWidth: 120,
      lineDirection: "right",
      textPosition: "start",
    },
    mobile: {
      location: [34.52535, 31.54547],
      config: {
        textWidth: 60,
        lineDirection: "down",
        textPosition: "end",
      }
    }
  },
  {
    id: 18,
    visibleForSteps: [6],
    location: [34.52503, 31.54904],
    config: {
      text: "Multiple buildings levelled",
      textWidth: 76,
      lineLength: 40,
      lineDirection: "up",
      textPosition: "end",
      textRadialOffset: 8,
    },
    mobile: {
      config: {
        textWidth: 94,
        textPosition: "center",
        lineLength: 20,
      }
    }
  },
  {
    id: 19,
    visibleForSteps: [6],
    location: [34.51907, 31.54814],
    config: {
      text: "Destroyed Balsam Hospital",
      textWidth: 130,
      lineDirection: "left",
      textPosition: "end",
    },
    mobile: {
      location: [34.51945, 31.54815],
      config: {
        textWidth: 110,
        lineDirection: "up",
        textPosition: "center",
      }
    }
  },
  {
    id: 20,
    location: [34.52031, 31.54641],
    config: {
      text: "Damaged school campus",
      textWidth: 120,
      lineLength: 40,
      lineDirection: "up",
      textPosition: "start",
    },
    mobile: {
      config: {
        textWidth: 80,
        lineLength: 16,
      }
    }
  },
  {
    id: 21,
    location: [34.51883, 31.54552],
    config: {
      text: "Destroyed tower blocks",
      textWidth: 120,
      lineLength: 40,
      lineDirection: "right",
      textPosition: "start",
    },
    mobile: {
      config: {
        textWidth: 90,
        lineLength: 12,
      }
    }
  },
  {
    id: 22,
    location: [34.51713, 31.54580],
    config: {
      text: "Damaged school",
      textWidth: 80,
      lineDirection: "down",
      textPosition: "center",
      lineLength: 20,
    },
    mobile: {
      config: {
        textWidth: 60,
        lineLength: 16,
      }
    }
  }
];

const alZahra = [
  {
    id: 2,
    location: [34.43077, 31.48736],
    config: {
      text: "Damaged buildings around wastewater treatment plant",
      textWidth: 160,
    },
    hint: {
      location: [34.42917, 31.48572]
    },
    mobile: {
      config: {
        textWidth: 120,
      }
    }
  },
  {
    id: 3,
    location: [34.42161, 31.48623],
    config: {
      text: "Armoured vehicle paths over farmland",
      textWidth: 166,
    },
    hint: {
      location: [34.41977, 31.48367]
    },
    mobile: {
      config: {
        textWidth: 100,
      }
    }
  },
  {
    id: 4,
    location: [34.42767, 31.48255],
    config: {
      text: "Destroyed agricultural land",
      textWidth: 134,
    },
    mobile: {
      location: [34.42742, 31.48273],
      config: {
        textWidth: 104,
      }
    }
  },
  {
    id: 5,
    location: [34.42510, 31.48451],
    config: {
      text: "Destroyed orchards",
      textWidth: 80,
    },
  },
  {
    id: 7,
    location: [34.42772, 31.47846],
    config: {
      text: "Damaged buildings in university compound",
      textWidth: 180,
    },
    mobile: {
      config: {
        textWidth: 80,
      }
    }
  },
  {
    id: 8,
    location: [34.43483, 31.47687],
    config: {
      text: "Destroyed mosque",
      textWidth: 70,
      lineDirection: "up",
      textPosition: "center",
    },
  },
  {
    id: 9,
    location: [34.43484, 31.47572],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 100,
      lineDirection: "down",
    },
  },
  {
    id: 19,
    location: [34.43727, 31.48456],
    config: {
      text: "Damage reported at school",
      textWidth: 160,
      lineDirection: "right",
      textPosition: "center",
    },
    mobile: {
      location: [34.43714, 31.48513],
      config: {
        textWidth: 60,
        lineDirection: "up",
        textPosition: "end",
      }
    }
  },
  {
    id: 22,
    location: [34.42810, 31.47148],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 100,
    },
    mobile: {
      config: {
        textWidth: 78,
      }
    }
  },
  {
    id: 10,
    location: [34.42095, 31.46700],
    config: {
      text: "Levelled building",
      textWidth: 80,
      lineLength: 16,
    },
    mobile: {
      config: {
        lineLength: 12,
      }
    }
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
    mobile: {
      config: {
        textWidth: 60,
        lineLength: 16,
      }
    }
  },
  {
    id: 12,
    location: [34.41690, 31.47059],
    config: {
      text: "Damaged school",
      textWidth: 70,
      lineLength: 28,
      lineDirection: "down",
    },
    mobile: {
      config: {
        textWidth: 56,
        lineLength: 16,
      }
    }
  },
  {
    id: 20,
    location: [34.42155, 31.47049],
    config: {
      text: "Damaged mosque",
      textWidth: 80,
      lineLength: 16,
    },
    mobile: {
      config: {
        textWidth: 70,
      }
    }
  },
  {
    id: 24,
    location: [34.41789, 31.47145],
    config: {
      text: "Destroyed buildings",
      textWidth: 100,
      lineLength: 24,
    },
    mobile: {
      config: {
        textWidth: 70,
        lineLength: 16,
      }
    }
  },
  {
    id: 13,
    location: [34.41724, 31.47857],
    config: {
      text: "Craters and track marks around Turkish-Palestinian Friendship hospital",
      textWidth: 220,
    },
    mobile: {
      config: {
        textWidth: 168,
      }
    }
  },
  {
    id: 15,
    location: [34.41424, 31.47531],
    config: {
      text: "Buildings levelled",
      textWidth: 70,
      lineLength: 28,
      lineDirection: "down",
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 16,
    location: [34.40367, 31.47673],
    config: {
      text: "Craters around Palestine university",
      textWidth: 160,
      lineDirection: "left",
    },
    mobile: {
      config: {
        textWidth: 130,
      }
    }
  },
  {
    id: 23,
    location: [34.40822, 31.48216],
    config: {
      text: "Israa university reportedly damaged, later destroyed",
      textWidth: 170,
      lineDirection: "left",
    },
    mobile: {
      location: [34.40845, 31.48137],
      config: {
        textWidth: 136,
        lineDirection: "down",
      }
    }
  },
  {
    id: 25,
    location: [34.40559, 31.47947],
    config: {
      text: "Craters around university building",
      textWidth: 150,
      lineDirection: "right",
    },
  },
  {
    id: 18,
    location: [34.40204, 31.47165],
    config: {
      text: "12 tower blocks levelled",
      textWidth: 130,
      lineDirection: "left",
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 21,
    location: [34.40004, 31.46933],
    config: {
      text: "Damaged mosque",
      textWidth: 80,
      lineLength: 16,
      lineDirection: "down",
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
]

const khanYounis = [
  {
    id: 1,
    location: [34.30606, 31.35816],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 104,
    },
    mobile: {
      config: {
        textWidth: 80,
      }
    }
  },
  {
    id: 3,
    location: [34.31057, 31.35252],
    config: {
      text: "Destroyed residential buildings",
      textWidth: 120,
      lineDirection: "right",
    },
    mobile: {
      location: [34.30887, 31.35378],
      config: {
        textWidth: 70,
        lineDirection: "left",
      }
    }
  },
  {
    id: 4,
    location: [34.30644, 31.35196],
    config: {
      text: "Destroyed Al-Katiba mosque",
      textWidth: 120,
      lineLength: 16,
    },
    mobile: {
      config: {
        textWidth: 100,
        lineLength: 12,
      }
    }
  },
  {
    id: 36,
    location: [34.31274, 31.35478],
    config: {
      text: "Destroyed sports ground",
      textWidth: 116,
      textPosition: "center",
    },
    mobile: {
      config: {
        textWidth: 90,
        textPosition: "end",
      }
    }
  },
  {
    id: 42,
    location: [34.32855, 31.34347],
    config: {
      text: "Destroyed mosque",
      lineLength: 16,
      textWidth: 90,
    },
  },
  {
    id: 23,
    location: [34.32716, 31.34919],
    config: {
      text: "Destroyed greenhouses",
      textWidth: 100,
      lineLength: 28,
      lineDirection: "down",
      textPosition: "start",
    },
    mobile: {
      location: [34.32453, 31.34945],
      config: {
        textWidth: 80,
        lineLength: 20,
        textPosition: "center",
      }
    }
  },
  {
    id: 24,
    location: [34.32417, 31.35317],
    config: {
      text: "Destroyed Jaafar mosque",
      textWidth: 120,
    },
    mobile: {
      config: {
        textWidth: 100,
      }
    }
  },
  {
    id: 33,
    location: [34.31875, 31.35198],
    config: {
      text: "Damaged residential buildings",
      textWidth: 90,
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 25,
    location: [34.33612, 31.34580],
    config: {
      text: "Destroyed supermarket",
      textWidth: 110,
      lineLength: 16,
      textPosition: "center",
    },
    mobile: {
      config: {
        textWidth: 80,
      }
    }
  },
  {
    id: 26,
    location: [34.33396, 31.34464],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 16,
      textPosition: "center",
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 30,
    location: [34.33030, 31.34554],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      lineLength: 16,
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 21,
    location: [34.32280, 31.34284],
    config: {
      text: "Damaged pharmacy",
      textWidth: 100,
      lineLength: 16,
      textPosition: "start",
    },
    mobile: {
      config: {
        textWidth: 64,
        textPosition: "center",
      }
    }
  },
  {
    id: 22,
    location: [34.32235, 31.34358],
    config: {
      text: "Destroyed mosque",
      textWidth: 76,
      lineLength: 16,
      lineDirection: "down",
      textPosition: "end",
    },
    mobile: {
      config: {
        textWidth: 64,
        textPosition: "center",
      }
    }
  },
  {
    id: 31,
    location: [34.32343, 31.34621],
    config: {
      text: "Damaged kindergarten",
      textWidth: 90,
      lineDirection: "up",
    },
    mobile: {
      location: [34.32321, 31.34598],
      config: {
        textWidth: 70,
        lineDirection: "down",
      }
    }
  },
  {
    id: 29,
    location: [34.32724, 31.34086],
    config: {
      text: "Damaged pharmacy",
      textWidth: 80,
      lineLength: 16,
    },
  },
  {
    id: 16,
    location: [34.31677, 31.34397],
    config: {
      text: "Damaged boys' school",
      textWidth: 100,
    },
  },
  {
    id: 17,
    location: [34.31532, 31.34478],
    config: {
      text: "Damaged girls' school",
      textWidth: 108,
    },
  },
  {
    id: 39,
    location: [34.31387, 31.34273],
    config: {
      text: "Damaged Khaled al-Hassan school",
      textWidth: 140,
      lineDirection: "right",
    },
  },
  {
    id: 50,
    location: [34.31783, 31.34108],
    config: {
      text: "Damaged cemetery",
      textWidth: 90,
      lineLength: 20,
    },
    mobile: {
      config: {
        textWidth: 60,
        lineLength: 16,
      }
    }
  },
  {
    id: 19,
    location: [34.32010, 31.34432],
    config: {
      text: "Damaged primary school",
      textWidth: 90,
      lineLength: 20,
    },
    mobile: {
      config: {
        textWidth: 60,
        lineLength: 16,
      }
    }
  },
  {
    id: 41,
    location: [34.32301, 31.34428],
    config: {
      text: "Destroyed historical landmark",
      textWidth: 80,
      lineLength: 16,
    },
  },
  {
    id: 20,
    location: [34.31992, 31.34338],
    config: {
      text: "Damaged medical centre",
      textWidth: 80,
      lineDirection: "down",
      textPosition: "end",
    },
    mobile: {
      config: {
        textWidth: 60,
        lineLength: 16,
      }
    }
  },
  {
    id: 18,
    location: [34.32135, 31.34234],
    config: {
      text: "Damaged cemetery",
      textWidth: 80,
    },
    mobile: {
      config: {
        textWidth: 60,
      }
    }
  },
  {
    id: 12,
    location: [34.30679, 31.34756],
    config: {
      text: "Damage around Khalil Rahman mosque",
      textWidth: 140,
      lineLength: 16,
      textPosition: "center",
    },
    mobile: {
      location: [34.30635, 31.34787],
      config: {
        textWidth: 100,
        lineLength: 12,
        textPosition: "start",
      }
    }
  },
  {
    id: 6,
    location: [34.30866, 31.34747],
    config: {
      text: "Residential buildings destroyed",
      textWidth: 60,
      textPosition: "end",
      lineLength: 20,
    },
    mobile: {
      config: {
        lineLength: 20,
      }
    }
  },
  {
    id: 5,
    location: [34.30745, 31.34451],
    config: {
      text: "Damage around secondary school",
      textWidth: 140,
      lineDirection: "down",
    },
    mobile: {
      config: {
        textWidth: 110,
      }
    }
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
    mobile: {
      location: [34.30954, 31.34515],
      config: {
        textWidth: 100,
      }
    }
  },
  {
    id: 51,
    location: [34.31001, 31.34653],
    config: {
      text: "Destroyed mosque",
      textWidth: 90,
      textPosition: "end",
    },
    mobile: {
      config: {
        textWidth: 66,
      }
    }
  },
  {
    id: 8,
    location: [34.31100, 31.34687],
    config: {
      text: "Destroyed park",
      textWidth: 80,
      lineLength: 20,
    },
    mobile: {
      config: {
        textWidth: 70,
        lineLength: 16,
      }
    }
  },
  {
    id: 9,
    location: [34.31088, 31.34523],
    config: {
      text: "Destroyed roads around medical centre",
      textWidth: 160,
      textPosition: "start",
    },
    mobile: {
      location: [34.31051, 31.34551],
      config: {
        textWidth: 90,
      }
    }
  },
  {
    id: 13,
    location: [34.28773, 31.35088],
    config: {
      text: "Damaged refugee camp buildings",
      textWidth: 150,
      lineLength: 16,
    },
    mobile: {
      config: {
        textWidth: 116,
      }
    }
  },
  {
    id: 53,
    location: [34.28744, 31.34852],
    config: {
      text: "Khaled bin Al-Walid Mosque",
      textWidth: 120,
      lineDirection: "down",
      lineLength: 16,
    },
    mobile: {
      config: {
        textWidth: 90,
      }
    }
  },
]

const annotations = {
  'beit-hanoun': beitHanoun,
  'al-zahra': alZahra,
  'khan-younis': khanYounis,
}


