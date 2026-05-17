import { TrimPipe } from './trim';

describe('TrimPipe', () => {
  let pipe: TrimPipe;

  beforeEach(() => {
    pipe = new TrimPipe();
  });

  it('should trim whitespace from string', () => {
    const result = pipe.transform('   foo bar   ');
    expect(result).toEqual('foo bar');
  });

  it('should trim other characters from string', () => {
    const result = pipe.transform('42foo bar4242', '42');
    expect(result).toEqual('foo bar');
  });
});
