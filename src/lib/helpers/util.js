import appMap from "./appMap";

const isMobileApp = () => {
  const parentIsIos = document.querySelector(".ios");
  const parentIsAndroid = document.querySelector(".android");
  return parentIsIos || parentIsAndroid;
};

const selectorAppOrDCR = (toSelect) =>
  isMobileApp() ? appMap[toSelect].app : appMap[toSelect].desktop;


const extend = (dest, ...sources) => {
  if (!dest) return;
    for (const src of sources) {
        for (const key in src) {
          const value = src[key];
          if (typeof value === "object" && !(value instanceof Array)) {
            dest[key] = extend(dest[key], value)
          } else if (key in dest) {
            dest[key] = value;
          }
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
  
  return resolvedPadding
}

export {
  isMobileApp,
  selectorAppOrDCR,
  extend,
  resolvePadding,
}