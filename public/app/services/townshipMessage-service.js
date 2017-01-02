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
var TownshipMessageService = (function () {
    function TownshipMessageService(http) {
        this.http = http;
    }
    TownshipMessageService.prototype.LogLikeTownship = function (authenticationNumber) {
        return this.http.post('/api/TownshipLogin', { authenticationNumber: authenticationNumber }, this.jwt()).map(function (response) { return response.json(); });
    };
    TownshipMessageService.prototype.getAll = function () {
        return this.http.get('/api/townshipMessages', this.jwt()).map(function (response) { return response.json(); });
    };
    TownshipMessageService.prototype.create = function (townshipMessage) {
        return this.http.post('/api/townshipMessages', { townshipMessage: townshipMessage }, this.jwt()).map(function (response) { return response.json(); });
    };
    TownshipMessageService.prototype.getByProperties = function (prop) {
        return this.http.post('/api/findTownshipMessage', { prop: prop }, this.jwt()).map(function (response) { return response.json(); });
    };
    TownshipMessageService.prototype.jwt = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return TownshipMessageService;
}());
TownshipMessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TownshipMessageService);
exports.TownshipMessageService = TownshipMessageService;
//# sourceMappingURL=townshipMessage-service.js.map