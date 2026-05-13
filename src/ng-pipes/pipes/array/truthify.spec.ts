import { TrurthifyPipe, TruthifyPipe } from './truthify';

describe('TruthifyPipe', () => {
  let pipe: TruthifyPipe;

  beforeEach(() => {
    pipe = new TruthifyPipe();
  });

  it('should not change anything if not array', () => {
    expect(pipe.transform('foo')).toEqual('foo');
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform({ foo: 1, bar: 2 })).toEqual({ foo: 1, bar: 2 });
  });

  it('should not change array without falsy values', () => {
    expect(pipe.transform([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should check if is `truthifying` array properly', () => {
    expect(pipe.transform([null, 1, false, undefined, 2, 0, 3, NaN, 4, ''])).toEqual([1, 2, 3, 4]);
  });
});

describe('TrurthifyPipe (typo)', () => {
  let pipe: TrurthifyPipe;
  let actualPipe: TruthifyPipe;

  beforeEach(() => {
    pipe = new TrurthifyPipe();
    actualPipe = new TruthifyPipe();
  });

  it('should behave the same as the original pipe', () => {
    const values = [
      'foo',
      null,
      undefined,
      { foo: 1, bar: 2 },
      42,
      [1, 2, 3],
      [null, 1, false, undefined, 2, 0, 3, NaN, 4, ''],
    ];

    for (const value of values) {
      expect(pipe.transform(value)).toEqual(actualPipe.transform(value));
    }
  });
});
