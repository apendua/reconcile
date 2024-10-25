import * as fc from "fast-check";
import reconcileFn from "./reconcileFn.js";

test("reconcileFn should memoize last return value", () => {
  fc.assert(
    fc.property(
      fc.dictionary(fc.string(), fc.jsonValue()),
      /**
       * @param {Record<string, fc.JsonValue>} value
       */
      (value) => {
        const fn = reconcileFn(() => ({ ...value }));
        expect(fn()).toBe(fn());
      }
    )
  );
});
