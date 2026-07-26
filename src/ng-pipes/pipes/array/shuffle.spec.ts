import { ShufflePipe } from './shuffle';

describe('ShufflePipe', () => {
  const pipe = new ShufflePipe();

  it('should not change anything if not array', () => {
    expect(pipe.transform('foo')).toEqual('foo');
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform({ foo: 1, bar: 2 })).toEqual({ foo: 1, bar: 2 });
  });

  it('should keep empty arrays unchanged', () => {
    expect(pipe.transform([])).toEqual([]);
  });

  it('should keep single-item arrays unchanged', () => {
    expect(pipe.transform([42])).toEqual([42]);
    expect(pipe.transform(['foo'])).toEqual(['foo']);
  });

  it('should return shuffled array', () => {
    const original = [5, 1, 2, 5, 3, 2, 4, 4, 4];
    const result = pipe.transform(original);

    expect(result.length).toEqual(original.length);
    expect([...result].sort()).toEqual([...original].sort());
  });

  it('should not mutate input', () => {
    const original = [1, 2, 3, 4, 5];
    const result = pipe.transform(original);

    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });
});
