import * as fc from "fast-check";
import reconcileFn from "./reconcileFn.js";
import { assignKey } from "./utils.js";

/**
 * @param {Record<string, unknown>} value
 */
const shallowCopy = (value) => {
  /** @type {Record<string, unknown>} */
  const copy = {};
  for (const key in value) {
    assignKey(copy, key, value[key]);
  }
  return copy;
};

test("reconcileFn should memoize last return value", () => {
  fc.assert(
    fc.property(
      fc.dictionary(fc.string(), fc.jsonValue()),
      /**
       * @param {Record<string, fc.JsonValue>} value
       */
      (value) => {
        // NOTE: Using shallow copy due to potential __proto__ key.
        const fn = reconcileFn(() => shallowCopy(value));
        expect(fn()).toBe(fn());
      }
    )
  );
});
