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
var utils_1 = require("../../common/utils");
var http_1 = require("@angular/http");
var ng2_cookies_1 = require("ng2-cookies");
var myGlobals = require("../../globals");
var LogisticPublishingService = /** @class */ (function () {
    function LogisticPublishingService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = myGlobals.catalogue_endpoint;
        this.url = myGlobals.indexing_service_endpoint;
        // maps to store cached values
        this.propertyCodeListMap = new Map();
        this.propertyMap = new Map();
        this.logisticRelatedServices = new Map();
    }
    // methods to retrieve cached values
    LogisticPublishingService.prototype.getCachedPropertyCodeList = function (uri) {
        if (this.propertyCodeListMap.has(uri)) {
            return Promise.resolve(this.propertyCodeListMap.get(uri));
        }
        else {
            return this.getPropertyCodeList(uri);
        }
    };
    LogisticPublishingService.prototype.getCachedProperty = function (uri) {
        if (this.propertyMap.has(uri)) {
            return Promise.resolve(this.propertyMap.get(uri));
        }
        else {
            return this.getProperty(uri);
        }
    };
    LogisticPublishingService.prototype.getCachedLogisticRelatedServices = function (taxonomyId) {
        if (this.logisticRelatedServices.has(taxonomyId)) {
            return Promise.resolve(this.logisticRelatedServices.get(taxonomyId));
        }
        else {
            return this.getLogisticRelatedServices(taxonomyId);
        }
    };
    LogisticPublishingService.prototype.getLogisticRelatedServices = function (taxonomyId) {
        var _this = this;
        var url = this.baseUrl + "/taxonomies/" + taxonomyId + "/logistics-services";
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            var logisticRelatedServices = res.json();
            // add property to the map
            _this.logisticRelatedServices.set(taxonomyId, logisticRelatedServices);
            return logisticRelatedServices;
        })
            .catch(this.handleError);
    };
    LogisticPublishingService.prototype.getProperty = function (uri) {
        var _this = this;
        var url = this.url + ("/property?uri=" + encodeURIComponent(uri));
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var property = res.json();
            // add property to the map
            _this.propertyMap.set(uri, property);
            return property;
        })
            .catch(this.handleError);
    };
    LogisticPublishingService.prototype.getPropertyCodeList = function (uri) {
        var _this = this;
        var url = this.url + ("/code/select?q=codedList:\"" + encodeURIComponent(uri) + "\"");
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var propertyCodeList = res.json();
            // add property code list to the map
            _this.propertyCodeListMap.set(uri, propertyCodeList);
            return propertyCodeList;
        })
            .catch(this.handleError);
    };
    LogisticPublishingService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    LogisticPublishingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], LogisticPublishingService);
    return LogisticPublishingService;
}());
exports.LogisticPublishingService = LogisticPublishingService;
//# sourceMappingURL=logistic-publishing.service.js.map