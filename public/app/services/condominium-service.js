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
var CondominiumService = (function () {
    function CondominiumService(http) {
        this.http = http;
    }
    CondominiumService.prototype.getAll = function () {
        return this.http.get('/api/condominimums', this.jwt()).map(function (response) { return response.json(); });
    };
    CondominiumService.prototype.create = function (condominiumProperties) {
        return this.http.post('/api/condominimums', condominiumProperties, this.jwt()).map(function (response) { return response.json(); });
    };
    CondominiumService.prototype.addApartment = function (condominium, apartment) {
        return this.http.post('/api/addApartmentToCondominimum', { condominium: condominium, apartment: apartment }, this.jwt()).map(function (response) { return response.json(); });
    };
    CondominiumService.prototype.addUserToApartmentInCondominium = function (condominium, apartment, user) {
        return this.http.post('/api/addUserToApartmentInCondominium', { condominium: condominium, apartment: apartment, user: user }, this.jwt()).map(function (response) { return response.json(); });
    };
    CondominiumService.prototype.getByProperties = function (properties) {
        return this.http.post('/api/findCondominimums', properties, this.jwt()).map(function (response) { return response.json(); });
    };
    CondominiumService.prototype.jwt = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return CondominiumService;
}());
CondominiumService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CondominiumService);
exports.CondominiumService = CondominiumService;
//# sourceMappingURL=condominium-service.js.map