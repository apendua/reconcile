import { isDictionary, isTheSame, assignKey } from "./utils";

test("recognizes object as dictionary", () => {
  expect(isDictionary({})).toBe(true);
});

test("recognizes array as not dictionary", () => {
  expect(isDictionary([])).toBe(false);
});

test("recognizes null as not dictionary", () => {
  expect(isDictionary(null)).toBe(false);
});

test("recognizes NaN's as the same", () => {
  expect(isTheSame(NaN, NaN)).toBe(true);
});

test("recognizes 1's as the same", () => {
  expect(isTheSame(1, 1)).toBe(true);
});

test("recognizes 1 and 2 as not the same", () => {
  expect(isTheSame(1, 2)).toBe(false);
});

test("assigns property to object", () => {
  /** @type {Record<string, unknown>} */
  const obj = {};
  assignKey(obj, "key", "value");
  expect(obj).toEqual({ key: "value" });
});

test("assigns __proto__ property to object", () => {
  /** @type {Record<string, unknown>} */
  const obj = {};
  assignKey(obj, "__proto__", "value");
  expect(obj).toEqual(JSON.parse('{"__proto__":"value"}'));
});
