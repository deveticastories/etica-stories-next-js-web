// Rough capability check for the heavy scroll-driven scenes. Older / budget laptops (few cores,
// little RAM, weak integrated GPUs) run out of GPU memory on the large composited layers and
// show blank white tiles while scrolling, so they get the static layouts instead.
type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export function isLowEndDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores < 4 || memory < 4;
}
