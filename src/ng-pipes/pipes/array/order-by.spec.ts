import { OrderByPipe } from './order-by';

describe('OrderByPipe', () => {
  const testArray = [
    { id: 1, name: 'John', amount: 1337 },
    { id: 2, name: 'Michael', amount: 42 },
    { id: 3, name: 'Dan', amount: 1 },
    { id: 4, name: 'Dave', amount: 2 },
  ];

  const pipe = new OrderByPipe();

  it('should not modify non-arrays', () => {
    expect(pipe.transform('foo')).toEqual('foo');
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform({ foo: 1, bar: 2 })).toEqual({ foo: 1, bar: 2 });
  });

  it('should not mutate input', () => {
    const arr = [3, 2, 1];
    const result = pipe.transform(arr);

    expect(result).not.toBe(arr);
    expect(arr).toEqual([3, 2, 1]);
  });

  describe('ordering by value', () => {
    it('should order ascending by default', () => {
      expect(pipe.transform([3, 2, 1])).toEqual([1, 2, 3]);
    });

    it('should order descending', () => {
      expect(pipe.transform([1, 2, 3], '-')).toEqual([3, 2, 1]);
    });

    it('should order strings', () => {
      expect(pipe.transform(['a', 'b', 'c'], '-')).toEqual(['c', 'b', 'a']);
    });

    it('should order Dates', () => {
      const a = new Date('2026-01-01T00:00:00Z');
      const b = new Date('2026-02-02T00:00:00Z');
      expect(pipe.transform([b, a])).toEqual([a, b]);
    });

    it('should order booleans', () => {
      expect(pipe.transform([true, false, false, true, false, true])).toEqual([false, false, false, true, true, true]);
    });
  });

  describe('ordering by property', () => {
    it('should order ascending by default', () => {
      expect(pipe.transform(testArray, 'amount')).toEqual([
        { id: 3, name: 'Dan', amount: 1 },
        { id: 4, name: 'Dave', amount: 2 },
        { id: 2, name: 'Michael', amount: 42 },
        { id: 1, name: 'John', amount: 1337 },
      ]);
    });

    it('should order descending', () => {
      expect(pipe.transform(testArray, '-name')).toEqual([
        { id: 2, name: 'Michael', amount: 42 },
        { id: 1, name: 'John', amount: 1337 },
        { id: 4, name: 'Dave', amount: 2 },
        { id: 3, name: 'Dan', amount: 1 },
      ]);
    });
  });

  describe('ordering by deep property', () => {
    it('should order by deep property', () => {
      expect(
        pipe.transform(
          [
            { id: 1, name: 'John', amount: 1337, deep: { prop: 4 } },
            { id: 2, name: 'Michael', amount: 42, deep: { prop: 2 } },
            { id: 3, name: 'Dan', amount: 1, deep: { prop: 1 } },
            { id: 4, name: 'Dave', amount: 2, deep: { prop: 3 } },
          ],
          ['deep.prop']
        )
      ).toEqual([
        { id: 3, name: 'Dan', amount: 1, deep: { prop: 1 } },
        { id: 2, name: 'Michael', amount: 42, deep: { prop: 2 } },
        { id: 4, name: 'Dave', amount: 2, deep: { prop: 3 } },
        { id: 1, name: 'John', amount: 1337, deep: { prop: 4 } },
      ]);
    });
  });

  describe('ordering by multiple properties', () => {
    it('should order by multiple properties', () => {
      expect(
        pipe.transform(
          [
            { id: 2, name: 'b', amount: 2 },
            { id: 2, name: 'a', amount: 2 },
            { id: 1, name: 'd', amount: 1 },
            { id: 1, name: 'c', amount: 1 },
          ],
          ['amount', '+id', '-name']
        )
      ).toEqual([
        { id: 1, name: 'd', amount: 1 },
        { id: 1, name: 'c', amount: 1 },
        { id: 2, name: 'b', amount: 2 },
        { id: 2, name: 'a', amount: 2 },
      ]);
    });
  });

  describe('ordering with missing values', () => {
    it('should keep order on non-existent properties', () => {
      expect(pipe.transform(testArray, 'age')).toEqual(testArray);
    });

    it('should allow partially missing properties', () => {
      expect(
        pipe.transform(
          [
            { id: 1, name: 'John', amount: 1337, deep: { prop: { val: 3 } } },
            { id: 2, name: 'Michael', amount: 42, deep: {} },
            { id: 3, name: 'Dan', amount: 1, deep: { prop: { val: 2 } } },
            { id: 4, name: 'Dave', amount: 2, deep: {} },
            { id: 5, name: 'Other', amount: 2, deep: { prop: { val: 4 } } },
            { id: 6, name: 'Other 2', amount: 2, deep: {} },
            { id: 7, name: 'Other 3', amount: 2, deep: { prop: { val: 1 } } },
          ],
          ['deep.prop.val']
        )
      ).toEqual([
        { id: 7, name: 'Other 3', amount: 2, deep: { prop: { val: 1 } } },
        { id: 3, name: 'Dan', amount: 1, deep: { prop: { val: 2 } } },
        { id: 1, name: 'John', amount: 1337, deep: { prop: { val: 3 } } },
        { id: 5, name: 'Other', amount: 2, deep: { prop: { val: 4 } } },
        { id: 2, name: 'Michael', amount: 42, deep: {} },
        { id: 4, name: 'Dave', amount: 2, deep: {} },
        { id: 6, name: 'Other 2', amount: 2, deep: {} },
      ]);
    });
  });
});
