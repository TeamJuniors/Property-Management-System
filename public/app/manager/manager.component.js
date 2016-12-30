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
var alert_service_1 = require("../services/alert-service");
var authentication_service_1 = require("../services/authentication-service");
var condominium_service_1 = require("../services/condominium-service");
var apartment_service_1 = require("../services/apartment-service");
var user_service_1 = require("../services/user-service");
var ManagerComponent = (function () {
    function ManagerComponent(route, router, authenticationService, alertService, condominiumService, apartmentService, userService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.condominiumService = condominiumService;
        this.apartmentService = apartmentService;
        this.userService = userService;
        this.isLogged = false;
        this.showApartment = false;
        console.log("manager init");
        if (localStorage.getItem('currentUser') != undefined) {
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.tasks = this.user.tasks;
            if (!this.user.manager) {
                this.router.navigateByUrl('/home');
            }
        }
        else {
            this.router.navigateByUrl('/home');
        }
        this.taskTitle = '';
        this.comment = '';
        this.checkboxes = {};
        this.maxDate = '';
    }
    ManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apartments = [];
        this.condominiumService.getByProperties(this.user).subscribe(function (data) {
            for (var i = 0; i < data.apartments.length; i++) {
                _this.apartmentService.getByProperties(data.apartments[i]).subscribe(function (data) {
                    _this.apartments.push(data);
                }, function (err) {
                    console.log("Cannot get apartment");
                });
            }
            _this.condominium = data;
            console.log('condiminum');
            console.log(_this.condominium);
        }, function (err) {
            console.log("Error in home get condominium");
        });
    };
    ManagerComponent.prototype.onApartmentTableClick = function (index) {
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    };
    ManagerComponent.prototype.returnApartmentPage = function () {
        this.showApartment = false;
    };
    ManagerComponent.prototype.logout = function () {
        console.log("Test");
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    };
    ManagerComponent.prototype.changeCheckbox = function (index) {
        this.checkboxes[index] = !this.checkboxes[index];
        console.log(this.checkboxes);
    };
    ManagerComponent.prototype.addTasks = function () {
        var _this = this;
        var task = {
            title: this.taskTitle,
            description: this.comment,
            date: this.maxDate
        };
        if (new Date(+this.maxDate.split('-')[0], +this.maxDate.split('-')[1], +this.maxDate.split('-')[2]).getTime() < new Date().getTime()) {
            this.alertService.error('Въведената дата трябва да е след сегашната');
            return;
        }
        var _loop_1 = function (i) {
            if (this_1.checkboxes[i]) {
                var _loop_2 = function (j) {
                    this_1.userService.addTask(this_1.apartments[i].users[j].username, task).subscribe(function (data) {
                        _this.apartments[i].users[j].tasks = _this.apartments[i].users[j].tasks || [];
                        _this.apartments[i].users[j].tasks.push(task);
                    }, function (err) {
                        console.log("Error in addtask");
                    });
                };
                for (var j = 0; j < this_1.apartments[i].users.length; j += 1) {
                    _loop_2(j);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.apartments.length; i += 1) {
            _loop_1(i);
        }
    };
    return ManagerComponent;
}());
ManagerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'manager.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        authentication_service_1.AuthenticationService,
        alert_service_1.AlertService,
        condominium_service_1.CondominiumService,
        apartment_service_1.ApartmentService,
        user_service_1.UserService])
], ManagerComponent);
exports.ManagerComponent = ManagerComponent;
//# sourceMappingURL=manager.component.js.map