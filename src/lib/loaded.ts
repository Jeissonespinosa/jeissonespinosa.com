/**
 * Coordinación entre el preloader y las animaciones de entrada:
 * el preloader dispara "app:loaded" cuando termina.
 */
export const LOADED_EVENT = "app:loaded";

let loaded = false;

export function markLoaded() {
  loaded = true;
  document.documentElement.classList.add("is-loaded");
  window.dispatchEvent(new Event(LOADED_EVENT));
}

export function isLoaded() {
  return loaded;
}

export function onLoaded(cb: () => void) {
  if (loaded) {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}
