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
var router_1 = require("@angular/router");
var ng2_facebook_sdk_js_1 = require("../../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js");
var user_service_1 = require("../services/user-service");
var condominium_service_1 = require("../services/condominium-service");
var apartment_service_1 = require("../services/apartment-service");
var HomeComponent = (function () {
    function HomeComponent(userService, fb, route, router, condominiumService, apartmentService) {
        this.userService = userService;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.condominiumService = condominiumService;
        this.apartmentService = apartmentService;
        this.isLogged = false;
        this.isManager = false;
        this.showApartment = false;
        if (localStorage.getItem('currentUser') != undefined) {
            this.isLogged = true;
        }
        else {
            this.isLogged = false;
        }
        console.log(localStorage.getItem('currentUser'));
        var fbParams = {
            appId: '1064731376969661',
            xfbml: true,
            version: 'v2.6'
        };
        this.fb.init(fbParams);
        this.newImgUrl = '';
    }
    HomeComponent.prototype.onApartmentTableClick = function (index) {
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    };
    HomeComponent.prototype.returnApartmentPage = function () {
        this.showApartment = false;
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.apartments = [];
        this.condominiumService.getByProperties(this.user).subscribe(function (data) {
            for (var i = 0; i < data.apartments.length; i++) {
                _this.apartmentService.getByProperties(data.apartments[i]).subscribe(function (data) {
                    console.log(data);
                    _this.apartments.push(data);
                }, function (err) {
                    console.log("Cannot get apartment");
                });
            }
            _this.condominium = data;
        }, function (err) {
            console.log("Error in home get condominium");
        });
    };
    HomeComponent.prototype.ngOnInit = function () {
        console.log("OnInit");
        if (localStorage.getItem('currentUser')) {
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.isManager = this.user.manager;
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
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    };
    HomeComponent.prototype.facebookLoginClick = function () {
        var _this = this;
        this.fb.login().then(function (response) {
            console.log("Facebook response");
            console.log(response);
            if (response.status === 'connected') {
                localStorage.setItem('facebookAuthToken', response.authResponse.userID);
                _this.router.navigateByUrl('/login/facebook');
            }
        }, function (error) {
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: 'app/home/home.component.html',
        styles: ["\n        .pointer-mouse {\n            cursor: pointer;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        ng2_facebook_sdk_js_1.FacebookService,
        router_1.ActivatedRoute,
        router_1.Router,
        condominium_service_1.CondominiumService,
        apartment_service_1.ApartmentService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map