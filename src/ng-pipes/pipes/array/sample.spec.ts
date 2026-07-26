import { SamplePipe } from './sample';

describe('SamplePipe', () => {
  let pipe: SamplePipe;

  beforeEach(() => {
    pipe = new SamplePipe();
  });

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

  it('should sample one item by default', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = pipe.transform(original);

    expect(result.length).toEqual(1);
    expect(original).toContain(result[0]);
  });

  it('should return randomly sampled array', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = pipe.transform(original, 3);

    expect(result.length).toEqual(3);
    expect(result.every((item) => original.includes(item))).toBe(true);
  });

  it('should not return more items than are in array', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = pipe.transform(original, 30);

    expect(result.length).toEqual(10);
    expect([...result].sort()).toEqual([...original].sort());
  });

  it('should not mutate input', () => {
    const original = [1, 2, 3, 4, 5];
    const result = pipe.transform(original);

    expect(result).not.toBe(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return nothing on invalid lengths', () => {
    expect(pipe.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0)).toEqual([]);
    expect(pipe.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], -2)).toEqual([]);
  });
});
