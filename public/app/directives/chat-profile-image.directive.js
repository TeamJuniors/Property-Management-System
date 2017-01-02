"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ChatProfileImageDirective = (function () {
    function ChatProfileImageDirective(elementRef) {
        this.elementRef = elementRef;
        this.elementRef.nativeElement.style.width = '35px';
        this.elementRef.nativeElement.style.height = '35px';
        this.elementRef.nativeElement.className += " img-circle";
    }
    return ChatProfileImageDirective;
}());
ChatProfileImageDirective = __decorate([
    core_1.Directive({ selector: '[chat-profile-image]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ChatProfileImageDirective);
exports.ChatProfileImageDirective = ChatProfileImageDirective;
//# sourceMappingURL=chat-profile-image.directive.js.map