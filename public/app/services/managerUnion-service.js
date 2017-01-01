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
var ManagerUnionService = (function () {
    function ManagerUnionService(http) {
        this.http = http;
    }
    ManagerUnionService.prototype.getAll = function () {
        return this.http.get('/api/managerUnions', this.jwt()).map(function (response) { return response.json(); });
    };
    ManagerUnionService.prototype.create = function (managerUnion) {
        return this.http.post('/api/managerUnions', { managerUnion: managerUnion }, this.jwt()).map(function (response) { return response.json(); });
    };
    ManagerUnionService.prototype.getByProperties = function (prop) {
        return this.http.post('/api/findManagerUnion', { prop: prop }, this.jwt()).map(function (response) { return response.json(); });
    };
    ManagerUnionService.prototype.addMemberToManagerUnion = function (prop, member) {
        return this.http.post('/api/addMemberToManagerUnion', { prop: prop, member: member }, this.jwt()).map(function (response) { return response.json(); });
    };
    ManagerUnionService.prototype.changeCashierName = function (prop, cashier) {
        return this.http.post('/api/changeCashierName', { prop: prop, cashier: cashier }, this.jwt()).map(function (response) { return response.json(); });
    };
    ManagerUnionService.prototype.jwt = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return ManagerUnionService;
}());
ManagerUnionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ManagerUnionService);
exports.ManagerUnionService = ManagerUnionService;
//# sourceMappingURL=managerUnion-service.js.map