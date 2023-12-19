import appMap from "./appMap";

const isMobileApp = () => {
  const parentIsIos = document.querySelector(".ios");
  const parentIsAndroid = document.querySelector(".android");
  return parentIsIos || parentIsAndroid;
};

const selectorAppOrDCR = (toSelect) =>
  isMobileApp() ? appMap[toSelect].app : appMap[toSelect].desktop;


export {
  isMobileApp,
  selectorAppOrDCR,
}