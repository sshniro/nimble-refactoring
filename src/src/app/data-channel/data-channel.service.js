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
var DataChannelService = /** @class */ (function () {
    function DataChannelService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.url = myGlobals.data_channel_endpoint;
    }
    DataChannelService.prototype.getChannelConfig = function (channelID) {
        var url = this.url + "/channel/" + channelID;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .get(url, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.getChannelMessages = function (channelID) {
        var url = this.url + "/channel/" + channelID + "/messages";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .get(url, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.channelsForBusinessProcess = function (processID) {
        var url = this.url + "/channel/business-process/" + processID;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .get(url, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.getAssociatedSensors = function (channelID) {
        var url = this.url + "/channel/" + channelID + "/sensors";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .get(url, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.addSensor = function (channelID, sensor) {
        var url = this.url + "/channel/" + channelID + "/sensors";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .post(url, sensor, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.removeSensor = function (channelID, sensor) {
        var url = this.url + "/channel/" + channelID + "/sensors/" + sensor.id;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .delete(url, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataChannelService.prototype.isBusinessProcessAttached = function (processID) {
        return this.channelsForBusinessProcess(processID)
            .then(function (res) { return Object.keys(res).length > 0; });
    };
    DataChannelService.prototype.deleteChannel = function (channelID) {
        var url = this.url + "/channel/" + channelID;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        return this.http
            .delete(url, { headers: headers, withCredentials: true })
            .toPromise()
            .catch(this.handleError);
    };
    DataChannelService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    DataChannelService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], DataChannelService);
    return DataChannelService;
}());
exports.DataChannelService = DataChannelService;
//# sourceMappingURL=data-channel.service.js.map