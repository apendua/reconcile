import { isDictionary, isTheSame, assignKey } from "./utils.js";

const isArray = Array.isArray;

/**
 * @template T
 * @overload
 * @param {T} oldValue
 * @param {T} newValue
 * @returns {T}
 *
 * @param {unknown} oldValue
 * @param {unknown} newValue
 * @returns {unknown}
 */
export default function reconcile(oldValue, newValue) {
  if (oldValue === newValue) {
    return oldValue;
  }
  if (isArray(oldValue) && isArray(newValue)) {
    const reconciled = newValue.map((v, i) => reconcile(oldValue[i], v));
    if (
      oldValue.length === newValue.length &&
      oldValue.every((v, i) => isTheSame(v, reconciled[i]))
    ) {
      return oldValue;
    }
    return reconciled;
  }
  if (isDictionary(oldValue) && isDictionary(newValue)) {
    /** @type {Record<string, unknown>} */
    const reconciled = {};
    const oldKeys = Object.keys(oldValue);
    const newKeys = Object.keys(newValue);
    newKeys.forEach((k) => {
      // NOTE: assignKey will also work for k = "__proto__"
      assignKey(reconciled, k, reconcile(oldValue[k], newValue[k]));
    });
    if (
      oldKeys.length === newKeys.length &&
      oldKeys.every((k) => isTheSame(oldValue[k], reconciled[k]))
    ) {
      return oldValue;
    }
    return reconciled;
  }
  return newValue;
}
