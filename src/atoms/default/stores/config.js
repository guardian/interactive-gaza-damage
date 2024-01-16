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
        highlighted: [6],
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
        highlighted: [31],
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
          src: "https://uploads.guim.co.uk/2024/01/10/Al_Zahra_BODY.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/10/Al_Zahra_site.jpg",
        },
      };
    case 26:
    case 27:
      return {
        area: 'al-zahra',
        annotationsInFocus: [18,21],
        maxZoom: [16],
      };
    default: 
      return {}
  }
}
