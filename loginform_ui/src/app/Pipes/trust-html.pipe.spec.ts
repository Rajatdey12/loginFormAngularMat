import { TrustHTMLPipe } from './trust-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('TrustHTMLPipe', () => {
  it('create an instance', () => {
    let sanitizer:DomSanitizer;
    const pipe = new TrustHTMLPipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
