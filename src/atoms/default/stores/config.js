export function scrollyConfigForStep(step) {
  switch (step) {
    case 4:
      return {
        annotationsInFocus: [1, 2, 3, 4, 35, 12],
      };
    case 5:
      return {
        annotationsInFocus: [5, 6, 7, 8],
      };
    case 6:
      return {
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
        annotationsInFocus: [6],
        maxZoom: [16],
      };
    case 8:
      return {
        annotationsInFocus: [9, 33, 34, 10, 11, 14, 15, 27],
        maxZoom: [16],
      };
    case 9:
      return {
        annotationsInFocus: [13],
        maxZoom: [16],
      };
    case 10:
      return {
        annotationsInFocus: [17, 18],
        maxZoom: [16],
      };
    case 11:
      return {
        annotationsInFocus: [19, 20, 21, 22],
        maxZoom: [16],
      };
    case 12:
      return {
        annotationsInFocus: [19, 20, 21, 22],
        maxZoom: [16],
        video: {
          src: "https://uploads.guim.co.uk/2023/12/22/beit-hanoun-walkthrough_SITE.mp4",
          posterImage:
            "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.00_00_19_03.Still005.jpg",
        },
      };
    case 13:
      return {
        annotationsInFocus: [19, 20, 21, 22],
        maxZoom: [16],
      };
    default:
      return {};
  }
}
