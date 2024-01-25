import { writable, readable, derived } from "svelte/store";

export const windowInnerWidth = writable(0);
export const windowInnerHeight = writable(0);

// top inset to avoid navbar on Android app
export const topInset = readable(0, (set) => {
  if (typeof window === 'undefined') {
    // Ignore top inset for prerendering
    set(0);
    return;
  }

  const topInset = getComputedStyle(document.body).getPropertyValue(
    "--top-inset"
  );
  const topInsetPixelValue = Number(topInset.replace("px", ""));
  set(topInsetPixelValue);
});

export const relativeScrollyInsets = derived(
  [topInset, windowInnerHeight],
  ([$topInset, $windowInnerHeight]) => {
    return {
      top: $topInset / $windowInnerHeight,
      bottom: 1,
    };
  }
);
