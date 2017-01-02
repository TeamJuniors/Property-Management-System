import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[chat-profile-image]' })
export class ChatProfileImageDirective {
    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.width = '35px';
        this.elementRef.nativeElement.style.height = '35px';
        this.elementRef.nativeElement.className += " img-circle";
    }
}