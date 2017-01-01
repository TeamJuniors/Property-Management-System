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
var condominium_service_1 = require("../services/condominium-service");
var apartment_service_1 = require("../services/apartment-service");
var user_service_1 = require("../services/user-service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../services/authentication-service");
var alert_service_1 = require("../services/alert-service");
var ManagerComponent = (function () {
    function ManagerComponent(route, router, authenticationService, alertService, condominiumService, apartmentService, userService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.condominiumService = condominiumService;
        this.apartmentService = apartmentService;
        this.userService = userService;
        this.isLogged = false;
        this.showApartment = false;
        this.isManager = false;
        if (localStorage.getItem('currentUser') != undefined) {
            var userNow = JSON.parse(localStorage.getItem('currentUser'));
            this.authenticationService.login(userNow.username, userNow.password)
                .subscribe(function (data) {
                _this.user = JSON.parse(localStorage.getItem('currentUser'));
                _this.isLogged = true;
                _this.isManager = _this.user.manager;
                _this.tasks = _this.user.tasks;
                _this.apartments = [];
                _this.condominiumService.getByProperties(_this.user).subscribe(function (data) {
                    var _loop_1 = function (i) {
                        _this.apartmentService.getByProperties(data.apartments[i]).subscribe(function (app) {
                            for (var j = 0; j < data.apartments[i].users.length; j += 1) {
                                if (data.apartments[i].users[j].manager || data.apartments[i].users[j].isManager) {
                                    _this.theManager = data.apartments[i].users[j];
                                    break;
                                }
                            }
                            _this.apartments.push(app);
                        }, function (err) {
                            console.log("Cannot get apartment");
                        });
                    };
                    for (var i = 0; i < data.apartments.length; i++) {
                        _loop_1(i);
                    }
                    _this.condominium = data;
                }, function (err) {
                    console.log("Error in home get condominium");
                });
            }, function (error) {
                _this.alertService.error('Your cerdenials are not valid please log in again', true);
                localStorage.removeItem('currentUser');
                _this.router.navigateByUrl('/login');
            });
        }
        else {
            this.router.navigateByUrl('/home');
        }
        this.taskTitle = '';
        this.comment = '';
        this.checkboxes = {};
        this.maxDate = '';
    }
    ManagerComponent.prototype.onApartmentTableClick = function (index) {
        this.showingApartment = this.apartments[index];
        this.showApartment = true;
    };
    ManagerComponent.prototype.returnApartmentPage = function () {
        this.showApartment = false;
    };
    ManagerComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    };
    ManagerComponent.prototype.changeCheckbox = function (index) {
        this.checkboxes[index] = !this.checkboxes[index];
    };
    ManagerComponent.prototype.addTasks = function () {
        var _this = this;
        var task = {
            title: this.taskTitle,
            description: this.comment,
            date: this.maxDate
        };
        if (!this.taskTitle) {
            this.alertService.error('Въведете заглавие');
            return;
        }
        if (this.taskTitle.length < 3) {
            this.alertService.error('Заглавието трябва да бъде по-дълго от 3 символа');
            return;
        }
        if (!this.comment) {
            this.alertService.error('Въведете описание');
            return;
        }
        if (this.comment.length < 10) {
            this.alertService.error('Описанието трябва да бъде по-дълго от 10 символа');
            return;
        }
        if (!this.maxDate) {
            this.alertService.error('Въведете дата');
            return;
        }
        if (new Date(+this.maxDate.split('-')[0], +this.maxDate.split('-')[1], +this.maxDate.split('-')[2]).getTime() < new Date().getTime()) {
            this.alertService.error('Въведената дата трябва да е след сегашната');
            return;
        }
        for (var i = 0; i < this.apartments.length; i += 1) {
            if (this.checkboxes[i]) {
                for (var j = 0; j < this.apartments[i].users.length; j += 1) {
                    console.log(this.apartments[i].users[j].username);
                    console.log(task);
                    this.userService.addTask(this.apartments[i].users[j].username, task).subscribe(function (data) {
                        if (data.username === _this.user.username) {
                            _this.user.tasks.push(task);
                        }
                    }, function (err) {
                        console.log("Error in addtask");
                        console.log(err);
                    });
                }
            }
        }
        this.alertService.success('Успешно добавено!');
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