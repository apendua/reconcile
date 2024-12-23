import * as fc from "fast-check";
import compare from "@apendua/compare";
import reconcile from "./reconcile.js";

test("reconcile should return the new value", () => {
  fc.assert(
    fc.property(
      fc.jsonValue(),
      fc.jsonValue(),
      /**
       * @param {fc.JsonValue} oldValue
       * @param {fc.JsonValue} newValue
       */
      (oldValue, newValue) => {
        expect(reconcile(oldValue, newValue)).toEqual(newValue);
      }
    )
  );
});

test("reconcile should detect a copy", () => {
  fc.assert(
    fc.property(
      fc.json(),
      /**
       * @param {string} str
       */
      (str) => {
        const value1 = JSON.parse(str);
        const value2 = JSON.parse(str);
        expect(reconcile(value1, value2)).toBe(value1);
      }
    )
  );
});

test("reconcile can be used to detect equal values", () => {
  fc.assert(
    fc.property(
      fc.jsonValue(),
      fc.jsonValue(),
      /**
       * @param {fc.JsonValue} value1
       * @param {fc.JsonValue} value2
       */
      (value1, value2) => {
        expect(reconcile(value1, value2) === value1).toBe(
          compare(value1, value2) === 0
        );
      }
    )
  );
});

test("reconciles an array of NaN's", () => {
  const array = [NaN, NaN];
  expect(reconcile(array, [NaN, NaN])).toBe(array);
});

test("handles object with __proto__ key correctly", () => {
  const jsonString = '{"__proto__": 0}';
  const v1 = JSON.parse(jsonString);
  const v2 = JSON.parse(jsonString);
  expect(reconcile(v1, v2)).toBe(v1);
});

test("reconciles an array with fewer elements", () => {
  const oldValue = [1, 2, 3];
  const newValue = [1, 2];
  expect(reconcile(oldValue, newValue)).toEqual(newValue);
});

test("reconciles an array with more elements", () => {
  const oldValue = [1, 2];
  const newValue = [1, 2, 3];
  expect(reconcile(oldValue, newValue)).toEqual(newValue);
});

test("reconciles an object with fewer keys", () => {
  const oldValue = { a: 1, b: 2, c: 3 };
  const newValue = { a: 1, b: 2 };
  expect(reconcile(oldValue, newValue)).toEqual(newValue);
});

test("reconciles an object with more keys", () => {
  const oldValue = { a: 1, b: 2 };
  const newValue = { a: 1, b: 2, c: 3 };
  expect(reconcile(oldValue, newValue)).toEqual(newValue);
});

test("reconciles 0 and -0 as the same", () => {
  expect(reconcile(-0, 0)).toBe(-0);
});
