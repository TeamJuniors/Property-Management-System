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
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var ChatService = (function () {
    function ChatService() {
        this.onlineUsers = new Rx_1.BehaviorSubject({ onlineUsers: null });
        this.popupUsername = new Rx_1.BehaviorSubject({ popupUsername: '' });
        this.allMessages = new Rx_1.BehaviorSubject({ allMessages: [] });
        this.manageSocket();
    }
    ChatService.prototype.manageSocket = function () {
        var _this = this;
        this.socket = io.connect('localhost:3000');
        this.socket.on('connection', function () {
            if (localStorage.getItem('currentUser') != undefined) {
                _this.connectUser();
            }
        });
        this.socket.on('send-online-users', function (onlineUsers) {
            _this.onlineUsers.next({ onlineUsers: onlineUsers });
        });
        this.socket.on('send-chat', function (chat) {
            var currentUsername = _this.getCurrentUser().username;
            var currentFirstOrSecond = chat.firstUser === _this.getCurrentUser().username ? 'first' : 'second';
            if ((chat.firstUser === _this.getCurrentUser().username && _this.popupUsername.value.popupUsername === chat.secondUser) ||
                (chat.secondUser === _this.getCurrentUser().username && _this.popupUsername.value.popupUsername === chat.firstUser)) {
                var firstMessages = chat.firstUserMessages.map(function (x) {
                    return {
                        text: x.text,
                        time: new Date(x.time),
                        type: 'first'
                    };
                });
                var secondMessages = chat.secondUserMessages.map(function (x) {
                    return {
                        text: x.text,
                        time: new Date(x.time),
                        type: 'second'
                    };
                });
                var allMessages = firstMessages.concat(secondMessages).sort(function (a, b) {
                    return a.time.getTime() - b.time.getTime();
                });
                for (var _i = 0, allMessages_1 = allMessages; _i < allMessages_1.length; _i++) {
                    var message = allMessages_1[_i];
                    if (message.type === currentFirstOrSecond) {
                        message.type = 'sent-message';
                    }
                    else {
                        message.type = 'received-message';
                    }
                }
                _this.allMessages.next({ allMessages: allMessages });
            }
        });
    };
    ChatService.prototype.connectUser = function () {
        var localStorageUser = this.getCurrentUser();
        if (localStorageUser) {
            this.socket.emit('user-connect', localStorageUser.username);
        }
    };
    ChatService.prototype.logoutUser = function (username) {
        this.socket.emit('user-logout', username);
    };
    ChatService.prototype.sendMessage = function (message, toUsername, time) {
        var localStorageUser = this.getCurrentUser();
        this.socket.emit('send-message', message, localStorageUser.username, toUsername, time);
    };
    ChatService.prototype.updatePopupUser = function (username) {
        this.popupUsername.next({ popupUsername: username });
        $('.sent-message.received-message').html('');
        this.getMessages(this.getCurrentUser().username, username);
    };
    ChatService.prototype.getMessages = function (firstUser, secondUser) {
        this.socket.emit('get-messages', firstUser, secondUser);
    };
    ChatService.prototype.getCurrentUser = function () {
        return JSON.parse(localStorage.getItem('currentUser'));
    };
    return ChatService;
}());
ChatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat-service.js.map