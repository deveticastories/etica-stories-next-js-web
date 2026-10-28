// Lets the home page wait for the logo intro to finish before starting its own media.
let done = false;
const listeners = new Set<() => void>();

export function markIntroPlaying() {
  done = false;
}

export function markIntroDone() {
  done = true;
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
