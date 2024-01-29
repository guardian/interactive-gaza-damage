import { derived } from 'svelte/store';
import { isMobile } from '$lib/stores/devices.js';
import { extend } from '$lib/helpers/util';

export const scrollyConfigForStep = derived([isMobile], ([$isMobile]) => {
    return (step) => {
        let config = _scrollyConfigForStep(step);
        if ($isMobile && config.mobile) {
          config = extend(config, config.mobile)
        }

        return config;
    }
})

export function _scrollyConfigForStep(step) {
  switch (step) {
    case 0:
    case 1:
    case 2:
      return {
        inset: {
          id: "northern-gaza",
        },
        showDamageKey: true,
        hideAnnotations: true,
      }
    case 3:
      return {
        annotationsInFocus: 'all',
        showDamageKey: true,
        hideAnnotations: true,
      }
    case 4:
      return {
        area: 'beit-hanoun',
        inset: {
          id: "beit-hanoun",
        },
        annotationsInFocus: 'all',
        hideAnnotations: true,
        showDamageKey: true
      }
    case 5:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [1, 2, 3, 4, 12, 35],
        mobile: {
          annotationsInFocus: [1, 2, 3, 4, 12],
        }
      };
    case 6:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [5, 6, 7, 8],
        mobile: {
          annotationsInFocus: [5, 6, 7, 35],
        }
      };
    case 7:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [6],
        highlighted: [6],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/25/BeitHanoun.00_00_00_00.Still011.jpg",
          orientation: "landscape",
        },
        mobile: {
          annotationsInFocus: [6, 8],
          video: {
            src: "https://uploads.guim.co.uk/2024/01/09/beitHanounVERT.mp4",
            posterImage:
              "https://uploads.guim.co.uk/2024/01/29/still-beit-hanoun-mobile.jpg",
            orientation: 'portrait',
          },
        },
      };
    case 8:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [6],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [6, 8],
        }
      };
    case 9:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [9, 33, 34, 10, 11, 14, 15, 27],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [9, 33, 34, 10, 11, 15, 27],
        }
      };
    case 10:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [13],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [13,14],
        }
      };
    case 11:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [17, 18],
        maxZoom: 16,
      };
    case 12:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [19, 20, 21, 22],
        maxZoom: 16,
      };
    case 13:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [31],
        highlighted: [31],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/25/BeitHanoun_1.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.00_00_19_03.Still005.jpg",
          orientation: "landscape",
        },
        mobile: {
          video: {
            src: "https://uploads.guim.co.uk/2024/01/25/beitHanounVERT_2.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/09/beitHanounVERT.00_00_29_04.Still003.jpg",
            orientation: "portrait",
          }
        }
      };
    case 14:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [31],
        maxZoom: 16,
      };
    case 15:
      return {
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 16:
      return {
        hideAnnotations: true,
        showDamageKey: true
      };
    case 17:
      return {
        hideAnnotations: true,
        showDamageKey: true
      };
    case 18:     
      return {
        area: 'al-zahra',
        inset: {
          id: "al-zahra",
        },
        showDamageKey: true,
        hideAnnotations: true,
      }
    case 19:
      return {
        area: 'al-zahra',
        annotationsInFocus: [2,3,4,5],
        maxZoom: [15],
        padding: { top: 100 },
      };
    case 20:
      return {
        area: 'al-zahra',
        annotationsInFocus: [2,19],
        maxZoom: [15],
        padding: 20,
      };
    case 21:
      return {
        area: 'al-zahra',
        annotationsInFocus: [7,8,9,22],
        maxZoom: [15],
        padding: 20,
      };
    case 21:
      return {
        area: 'al-zahra',
        annotationsInFocus: [9,8,19,22],
        maxZoom: [15],
        padding: 20,
      };
    case 22:
      return {
        area: 'al-zahra',
        annotationsInFocus: [10,11,12,20,24],
        maxZoom: 16,
      };
    case 23:
      return {
        area: 'al-zahra',
        annotationsInFocus: [13, 15],
        highlighted: [13],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/16/TurkishFriendshipHospitalSITE.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/16/TurkishFriendshipHospitalSITE.00_00_00_00.Still002.jpg",
          orientation: "landscape",
        },
        mobile: {
          video: {
            src: "https://uploads.guim.co.uk/2024/01/02/TurkishFriendshipHospitalVERTICAL_1.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/02/TurkishFriendshipHospitalVERTICAL.00_00_01_16.Still002.png",
            orientation: "portrait",
          }
        }
      };
    case 24:
      return {
        area: 'al-zahra',
        annotationsInFocus: [13, 15],
        maxZoom: 16,
      };
    case 25:
      return {
        area: 'al-zahra',
        annotationsInFocus: [16,23,25],
        maxZoom: 16,
      };
    case 26:
      return {
        area: 'al-zahra',
        annotationsInFocus: [18,21],
        highlighted: [18],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/17/Al_Zahra_site.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/17/Al_Zahra_site.00_00_11_17.Still004.jpg",
          orientation: "landscape",
        },
        mobile: {
          video: {
            src: "https://uploads.guim.co.uk/2024/01/10/Al_Zahra_BODY_mobile.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/25/Al_Zahra_mobile.00_00_14_17.Still004.jpg",
            orientation: "portrait",
          }
        }
      };
    case 27:
      return {
        area: 'al-zahra',
        annotationsInFocus: [18,21],
        maxZoom: 16,
      };
    case 28:
      return {
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 29:
      return {
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 30:
      return {
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 31:     
      return {
        area: 'khan-younis',
        inset: {
          id: "khan-younis",
        },
        showDamageKey: true,
        hideAnnotations: true,
      }
    case 32:
      return {
        area: 'khan-younis',
        annotationsInFocus: [1,3,4,36],
        maxZoom: 16,
      };
    case 33:
      return {
        area: 'khan-younis',
        annotationsInFocus: [23,24,33],
        maxZoom: 16,
      };
    case 34:
      return {
        area: 'khan-younis',
        annotationsInFocus: [25,26,30],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [25,26],
        }
      };
    case 35:
      return {
        area: 'khan-younis',
        annotationsInFocus: [21,22,29,31,41,42],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [29,42,30],
          minZoom: 15.5,
          maxZoom: 16,
        }
      };
    case 36:
      return {
        area: 'khan-younis',
        annotationsInFocus: [16,17,18,19,20,39,50],
        minZoom: 13,
        maxZoom: 16,
        padding: 50,
        mobile: {
          annotationsInFocus: [31,41,22,21,19,20,18,50],
          padding: 0,
          minZoom: 15.5,
          maxZoom: 16,
        }
      };
    case 37:
      return {
        area: 'khan-younis',
        annotationsInFocus: [5,6,8,9,12,35,51],
        minZoom: 13,
        maxZoom: 16,
        padding: 50,
        mobile: {
          annotationsInFocus: [16,17,18,39],
          padding: 0,
          minZoom: 15.5,
          maxZoom: 16,
        }
      };
    case 38:
      return {
        area: 'khan-younis',
        annotationsInFocus: [52],
        highlighted: [52],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/19/KhanYounis-StreetWalkthrough_2.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/25/KhanYounis-StreetWalkthrough.00_00_00_00.Still006.jpg",
          orientation: "landscape",
        },
        mobile: {
          annotationsInFocus: [5,6,8,9,12,35,51],
          video: {
            src: "https://uploads.guim.co.uk/2024/01/19/240114_KhanYounisStreetWalkthroughMobile_2.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/15/240114_KhanYounisStreetWalkthroughMobile.00_00_00_00.Still002.png",
            orientation: "portrait",
          }
        }
      };
    case 39:
      return {
        area: 'khan-younis',
        annotationsInFocus: [52],
        maxZoom: 16,
        mobile: {
          annotationsInFocus: [5,6,8,9,12,35,51],
        }
      };
    case 40:
      return {
        area: 'khan-younis',
        annotationsInFocus: [13,53],
        highlighted: [53],
        maxZoom: 16,
        video: {
          src: "https://uploads.guim.co.uk/2024/01/25/KhanYounisMosque_2.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/25/KhanYounisMosque.00_00_00_00.Still003.jpg",
          orientation: "landscape",
        },
        mobile: {
          video: {
            src: "https://uploads.guim.co.uk/2024/01/25/KhanYounisMosqueVertical_2.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/25/KhanYounisMosqueVertical.00_00_00_00.Still002.jpg",
            orientation: "portrait",
          }
        }
      };
    case 41:
      return {
        area: 'khan-younis',
        annotationsInFocus: [13,53],
        maxZoom: 16,
      };
    case 42:
      return {
        maxZoom: 11,
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 43:
      return {
        maxZoom: 11,
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 44:
      return {
        maxZoom: 11,
        showDamageKey: true,
        hideAnnotations: true,
      };
    case 45:
      return {
        showDamageKey: true,
        hideAnnotations: true,
      }
    default:
      return {
      }
  }
}
