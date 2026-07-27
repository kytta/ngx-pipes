import { WrapPipe } from './wrap';

describe('WrapPipe', () => {
  const pipe = new WrapPipe();

  it('should wrap input', () => {
    expect(pipe.transform('main text', 'great prefix ', ' awesome suffix')).toEqual(
      'great prefix main text awesome suffix'
    );
    expect(pipe.transform('main text', 'only prefix ')).toEqual('only prefix main text');
    expect(pipe.transform('main text', undefined, ' only suffix')).toEqual('main text only suffix');
  });

  it('should not do anything if input is not a string', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
  });

  it('should not do anything if neither prefix nor suffix are defined', () => {
    expect(pipe.transform('main text')).toEqual('main text');
  });

  it('should not do mutate original string', () => {
    const original = 'foo';

    expect(pipe.transform(original, 'pre ', ' post')).not.toBe(original);
    expect(original).toEqual('foo');
  });
});
