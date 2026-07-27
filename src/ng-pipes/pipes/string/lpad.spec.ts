import { LeftPadPipe } from './lpad';

describe('LeftPadPipe', () => {
  const pipe = new LeftPadPipe();

  it('should left pad with spaces by default', () => {
    expect(pipe.transform('foo', 5)).toEqual('  foo');
  });

  it('should left pad empty strings', () => {
    expect(pipe.transform('', 5)).toEqual('     ');
  });

  it('should left pad using a non-space padding character', () => {
    expect(pipe.transform('2', 6, '0')).toEqual('000002');
  });

  it('should not modify strings longer than desired length', () => {
    expect(pipe.transform('foo', 3)).toEqual('foo');
    expect(pipe.transform('foo', 1)).toEqual('foo');
  });

  it('should not modify strings on negative length', () => {
    expect(pipe.transform('foo', -1)).toEqual('foo');
  });

  it('should not modify strings on empty pad character', () => {
    expect(pipe.transform('foo', 6, '')).toEqual('foo');
  });
});
