import { TrimPipe } from './trim';

describe('TrimPipe', () => {
  const pipe = new TrimPipe();

  it('should trim whitespace from string', () => {
    expect(pipe.transform('   foo bar   ')).toEqual('foo bar');
  });

  it('should trim other characters from string', () => {
    expect(pipe.transform('42foo bar4242', '42')).toEqual('foo bar');
  });

  it('should not modify already trimmed string', () => {
    expect(pipe.transform('foo bar')).toEqual('foo bar');
  });

  it('should not modify falsy strings', () => {
    expect(pipe.transform('')).toEqual('');
    // @ts-ignore
    expect(pipe.transform(undefined)).toEqual(undefined);
    // @ts-ignore
    expect(pipe.transform(null)).toEqual(null);
  });

  it('should not modify input on empty trimchars', () => {
    expect(pipe.transform(' foo ', '')).toEqual(' foo ');
  });

  it('should not mutate string', () => {
    const original = '   foo bar   ';

    expect(pipe.transform(original)).not.toBe(original);
    expect(original).toBe('   foo bar   ');
  });
});
