import {
  isUndefined,
  isNull,
  isFunction,
  isNumber,
  isString,
  isBoolean,
  isNumberFinite,
  isVowel,
  ucFirst,
  applyPrecision,
  extractDeepPropertyByMapKey,
  extractDeepPropertyByParentMapKey,
  getKeysTwoObjects,
  isDeepEqual,
} from './helpers';

describe('Helpers', () => {
  describe('isUndefined', () => {
    it('returns true if the value is undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('returns false if the value is not undefined', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined('')).toBe(false);
      expect(isUndefined(123)).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, null, 4, undefined];

      // Here the type of result should be `undefined[]`.
      const result = arr.filter(isUndefined) satisfies undefined[];

      expect(result).toEqual([undefined]);
    });
  });

  describe('isNull', () => {
    it('returns true if the value is null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('returns false if the value is not null', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull('')).toBe(false);
      expect(isNull(123)).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, null, 4, undefined];

      // Here the type of result should be `null[]`.
      const result = arr.filter(isNull) satisfies null[];

      expect(result).toEqual([null]);
    });
  });

  describe('isFunction', () => {
    it('should return `true` for functions', () => {
      const slice = Array.prototype.slice;
      expect(isFunction(slice)).toBe(true);
    });

    it('should return `true` for async functions', () => {
      const asyncFunc = async function () {};
      expect(isFunction(asyncFunc)).toBe(true);
    });

    it('should return `true` for generator functions', () => {
      const genFunc = function* () {};
      expect(isFunction(genFunc)).toBe(true);
    });

    it('should return `true` for the `Proxy` constructor', () => {
      if (!Proxy) {
        pending('Proxy objects are not defined');
      }

      expect(isFunction(Proxy)).toBe(true);
    });

    it('should return `true` for array view constructors', () => {
      [
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        DataView,
      ].forEach((type) => {
        expect(isFunction(type)).toBe(true);
      });
    });

    it('should return `false` for non-functions', () => {
      [, null, undefined, false, 0, NaN, ''].forEach((falsey) => {
        expect(isFunction(falsey)).toBe(false);
      });

      expect(isFunction([1, 2, 3])).toBe(false);
      expect(isFunction(true)).toBe(false);
      expect(isFunction(new Date())).toBe(false);
      expect(isFunction(new Error())).toBe(false);
      expect(isFunction({ a: 1 })).toBe(false);
      expect(isFunction(1)).toBe(false);
      expect(isFunction(/x/)).toBe(false);
      expect(isFunction('a')).toBe(false);
      expect(isFunction(Symbol('a'))).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('returns true if the value is a number', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(123)).toBe(true);
      expect(isNumber(-456)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
      expect(isNumber(Infinity)).toBe(true);
      expect(isNumber(-Infinity)).toBe(true);
      expect(isNumber(NaN)).toBe(true);
    });

    it('returns false if the value is not a number', () => {
      expect(isNumber('123')).toBe(false);
      expect(isNumber(true)).toBe(false);
      expect(isNumber(false)).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
      expect(isNumber({ a: 1 })).toBe(false);
      expect(isNumber([1, 2, 3])).toBe(false);
      expect(isNumber(new Number(42))).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, 'a', 4, 'b'];

      // Here the type of result should be `number[]`
      const result = arr.filter(isNumber) satisfies number[];

      expect(result).toEqual([1, 2, 4]);
    });
  });

  describe('isString', () => {
    it('returns true if the value is string', () => {
      expect(isString('abc')).toBe(true);
    });

    it('returns false if the value is not string', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString([1, 2, 3])).toBe(false);
      expect(isString({ a: 1 })).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, 'a', 4, 'b'];

      // Here the type of result should be `string[]`
      const result = arr.filter(isString) satisfies string[];

      expect(result).toEqual(['a', 'b']);
    });
  });

  describe('isBoolean', () => {
    it('returns true if the value is boolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('returns false if the value is not boolean', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('abc')).toBe(false);
      expect(isBoolean(123)).toBe(false);
      expect(isBoolean({ a: 1 })).toBe(false);
      expect(isBoolean([1, 2, 3])).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, true, 4, false];

      // Here the type of result should be `boolean[]`.
      const result = arr.filter(isBoolean) satisfies boolean[];

      expect(result).toEqual([true, false]);
    });
  });

  describe('isNumberFinite', () => {
    it("should return 'true' for finite values", () => {
      expect(isNumberFinite(1)).toBe(true);
      expect(isNumberFinite(1.123)).toBe(true);
      expect(isNumberFinite(-1)).toBe(true);
    });

    it("should return 'false' for not-finite values", () => {
      expect(isNumberFinite(Infinity)).toBe(false);
      expect(isNumberFinite(-Infinity)).toBe(false);
      expect(isNumberFinite(NaN)).toBe(false);
      expect(isNumberFinite(Object(1))).toBe(false);
    });

    it("should return 'false' for non-numeric values", () => {
      expect(isNumberFinite(undefined)).toBe(false);
      expect(isNumberFinite([])).toBe(false);
      expect(isNumberFinite(true)).toBe(false);
      expect(isNumberFinite('')).toBe(false);
      expect(isNumberFinite(' ')).toBe(false);
      expect(isNumberFinite('2px')).toBe(false);
    });

    it("should return 'false' for numeric string values", () => {
      expect(isNumberFinite('2')).toBe(false);
      expect(isNumberFinite('0')).toBe(false);
      expect(isNumberFinite('Infinity')).toBe(false);
      expect(isNumberFinite('-1')).toBe(false);
    });

    it('can be used with TypeScript as a type predicate', () => {
      const arr = [1, 2, 'a', 4, 'b', Infinity, NaN];

      // Here the type of result should be `number[]`
      const result = arr.filter(isNumberFinite) satisfies number[];

      expect(result).toEqual([1, 2, 4]);
    });
  });

  describe('isVowel', () => {
    it('returns true if a string is a vowel', () => {
      expect(isVowel('a')).toBe(true);
    });

    it('returns false if the string is not a vowel', () => {
      expect(isVowel('b')).toBe(false);
    });
  });

  describe('ucFirst', () => {
    it('capitalizes a simple word', () => {
      expect(ucFirst('hello')).toBe('Hello');
      expect(ucFirst('hELLO')).toBe('Hello');
    });

    it('capitalizes the character after a hyphen', () => {
      expect(ucFirst('jean-luc')).toBe('Jean-Luc');
    });

    it('capitalizes the character after an apostrophe', () => {
      expect(ucFirst("o'brien")).toBe("O'Brien");
    });

    it('only transforms the first word', () => {
      expect(ucFirst('hello WORLD')).toBe('Hello WORLD');
    });
  });

  describe('applyPrecision', () => {
    it('applies precision to floats', () => {
      expect(applyPrecision(12.345, 0)).toEqual(12);
      expect(applyPrecision(12.345, 1)).toEqual(12.3);
      expect(applyPrecision(12.344, 2)).toEqual(12.34);
      expect(applyPrecision(12.345, 2)).toEqual(12.35);

      expect(applyPrecision(-12.345, 2)).toEqual(-12.34);
      expect(applyPrecision(-12.347, 2)).toEqual(-12.35);
    });
    it('treats negative precision as zero', () => {
      expect(applyPrecision(12.345, -1)).toEqual(12);
    });

    it('leaves integers unchanged', () => {
      [-1, 0, 1, 42].forEach((num) => {
        [0, 1, 2].forEach((precision) => {
          expect(applyPrecision(num, precision)).toEqual(num);
        });
      });
    });
  });

  describe('extractDeepPropertyByMapKey', () => {
    it('should extract properties properly', () => {
      const obj = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
        f: {
          g: 4,
          h: 5,
          i: {
            j: {
              k: {
                l: 6,
              },
            },
          },
        },
      };

      expect(extractDeepPropertyByMapKey(obj, 'a')).toEqual(1);
      expect(extractDeepPropertyByMapKey(obj, 'b.c')).toEqual(2);
      expect(extractDeepPropertyByMapKey(obj, 'b.d.e')).toEqual(3);
      expect(extractDeepPropertyByMapKey(obj, 'f.g')).toEqual(4);
      expect(extractDeepPropertyByMapKey(obj, 'f.i.j.k.l')).toEqual(6);
      expect(extractDeepPropertyByMapKey(obj, 'f.i.j.k.l.')).toEqual(undefined);
    });
  });

  describe('extractDeepPropertyByParentMapKey', () => {
    it('returns the parent object and final key for nested properties', () => {
      const obj = {
        user: {
          profile: {
            firstName: 'Ada',
          },
        },
      };

      expect(extractDeepPropertyByParentMapKey(obj, 'user.profile.firstName')).toEqual({
        props: obj.user.profile,
        tail: 'firstName',
      });
    });

    // the rest is covered by extractDeepPropertyByMapKey
  });

  describe('getKeysTwoObjects', () => {
    it('returns the union of keys from both objects', () => {
      expect(getKeysTwoObjects({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual(['a', 'b', 'c']);
    });

    it('keeps keys that exist only in the second object', () => {
      expect(getKeysTwoObjects({}, { added: true })).toEqual(['added']);
    });
  });

  describe('isDeepEqual', () => {
    it('should deep equal properly', () => {
      expect(isDeepEqual({ a: 1 }, { a: 1 })).toBeTruthy();
      expect(isDeepEqual({ a: 1 }, { b: 1 })).toBeFalsy();
      expect(isDeepEqual({ a: 1 }, { a: 1, b: 1 })).toBeFalsy();
      expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
      expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 1 })).toBeFalsy();
      expect(isDeepEqual({ a: 1, b: 2, c: { d: 3 } }, { a: 1, b: 2, c: { d: 1 } })).toBeFalsy();
      expect(isDeepEqual({ a: 1, b: 2, c: { d: 3 } }, { a: 1, b: 2, c: { d: 3 } })).toBeTruthy();
      expect(isDeepEqual({ a: 1, b: 2, c: { d: 3 } }, { a: 1, b: 2, c: { d: {} } })).toBeFalsy();
    });
  });
});
