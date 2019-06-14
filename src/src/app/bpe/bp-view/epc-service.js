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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var myGlobals = require("../../globals");
var ng2_cookies_1 = require("ng2-cookies");
var EpcService = /** @class */ (function () {
    function EpcService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.dataChannelEndpoint = myGlobals.data_channel_endpoint;
    }
    EpcService.prototype.registerEpcCodes = function (epcCodes) {
        var url = this.dataChannelEndpoint + "/epc/";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(epcCodes), { headers: headers_token, withCredentials: true })
            .toPromise()
            .catch(this.handleError);
    };
    EpcService.prototype.getEpcCodes = function (orderId) {
        var url = this.dataChannelEndpoint + "/epc/" + orderId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    EpcService.prototype.deleteEpcCodes = function (epcCodes) {
        var url = this.dataChannelEndpoint + "/epc/";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        var options = {
            headers: headers_token,
            body: JSON.stringify(epcCodes)
        };
        return this.http
            .delete(url, options)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EpcService.prototype.handleError = function (error) {
        var errorMsg = error.message;
        console.error(errorMsg);
    };
    EpcService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], EpcService);
    return EpcService;
}());
exports.EpcService = EpcService;
//# sourceMappingURL=epc-service.js.map