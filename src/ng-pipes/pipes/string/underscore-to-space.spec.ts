import { UnderscoreToSpacePipe } from './underscore-to-space';

describe('UnderscoreToSpacePipe Tests', () => {
  const pipe = new UnderscoreToSpacePipe();

  it('should replace underscores with spaces', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform('foo')).toEqual('foo');
    expect(pipe.transform('foo_bar')).toEqual('foo bar');
  });
});
