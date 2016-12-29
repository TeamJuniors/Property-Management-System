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
var user_service_1 = require("../services/user-service");
var alert_service_1 = require("../services/alert-service");
var apartment_service_1 = require("../services/apartment-service");
var FacebookComponent = (function () {
    function FacebookComponent(router, userService, alertService, apartmentService) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.apartmentService = apartmentService;
        this.model = {};
        this.loading = false;
        this.model.password = localStorage.getItem("facebookAuthToken") || '';
        if (!this.model.password) {
            this.router.navigateByUrl('/home');
        }
        this.model.facebookAuthToken = this.model.password;
        this.model.imgUrl = 'http://graph.facebook.com/' + localStorage.getItem("facebookAuthToken") + '/picture?type=square';
        this.userService.getByFacebookAuthToken(this.model.password).subscribe(function (user) {
            console.log("Found User");
            localStorage.setItem('currentUser', JSON.stringify(user));
            _this.router.navigateByUrl('/home');
        }, function (error) {
            console.log("User not found");
        });
    }
    FacebookComponent.prototype.register = function () {
        var _this = this;
        console.log('Register user by facebook');
        var users = [];
        this.loading = true;
        var apartmentProperties = {
            floatNumber: this.model.flatNumber,
            entrance: this.model.exitNumber,
            city: this.model.city,
            neighborhood: this.model.neighborhood,
            apartmentNumber: this.model.apartmentNumber,
            users: users
        };
        this.apartmentService.getByProperties(apartmentProperties)
            .subscribe(function (data) {
            console.log("Found apartment");
            _this.apartmentService.addUser(apartmentProperties, _this.model).subscribe(function (data) {
                console.log("Successfully added user");
            }, function (error) {
                console.log("Cannot add user");
            });
        }, function (error) {
            _this.apartmentService.create(apartmentProperties, _this.model).subscribe(function (data) {
                console.log("Successfully created apartment");
            }, function (error) {
                console.log("Cannot add apartment");
            });
        });
        this.userService.create(this.model)
            .subscribe(function (user) {
            _this.alertService.success('Registration facebook successful', true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            _this.router.navigateByUrl('/home');
        }, function (error) {
            console.log('Register facebook failed');
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    FacebookComponent.prototype.ngAfterViewInit = function () {
        console.log("Click");
        $('#radioBtn a').on('click', function () {
            var sel = $(this).data('title');
            var tog = $(this).data('toggle');
            $('#' + tog).prop('value', sel);
            //console.log(this.model);
            if (sel == "Y") {
                this.model.manager = true;
            }
            if (sel == "N") {
            }
            //console.log(this.model.password);
            $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active').addClass('notActive');
            $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').removeClass('notActive').addClass('active');
        });
    };
    return FacebookComponent;
}());
FacebookComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'facebook-login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService,
        alert_service_1.AlertService,
        apartment_service_1.ApartmentService])
], FacebookComponent);
exports.FacebookComponent = FacebookComponent;
//# sourceMappingURL=facebook-login.component.js.map