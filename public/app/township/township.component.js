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
var http_1 = require("@angular/http");
var townshipMessage_service_1 = require("../services/townshipMessage-service");
require("rxjs/add/operator/map");
var TownshipComponent = (function () {
    function TownshipComponent(http, townshipMessageService) {
        this.http = http;
        this.townshipMessageService = townshipMessageService;
        this.IsLogged = false;
        this.model = {};
        this.showDetail = false;
    }
    TownshipComponent.prototype.login = function () {
        var _this = this;
        var authenticationNumber = this.model.number;
        console.log(authenticationNumber);
        this.townshipMessageService.LogLikeTownship(authenticationNumber).subscribe(function (data) {
            console.log(data);
            localStorage.setItem('townshipLogin', JSON.stringify(data));
            _this.LoadAfterLoginData();
        }, function (err) {
            console.log("Cannot get");
        });
    };
    TownshipComponent.prototype.returnPage = function () {
        this.showDetail = false;
    };
    TownshipComponent.prototype.showDetailed = function (index) {
        console.log(index);
        this.showDetail = true;
        this.showElement = this.messages[index];
    };
    TownshipComponent.prototype.sendAnswerToTownship = function () {
        var _this = this;
        var answer = $('#townshipMessage').val();
        $('#townshipMessage').val("");
        this.townshipMessageService.setAnswerToTownshipMessage(this.showElement, answer).subscribe(function (data) {
            console.log("Set new answer");
            _this.showElement = data;
            _this.townshipMessageService.getAll().subscribe(function (data) {
                _this.messages = data;
            }, function (err) {
            });
        }, function (err) {
            console.log("Cannot set new asnwer");
        });
    };
    TownshipComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('townshipLogin')) {
            this.LoadAfterLoginData();
        }
        else {
            this.IsLogged = false;
        }
    };
    TownshipComponent.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('townshipLogin');
    };
    TownshipComponent.prototype.LoadAfterLoginData = function () {
        var _this = this;
        this.IsLogged = true;
        this.townshipMessageService.getAll().subscribe(function (data) {
            console.log("Get all");
            console.log(data);
            _this.messages = data;
        }, function (err) {
            console.log("Error get all");
        });
    };
    return TownshipComponent;
}());
TownshipComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'township.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, townshipMessage_service_1.TownshipMessageService])
], TownshipComponent);
exports.TownshipComponent = TownshipComponent;
//# sourceMappingURL=township.component.js.map