export function scrollyConfigForStep(step) {
  switch (step) {
    case 4:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [1, 2, 3, 4, 35, 12],
      };
    case 5:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [5, 6, 7, 8],
      };
    case 6:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [6],
        highlighted: [6],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2023/12/22/unrwa-school-beit-hanoun.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.00_00_00_00.Still003.jpg",
        },
      };
    case 7:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [6],
        maxZoom: [16],
      };
    case 8:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [9, 33, 34, 10, 11, 14, 15, 27],
        maxZoom: [16],
      };
    case 9:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [13],
        maxZoom: [16],
      };
    case 10:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [17, 18],
        maxZoom: [16],
      };
    case 11:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [19, 20, 21, 22],
        maxZoom: [16],
      };
    case 12:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [31],
        highlighted: [31],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2023/12/22/beit-hanoun-walkthrough_SITE.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.00_00_19_03.Still005.jpg",
        },
      };
    case 13:
      return {
        area: 'beit-hanoun',
        annotationsInFocus: [31],
        maxZoom: [16],
      };
    case 18:
      return {
        area: 'al-zahra',
        annotationsInFocus: [2,3,4,5],
        maxZoom: [15],
        padding: { top: 100 },
      };
    case 19:
      return {
        area: 'al-zahra',
        annotationsInFocus: [2,19],
        maxZoom: [15],
        padding: 20,
      };
    case 20:
      return {
        area: 'al-zahra',
        annotationsInFocus: [7,8,9,22],
        maxZoom: [15],
        padding: 20,
      };
    case 20:
      return {
        area: 'al-zahra',
        annotationsInFocus: [9,8,19,22],
        maxZoom: [15],
        padding: 20,
      };
    case 21:
      return {
        area: 'al-zahra',
        annotationsInFocus: [10,11,12,20,24],
        maxZoom: [16],
      };
    case 22:
      return {
        area: 'al-zahra',
        annotationsInFocus: [13, 15],
        highlighted: [13],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2024/01/16/TurkishFriendshipHospitalSITE.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/16/TurkishFriendshipHospitalSITE.00_00_00_00.Still002.jpg",
        },
      };
    case 23:
      return {
        area: 'al-zahra',
        annotationsInFocus: [13, 15],
        maxZoom: [16],
      };
    case 24:
      return {
        area: 'al-zahra',
        annotationsInFocus: [16,23,25],
        maxZoom: [16],
      };
    case 25:
      return {
        area: 'al-zahra',
        annotationsInFocus: [18,21],
        highlighted: [18],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2024/01/17/Al_Zahra_site.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/17/Al_Zahra_site.00_00_11_17.Still004.jpg",
        },
      };
    case 26:
      return {
        area: 'al-zahra',
        annotationsInFocus: [18,21],
        maxZoom: [16],
      };
    case 31:
      return {
        area: 'khan-younis',
        annotationsInFocus: [1,3,4,36],
        maxZoom: [16],
      };
    case 32:
      return {
        area: 'khan-younis',
        annotationsInFocus: [23,24,33],
        maxZoom: [16],
      };
    case 33:
      return {
        area: 'khan-younis',
        annotationsInFocus: [25,26,30],
        maxZoom: [16],
      };
    case 34:
      return {
        area: 'khan-younis',
        annotationsInFocus: [21,22,29,31,41,42],
        maxZoom: [16],
      };
    case 35:
      return {
        area: 'khan-younis',
        annotationsInFocus: [16,17,18,19,20,39,50],
        maxZoom: [16],
      };
    case 36:
      return {
        area: 'khan-younis',
        annotationsInFocus: [5,6,8,9,12,35,51],
        maxZoom: [16],
      };
    case 37:
      return {
        area: 'khan-younis',
        annotationsInFocus: [13,53],
        highlighted: [53],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2024/01/16/KhanYounisMosque.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/16/KhanYounisMosque.00_00_00_00.Still001.jpg",
        },
      };
    case 38:
    case 39:
      return {
        area: 'khan-younis',
        annotationsInFocus: [13,53],
        maxZoom: [16],
      };
    default: 
      return {}
  }
}
