const objectConstructorString = Function.prototype.toString.call(Object);

const toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const fnToString = Function.prototype.toString;
const getPrototypeOf = Object.getPrototypeOf;

/**
 * We consider an object a dictionary if the equality can be determined by
 * iterating over all enumerable keys.
 *
 * To determine if an object is a dictionary, we perform a series of heuristic
 * checks, motiviated by what lodash.isPlainObject does.
 *
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
export function isDictionary(value) {
  if (
    value === null ||
    typeof value !== "object" ||
    toString.call(value) !== "[object Object]"
  ) {
    return false;
  }
  /** @type {unknown} */
  const prototype = getPrototypeOf(value);
  if (typeof prototype !== "object") {
    return false;
  }
  if (prototype === null) {
    return true;
  }
  const constructor = prototype.constructor;
  if (
    typeof constructor !== "function" ||
    // NOTE: We do not consider Object.create({}) a plain object.
    !hasOwnProperty.call(prototype, "constructor")
  ) {
    return false;
  }
  if (!(constructor instanceof constructor)) {
    return false;
  }
  if (fnToString.call(constructor) !== objectConstructorString) {
    return false;
  }
  return true;
}

const isNaN = Number.isNaN;

/**
 * @param {unknown} a
 * @param {unknown} b
 * @returns {boolean}
 */
export function isTheSame(a, b) {
  if (isNaN(a) && isNaN(b)) {
    return true;
  }
  if (a === b) {
    return true;
  }
  return false;
}

const defineProperty = Object.defineProperty;

/**
 * @param {Record<string, unknown>} obj
 * @param {string} key
 * @param {unknown} value
 * @returns {void}
 */
export function assignKey(obj, key, value) {
  if (key === "__proto__") {
    defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
}
