import { TestPipe } from './test';

describe('TestPipe', () => {
  const pipe = new TestPipe();

  it('should not do anything if not a string', () => {
    expect(pipe.transform(null, '')).toEqual(null);
    expect(pipe.transform(undefined, '')).toEqual(undefined);
    expect(pipe.transform(42, '')).toEqual(42);
    expect(pipe.transform([42, 67], '')).toEqual([42, 67]);
    expect(pipe.transform({ name: 'foo' }, '')).toEqual({ name: 'foo' });
  });

  it('should test on strings', () => {
    expect(pipe.transform('foo 42', '[\\d]+$', 'g')).toBeTruthy();
    expect(pipe.transform('42 foo', '[\\d]+$', 'g')).toBeFalsy();
    expect(pipe.transform('foo', '[\\d]+$', 'g')).toBeFalsy();
    expect(pipe.transform('FOO', '^foo')).toBeFalsy();
    expect(pipe.transform('FOO', '^foo', 'i')).toBeTruthy();
  });
});
