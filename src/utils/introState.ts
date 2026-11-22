// Lets the home page wait for the logo intro to finish before starting its own media, and lets
// the smooth scroller pause while the intro covers the page.
let done = false;
const listeners = new Set<() => void>();

type Scroller = { stop: () => void; start: () => void };
let scroller: Scroller | null = null;

// Registered by SmoothScroll (its effect runs before the intro's, which then stops it).
export function setScroller(next: Scroller | null) {
  scroller = next;
}

export function markIntroPlaying() {
  done = false;
  scroller?.stop();
}

export function markIntroDone() {
  done = true;
  scroller?.start();
  listeners.forEach((listener) => listener());
  listeners.clear();
}

// Runs `callback` once the intro is done (immediately if it already is). Returns an unsubscribe.
export function onIntroDone(callback: () => void) {
  if (done) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
