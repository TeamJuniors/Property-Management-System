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
var ApartmentService = (function () {
    function ApartmentService(http) {
        this.http = http;
    }
    ApartmentService.prototype.getAll = function () {
        return this.http.get('/api/apartments', this.jwt()).map(function (response) { return response.json(); });
    };
    ApartmentService.prototype.create = function (apartment) {
        return this.http.post('/api/apartments', apartment, this.jwt()).map(function (response) { return response.json(); });
    };
    ApartmentService.prototype.addUser = function (apartment, user) {
        return this.http.post('/api/addUserToApartment', { apartment: apartment, user: user }, this.jwt()).map(function (response) { return response.json(); });
    };
    ApartmentService.prototype.getByProperties = function (properties) {
        return this.http.post('/api/findApartments', properties, this.jwt()).map(function (response) { return response.json(); });
    };
    ApartmentService.prototype.jwt = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return ApartmentService;
}());
ApartmentService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApartmentService);
exports.ApartmentService = ApartmentService;
//# sourceMappingURL=apartment-service.js.map