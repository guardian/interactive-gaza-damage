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

const resolvePadding = (paddingInput) => {
  let resolvedPadding = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  };

  if (typeof paddingInput === "object") {
    resolvedPadding = extend(resolvedPadding, paddingInput)
  }
  else if (typeof paddingInput === 'number') {
    const p = paddingInput;
    resolvedPadding = {
        top: p,
        bottom: p,
        right: p,
        left: p
    };
  }

  console.log('resolved padding', resolvedPadding)

  return resolvedPadding
}

export {
  isMobileApp,
  selectorAppOrDCR,
  extend,
  resolvePadding,
}