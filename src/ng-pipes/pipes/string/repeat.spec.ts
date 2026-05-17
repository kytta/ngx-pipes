import { RepeatPipe } from './repeat';

describe('RepeatPipe', () => {
  let pipe: RepeatPipe;

  beforeEach(() => {
    pipe = new RepeatPipe();
  });

  it('should repeat string', () => {
    const result = pipe.transform('foo', 3);
    expect(result).toEqual('foofoofoo');
  });

  it('should repeat string with separator', () => {
    const result = pipe.transform('foo', 3, '-');
    expect(result).toEqual('foo-foo-foo');
  });

  it('should return the same value when there are no arguments', () => {
    const result = pipe.transform('foo');
    expect(result).toEqual('foo');
  });

  it('should throw range exception if times count is below zero', () => {
    expect(() => {
      pipe.transform('foo', -1);
    }).toThrow(new RangeError());
  });
});
