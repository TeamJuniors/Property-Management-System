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
var HomeComponent = (function () {
    function HomeComponent() {
        this.isLogged = false;
        console.log("Constructor");
        if (localStorage.getItem('currentUser') != undefined) {
            console.log("True");
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
        console.log(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            var activeEl = 0;
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
            $('#profile-image1').on('click', function () {
                console.log('Cliked');
                $('#profile-image-upload').click();
            });
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
    HomeComponent.prototype.logout = function () {
        console.log("Test");
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: 'app/home/home.component.html'
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map