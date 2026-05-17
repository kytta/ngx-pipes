import { RightTrimPipe } from './rtrim';

describe('RightTrimPipe', () => {
  let pipe: RightTrimPipe;

  beforeEach(() => {
    pipe = new RightTrimPipe();
  });

  it('should right trim whitespace from string', () => {
    const result = pipe.transform('   foo bar   ');
    expect(result).toEqual('   foo bar');
  });

  it('should right trim other characters from string', () => {
    const result = pipe.transform('42foo bar42', '42');
    expect(result).toEqual('42foo bar');
  });
});
