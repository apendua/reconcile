import reconcile from "./reconcile.js";

/**
 * @template T
 * @param {() => T} fn
 * @returns {() => T}
 */
export default function reconcileFn(fn) {
  /** @type {T | undefined} */
  let lastValue;
  return () => {
    if (lastValue !== undefined) {
      lastValue = reconcile(lastValue, fn());
      return lastValue;
    }
    lastValue = fn();
    return lastValue;
  };
}
