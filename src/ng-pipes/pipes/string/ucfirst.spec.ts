import { UcFirstPipe } from './ucfirst';

describe('UcFirstPipe', () => {
  let pipe: UcFirstPipe;

  beforeEach(() => {
    pipe = new UcFirstPipe();
  });

  it('should return value if not a string', () => {
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform(false)).toEqual(false);
  });

  it('should capitalize first word in a string', () => {
    const result = pipe.transform('foo bar baz');
    expect(result).toEqual('Foo bar baz');
  });

  it('should capitalize first word in a string, and keep other capitalized letters.', () => {
    const result = pipe.transform('foo BAR BaZ');
    expect(result).toEqual('Foo BAR BaZ');
  });

  it('should capitalize special names properly', () => {
    expect(pipe.transform('JEAN-LUC PICARD')).toEqual('Jean-Luc PICARD');
    expect(pipe.transform(`MILES O'BRIEN`)).toEqual(`Miles O'BRIEN`);
  });
});
