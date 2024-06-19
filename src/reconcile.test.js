import * as fc from 'fast-check';
import compare from '@apendua/compare';
import reconcile from './reconcile';

test('reconcile should return the new value', () => {
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

test('reconcile should detect copy', () => {
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

test('reconcile can be used to detect equal values', () => {
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
