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
require("rxjs/add/operator/toPromise");
var myGlobals = require("../globals");
var ng2_cookies_1 = require("ng2-cookies");
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url_da = myGlobals.data_aggregation_endpoint;
        this.url_bpe = myGlobals.bpe_endpoint + "/statistics";
        this.url_trust = myGlobals.trust_service_endpoint;
        this.url_identity = myGlobals.user_mgmt_endpoint;
    }
    AnalyticsService.prototype.getPlatAnalytics = function () {
        var url = "" + this.url_da;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getPerfromanceAnalytics = function (comp) {
        var url = this.url_da + "/company?companyID=" + comp;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getCompAnalytics = function (comp) {
        var url = this.url_da + "?companyID=" + comp;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getNonOrdered = function (partyId) {
        var url = this.url_bpe + "/non-ordered?partyId=" + partyId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getTrustPolicy = function () {
        var url = this.url_trust + "/policy/global";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.setTrustPolicy = function (policy) {
        var url = this.url_trust + "/policy/global/update";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(policy), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.initTrustPolicy = function () {
        var url = this.url_trust + "/policy/global/initialize";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, null, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getUnverifiedCompanies = function (page, sortBy, orderBy) {
        var url = this.url_identity + "/admin/unverified_companies?page=" + page + "&sortBy=" + sortBy + "&orderBy=" + orderBy;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getVerifiedCompanies = function (page, size, sortBy, orderBy) {
        var url = this.url_identity + "/admin/verified_companies?page=" + page + "&sortBy=" + sortBy + "&orderBy=" + orderBy;
        if (size)
            url += "&size=" + size;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getAllParties = function (page) {
        var url = this.url_identity + "/parties/all?page=" + page;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.verifyCompany = function (companyId) {
        var url = this.url_identity + "/admin/verify_company?companyId=" + companyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, {}, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.deleteCompany = function (companyId) {
        var url = this.url_identity + "/admin/delete_company/" + companyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .delete(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    AnalyticsService.prototype.getAuthorizedHeaders = function () {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        return headers;
    };
    AnalyticsService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    AnalyticsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], AnalyticsService);
    return AnalyticsService;
}());
exports.AnalyticsService = AnalyticsService;
//# sourceMappingURL=analytics.service.js.map