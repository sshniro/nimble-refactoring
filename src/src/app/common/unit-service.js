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
var myGlobals = require("../globals");
var http_1 = require("@angular/http");
var utils_1 = require("../common/utils");
var ng2_cookies_1 = require("ng2-cookies");
var ServiceBridge_1 = require("./ServiceBridge");
var UnitService = /** @class */ (function () {
    function UnitService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.baseUrl = myGlobals.catalogue_endpoint;
        this.map = null;
        ServiceBridge_1.ServiceBridge.unitService = this;
    }
    UnitService.prototype.getCachedUnitList = function (unitListId) {
        var _this = this;
        if (this.map) {
            return Promise.resolve(this.map.get(unitListId));
        }
        else {
            return this.getAllUnitList().then(function (res) {
                return _this.map.get(unitListId);
            });
        }
    };
    UnitService.prototype.getUnitList = function (unitListId) {
        var url = this.baseUrl + ("/unit-lists/" + unitListId);
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    UnitService.prototype.getAllUnitList = function () {
        var _this = this;
        var url = this.baseUrl + '/unit-lists';
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            var unitLists = res.json();
            // create the map
            _this.map = new Map();
            for (var _i = 0, unitLists_1 = unitLists; _i < unitLists_1.length; _i++) {
                var unitList = unitLists_1[_i];
                _this.map.set(unitList.unitListId, unitList.units);
            }
            return unitLists;
        })
            .catch(this.handleError);
    };
    UnitService.prototype.addUnitToList = function (unit, unitListId) {
        var _this = this;
        var url = this.baseUrl + ("/unit-lists/" + unitListId + "?unit=" + unit);
        return this.http
            .patch(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            var result = res.json();
            // update map
            _this.map.set(unitListId, result);
            return result;
        })
            .catch(this.handleError);
    };
    UnitService.prototype.deleteUnitFromList = function (unit, unitListId) {
        var _this = this;
        var url = this.baseUrl + ("/unit-lists/" + unitListId + "/unit/" + unit);
        return this.http
            .delete(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            var result = res.json();
            // update map
            _this.map.set(unitListId, result);
            return result;
        })
            .catch(this.handleError);
    };
    UnitService.prototype.addUnitList = function (units, unitListId) {
        var _this = this;
        var url = this.baseUrl + ("/unit-lists?unitListId=" + unitListId + "&units=" + units);
        return this.http
            .post(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            var result = res.json();
            // update map
            _this.map.set(unitListId, units);
            return result;
        })
            .catch(this.handleError);
    };
    UnitService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    UnitService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], UnitService);
    return UnitService;
}());
exports.UnitService = UnitService;
//# sourceMappingURL=unit-service.js.map