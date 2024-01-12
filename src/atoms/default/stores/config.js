export function scrollyConfigForStep(step) {
  switch (step) {
    case 3:
      return {
        annotationsInFocus: [1, 2, 3, 4, 35],
      };
    case 4:
      return {
        annotationsInFocus: [5, 6, 7],
      };
    case 5:
      return {
        annotationsInFocus: [8],
        video: {
            src: "https://uploads.guim.co.uk/2023/12/22/unrwa-school-beit-hanoun.mp4",
            posterImage: "https://uploads.guim.co.uk/2024/01/09/BeitHanoun.00_00_00_00.Still003.jpg",
        }
      };
    case 6:
      return {
        annotationsInFocus: [8],
      };
    case 7:
      return {
        annotationsInFocus: [9, 33, 34, 10, 11],
      };
    default:
      return {};
  }
}
