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
var moment = require("moment");
var CredentialsService = /** @class */ (function () {
    function CredentialsService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = myGlobals.user_mgmt_endpoint;
        this.log_url = myGlobals.logstash_endpoint;
    }
    CredentialsService.prototype.post = function (credentials) {
        var url = this.url + "/login";
        return this.http
            .post(url, JSON.stringify(credentials), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CredentialsService.prototype.passwordRecoveryAction = function (forgotPasswordCredentials) {
        var url = this.url + "/password-recovery";
        return this.http
            .post(url, JSON.stringify(forgotPasswordCredentials), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then()
            .catch(this.handleError);
    };
    CredentialsService.prototype.resetPassword = function (forgotPasswordCredentials) {
        var url = this.url + "/reset-forgot-password";
        return this.http
            .post(url, JSON.stringify(forgotPasswordCredentials), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then()
            .catch(this.handleError);
    };
    CredentialsService.prototype.getVersionIdentity = function () {
        var url = myGlobals.user_mgmt_endpoint + "/info";
        return this.http
            .get(url, { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CredentialsService.prototype.getVersionCatalog = function () {
        var url = myGlobals.catalogue_endpoint + "/info";
        return this.http
            .get(url, { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CredentialsService.prototype.getVersionBP = function () {
        var url = myGlobals.bpe_endpoint + "/info";
        return this.http
            .get(url, { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CredentialsService.prototype.getVersionDataChannel = function () {
        var url = myGlobals.data_channel_endpoint + "/info";
        return this.http
            .get(url, { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CredentialsService.prototype.logUrl = function (log) {
        var index = "logstash";
        var type = "doc";
        if (myGlobals.config.loggingConfig && myGlobals.config.loggingConfig.index) {
            index = myGlobals.config.loggingConfig.index;
            if (index.indexOf("{DATE}") != -1) {
                var dateFormat = "YYYY-MM-DD";
                if (myGlobals.config.loggingConfig && myGlobals.config.loggingConfig.dateFormat) {
                    dateFormat = myGlobals.config.loggingConfig.dateFormat;
                }
                var isoDate = moment().utc().format(dateFormat);
                index = index.replace("{DATE}", isoDate);
            }
        }
        if (myGlobals.config.loggingConfig && myGlobals.config.loggingConfig.type) {
            type = myGlobals.config.loggingConfig.type;
        }
        var url = this.log_url + "/" + index + "/" + type + "/";
        return this.http
            .post(url, JSON.stringify(log), { headers: this.headers })
            .toPromise()
            .then()
            .catch(this.handleError);
    };
    CredentialsService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    CredentialsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CredentialsService);
    return CredentialsService;
}());
exports.CredentialsService = CredentialsService;
//# sourceMappingURL=credentials.service.js.map