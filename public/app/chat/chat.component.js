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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var chat_popup_component_1 = require("./chat-popup/chat-popup.component");
var chat_service_1 = require("../services/chat-service");
var core_1 = require("@angular/core");
var ChatComponent = (function () {
    function ChatComponent(chatService, popup) {
        this.chatService = chatService;
        this.popup = popup;
        this.showPopup = false;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('currentUser') != undefined) {
            var localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
            this.currentUsername = localStorageUser.username;
            this.chatService.onlineUsers.subscribe(function (x) { return _this.onlineUsers = x.onlineUsers; });
            this.chatService.connectUser();
        }
    };
    ChatComponent.prototype.registerPopup = function (username) {
        this.showPopup = true;
        $('chat-box').css('display', 'block');
        this.chatService.updatePopupUser(username);
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        selector: 'chat',
        templateUrl: 'app/chat/chat.component.html',
        providers: [
            chat_popup_component_1.ChatPopupComponent
        ]
    }),
    __param(1, core_1.ViewChild(chat_popup_component_1.ChatPopupComponent)),
    __metadata("design:paramtypes", [chat_service_1.ChatService, chat_popup_component_1.ChatPopupComponent])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map