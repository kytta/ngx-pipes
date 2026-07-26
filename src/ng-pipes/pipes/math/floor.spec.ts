import { FloorPipe } from './floor';

describe('FloorPipe', () => {
  const pipe = new FloorPipe();

  it('should return floor of given positive number', () => {
    expect(pipe.transform(1)).toEqual(1);
    expect(pipe.transform(1.2345)).toEqual(1);
    expect(pipe.transform(42.123)).toEqual(42);
  });

  it('should return floor of given negative number', () => {
    expect(pipe.transform(-1)).toEqual(-1);
    expect(pipe.transform(-1.2345)).toEqual(-2);
    expect(pipe.transform(-42.123)).toEqual(-43);
  });

  it('should return floor with given precision', () => {
    expect(pipe.transform(42.123, 1)).toEqual(42.1);
    expect(pipe.transform(42.4242, 2)).toEqual(42.42);
  });

  it('should ignore negative precision', () => {
    expect(pipe.transform(42, -1)).toEqual(42);
    expect(pipe.transform(-42, -1)).toEqual(-42);
    expect(pipe.transform(1.2345, -1)).toEqual(1);
    expect(pipe.transform(-1.2345, -1)).toEqual(-2);
  });
});
