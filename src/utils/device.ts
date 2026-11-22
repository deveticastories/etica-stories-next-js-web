// Rough capability check for the heavy scroll-driven scenes. Older / budget laptops (few cores,
// little RAM, weak integrated GPUs) run out of GPU memory on the large composited layers and
// show blank white tiles while scrolling, so they get the static layouts instead.
type NavigatorWithMemory = Navigator & { deviceMemory?: number };

// Safari (macOS and iOS). Its own scrolling runs off the main thread and paints ahead of the
// viewport; a JS-driven smooth scroller replaces that with main-thread scrolling, and whenever
// the page is busy (first load: images, video, fonts) Safari shows unpainted white areas.
export function isSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari\//.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Edg\/|OPR\/|Android/.test(ua);
}

export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores < 4 || memory < 4;
}
