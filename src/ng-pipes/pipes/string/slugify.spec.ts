import { SlugifyPipe } from './slugify';

describe('SlugifyPipe', () => {
  let pipe: SlugifyPipe;

  beforeEach(() => {
    pipe = new SlugifyPipe();
  });

  it('should slugify strings', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform('Foo')).toEqual('foo');
    expect(pipe.transform('Foo Bar')).toEqual('foo-bar');
    expect(pipe.transform('Foo Bar Baz')).toEqual('foo-bar-baz');
    expect(pipe.transform('UPPER CASE TEXT')).toEqual('upper-case-text');
  });

  it('should slugify special strings', () => {
    expect(pipe.transform('http://example.com/foo')).toEqual('http-example-com-foo');
    expect(pipe.transform(' http://example.com/foo ')).toEqual('http-example-com-foo');
  });
});
