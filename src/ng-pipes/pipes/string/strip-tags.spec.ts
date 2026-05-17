import { StripTagsPipe } from './strip-tags';

describe('StripTagsPipe', () => {
  let pipe: StripTagsPipe;

  beforeEach(() => {
    pipe = new StripTagsPipe();
  });

  it('should strip tags', () => {
    expect(pipe.transform('<a href="">foo</a>')).toEqual('foo');
    expect(pipe.transform('<p class="foo">bar</p>')).toEqual('bar');
  });

  it('should strip tags only tags which are not allowed', () => {
    expect(pipe.transform('<a href="">foo</a><p class="foo">bar</p>', 'p')).toEqual('foo<p class="foo">bar</p>');
    expect(pipe.transform('<a href="">foo</a><p class="foo">bar</p>', 'a')).toEqual('<a href="">foo</a>bar');
    expect(pipe.transform('<a href="">foo</a><p class="foo">bar</p>', 'p', 'a')).toEqual(
      '<a href="">foo</a><p class="foo">bar</p>'
    );
  });

  it('should be fast on big strings', () => {
    // from https://github.com/danrevah/ngx-pipes/issues/255
    const string =`• Damas Syrian (100 metres) < 1-minute walk
• Brazza cocktailbar (160 metres) < 2-minute walk
• Spanish Inn - Live Music Pub (400 metres) < 5-minute walk
• Bistro Mathilda (450 metres) < 5-minute walk`;

    const start = performance.now();
    void pipe.transform(string);
    const end = performance.now();

    // the old version takes ~4s on an Apple M2 Pro CPU, the new version takes 0.05s
    expect(end - start).toBeLessThan(1000);
  });
});
