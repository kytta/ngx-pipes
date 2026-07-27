import { LeftTrimPipe } from './ltrim';

describe('LeftTrimPipe', () => {
  const pipe = new LeftTrimPipe();

  it('should left trim whitespace from string', () => {
    expect(pipe.transform('   foo bar   ')).toEqual('foo bar   ');
  });

  it('should left trim other characters from string', () => {
    expect(pipe.transform('42foo bar42', '42')).toEqual('foo bar42');
  });

  it('should not modify already trimmed string', () => {
    expect(pipe.transform('foo bar  ')).toEqual('foo bar  ');
  });

  it('should not modify empty strings', () => {
    expect(pipe.transform('')).toEqual('');
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
