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
var condominium_service_1 = require("../services/condominium-service");
var RegisterComponent = (function () {
    function RegisterComponent(router, userService, alertService, apartmentService, condominiumService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.apartmentService = apartmentService;
        this.condominiumService = condominiumService;
        this.model = {};
        this.loading = false;
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var users = [];
        users.push(this.model);
        this.loading = true;
        var apartmentProperties = {
            floatNumber: this.model.flatNumber,
            entrance: this.model.exitNumber,
            city: this.model.city,
            neighborhood: this.model.neighborhood,
            apartmentNumber: this.model.apartmentNumber,
            users: users
        };
        console.log(apartmentProperties);
        this.apartmentService.getByProperties(apartmentProperties)
            .subscribe(function (data) {
            console.log("Found apartment");
            _this.apartmentService.addUser(apartmentProperties, _this.model).subscribe(function (data) {
                console.log("Successfully added user");
            }, function (error) {
                console.log("Cannot add user");
            });
        }, function (error) {
            _this.apartmentService.create(apartmentProperties).subscribe(function (data) {
                console.log("Successfully created apartment");
                var apartments = [];
                var condominiumProperties = {
                    apartments: apartments,
                    floatNumber: _this.model.flatNumber,
                    entrance: _this.model.exitNumber,
                    city: _this.model.city,
                    neighborhood: _this.model.neighborhood
                };
                _this.condominiumService.getByProperties(condominiumProperties).subscribe(function (data) {
                    console.log("Find condominium");
                    _this.condominiumService.addApartment(condominiumProperties, apartmentProperties).subscribe(function (data) {
                        console.log("Successfully added apartment");
                    }, function (err) {
                        console.log("Cannot add apartment");
                    });
                }, function (err) {
                    console.log("Cannot find condominium");
                    apartments.push(data);
                    _this.condominiumService.create(condominiumProperties).subscribe(function (data) {
                        console.log("Create condominium");
                    }, function (err) {
                        console.log("Cannot create condominium");
                    });
                });
            }, function (error) {
                console.log("Cannot add apartment");
            });
        });
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    RegisterComponent.prototype.ngAfterViewInit = function () {
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
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'register.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        user_service_1.UserService,
        alert_service_1.AlertService,
        apartment_service_1.ApartmentService,
        condominium_service_1.CondominiumService])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map