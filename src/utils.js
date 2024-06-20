
/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export function isDictionary(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function isTheSame(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  if (a === b) {
    return true;
  }
  return false;
}

/**
 * @param {Record<string, unknown>} obj
 * @param {string} key
 * @param {unknown} value
 * @returns {void}
 */
export function assignKey(obj, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
}
