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
var chat_service_1 = require("../../services/chat-service");
var core_1 = require("@angular/core");
var ChatPopupComponent = (function () {
    function ChatPopupComponent(chatService) {
        this.chatService = chatService;
        this.username = '';
    }
    ChatPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatService.popupUsername.subscribe(function (x) { return _this.username = x.popupUsername; });
        this.chatService.allMessages.subscribe(function (x) { return _this.allMessages = x.allMessages; });
        $('.sent-message.received-message').html('');
        this.chatService.getMessages(this.chatService.getCurrentUser().username, this.username);
        this.scrollDown();
    };
    ChatPopupComponent.prototype.create = function (username) {
        this.username = username;
        $('chat-box').css('display', 'block');
        this.getAllMessages();
        this.scrollDown();
    };
    ChatPopupComponent.prototype.closePopup = function () {
        $('chat-box').css('display', 'none');
    };
    ChatPopupComponent.prototype.sendMessage = function () {
        var message = $('.message-input').val();
        this.chatService.sendMessage(message, this.username, new Date());
        $('.message-input').val('');
        this.getAllMessages();
        this.scrollDown();
    };
    ChatPopupComponent.prototype.scrollDown = function () {
        $('.popup-messages').animate({ scrollTop: $('body').height() }, 'slow');
    };
    ChatPopupComponent.prototype.getAllMessages = function () {
        $('.sent-message.received-message').html('');
        this.chatService.getMessages(this.chatService.getCurrentUser().username, this.username);
    };
    return ChatPopupComponent;
}());
ChatPopupComponent = __decorate([
    core_1.Component({
        selector: 'chat-box',
        templateUrl: 'app/chat/chat-popup/chat-popup.component.html'
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatPopupComponent);
exports.ChatPopupComponent = ChatPopupComponent;
//# sourceMappingURL=chat-popup.component.js.map