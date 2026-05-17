import { CamelizePipe } from './camelize';

describe('CamelizePipe', () => {
  let pipe: CamelizePipe;

  beforeEach(() => {
    pipe = new CamelizePipe();
  });

  it('should not do anything if not a string', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform({ name: 'foo' })).toEqual({ name: 'foo' });
  });

  it('should camelize properly', () => {
    expect(pipe.transform('foo-bar')).toEqual('fooBar');
    expect(pipe.transform('foo_bar')).toEqual('fooBar');
    expect(pipe.transform('some_dashed-with-underscore')).toEqual('someDashedWithUnderscore');
    expect(pipe.transform('dash-foo-')).toEqual('dashFoo');
    expect(pipe.transform('-dash-foo')).toEqual('dashFoo');
    expect(pipe.transform('-dash-foo-')).toEqual('dashFoo');
    expect(pipe.transform('-dash foo ')).toEqual('dashFoo');
  });
});
