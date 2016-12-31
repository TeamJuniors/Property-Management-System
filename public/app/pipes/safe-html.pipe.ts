import { Pipe, Sanitizer, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtml implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}