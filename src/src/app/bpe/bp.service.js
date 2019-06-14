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
// Imports
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var configuration = require("../globals");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var ng2_cookies_1 = require("ng2-cookies");
var BPService = /** @class */ (function () {
    function BPService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // private endpoint = 'http://localhost:8081';
        this.endpoint = configuration.bpe_endpoint;
        this.bpsUrl = this.endpoint + '/content'; // URL to web api
        this.configurationUrl = this.endpoint + '/application'; // URL to web api
    }
    BPService.prototype.getBPs = function () {
        var bps = this.http.get(this.bpsUrl, { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return bps;
    };
    BPService.prototype.getBP = function (processID) {
        var url = this.bpsUrl + "/" + processID;
        return this.http.get(url, { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.delete = function (processID) {
        var url = this.bpsUrl + "/" + processID;
        return this.http.delete(url, { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.create = function (bp) {
        //console.log(' Sending business process: ', bp);
        return this.http
            .post(this.bpsUrl, JSON.stringify(bp), { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.update = function (bp) {
        return this.http
            .put(this.bpsUrl, JSON.stringify(bp), { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.getConfiguration = function (partnerID, processID, roleType) {
        var url = this.configurationUrl + "/" + partnerID + "/" + processID + "/" + roleType;
        return this.http.get(url, { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.updateConfiguration = function (configuration) {
        //console.log(' Sending configurations: ', configuration);
        return this.http
            .put(this.configurationUrl, JSON.stringify(configuration), { headers: this.getAuthorizedHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPService.prototype.getAuthorizedHeaders = function () {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        return headers;
    };
    BPService.prototype.handleError = function (error) {
        var errorMsg = error.message || "There was a problem with our the rest service and we couldn't retrieve the data!";
        console.error(errorMsg);
        // throw an application level error
        return Observable_1.Observable.throw(errorMsg);
    };
    BPService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], BPService);
    return BPService;
}());
exports.BPService = BPService;
//# sourceMappingURL=bp.service.js.map