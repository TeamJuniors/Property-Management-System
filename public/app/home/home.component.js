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
var chat_service_1 = require("../services/chat-service");
var core_1 = require("@angular/core");
var user_service_1 = require("../services/user-service");
var HomeComponent = (function () {
    function HomeComponent(userService, chatService) {
        this.userService = userService;
        this.chatService = chatService;
        this.isLogged = false;
        if (localStorage.getItem('currentUser') != undefined) {
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
        console.log(localStorage.getItem('currentUser'));
        this.newImgUrl = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.username = this.user.username;
            var activeEl = 0;
            //Setting defalt image
            this.user.imgUrl = this.user.imgUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
            $(function () {
                var items = $('.btn-nav');
                $(items[activeEl]).addClass('active');
                $(".btn-nav").click(function () {
                    $(items[activeEl]).removeClass('active');
                    $(this).addClass('active');
                    activeEl = $(".btn-nav").index(this);
                });
            });
            console.log("LOADED");
        }
        else {
            this.isLogged = false;
        }
    };
    HomeComponent.prototype.ngOnChange = function () {
        console.log("OnChange");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
    };
    HomeComponent.prototype.uploadImageClick = function () {
        var _this = this;
        this.userService.changeImage(this.user, this.newImgUrl)
            .subscribe(function (newUser) {
            console.log('Upload Image');
            console.log(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            _this.user.imgUrl = newUser.imgUrl;
            _this.newImgUrl = '';
        }, function (error) {
            console.log("Upload error");
            console.log(error);
            //this.alertService.error(error);
            //this.loading = false;
        });
    };
    HomeComponent.prototype.logout = function () {
        console.log("Test");
        var username = JSON.parse(localStorage.getItem('currentUser')).username;
        localStorage.removeItem('currentUser');
        this.isLogged = false;
        this.chatService.logoutUser(username);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: 'app/home/home.component.html',
        styles: ["\n        .pointer-mouse {\n            cursor: pointer;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, chat_service_1.ChatService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map