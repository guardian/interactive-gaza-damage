import appMap from "./appMap";

const isMobileApp = () => {
  const parentIsIos = document.querySelector(".ios");
  const parentIsAndroid = document.querySelector(".android");
  return parentIsIos || parentIsAndroid;
};

const selectorAppOrDCR = (toSelect) =>
  isMobileApp() ? appMap[toSelect].app : appMap[toSelect].desktop;


const extend = (dest, ...sources) => {
    for (const src of sources) {
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
}

export {
  isMobileApp,
  selectorAppOrDCR,
  extend,
}