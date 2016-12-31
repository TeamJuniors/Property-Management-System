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
var ProtocolService = (function () {
    function ProtocolService(http) {
        this.http = http;
    }
    ProtocolService.prototype.getAll = function () {
        return this.http.get('/api/protocols', this.jwt()).map(function (response) { return response.json(); });
    };
    ProtocolService.prototype.create = function (protocol) {
        return this.http.post('/api/protocols', { protocol: protocol }, this.jwt()).map(function (response) { return response.json(); });
    };
    ProtocolService.prototype.getByProperties = function (prop) {
        return this.http.post('/api/findProtocols', { prop: prop }, this.jwt()).map(function (response) { return response.json(); });
    };
    ProtocolService.prototype.jwt = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return ProtocolService;
}());
ProtocolService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ProtocolService);
exports.ProtocolService = ProtocolService;
//# sourceMappingURL=protocol-service.js.map