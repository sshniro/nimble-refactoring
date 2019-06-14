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
var myGlobals = require("../../globals");
var ng2_cookies_1 = require("ng2-cookies");
var utils_1 = require("../../common/utils");
var DocumentService = /** @class */ (function () {
    function DocumentService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = myGlobals.bpe_endpoint;
        this.mapOfDocument = new Map();
    }
    DocumentService.prototype.getCachedDocument = function (documentID) {
        var _this = this;
        if (this.mapOfDocument.has(documentID)) {
            return Promise.resolve(utils_1.copy(this.mapOfDocument.get(documentID)));
        }
        else {
            return this.getDocumentJsonContent(documentID).then(function (document) {
                _this.mapOfDocument.set(documentID, document);
                return utils_1.copy(document);
            });
        }
    };
    DocumentService.prototype.updateCachedDocument = function (documentID, document) {
        this.mapOfDocument.set(documentID, document);
    };
    DocumentService.prototype.getDocumentJsonContent = function (documentId) {
        var url = this.url + "/document/json/" + documentId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DocumentService.prototype.getItemInformationRequest = function (itemInformationResponse) {
        return this.getDocumentJsonContent(itemInformationResponse.itemInformationRequestDocumentReference.id);
    };
    DocumentService.prototype.getRequestForQuotation = function (quotation) {
        return this.getDocumentJsonContent(quotation.requestForQuotationDocumentReference.id);
    };
    DocumentService.prototype.getInitialDocument = function (processVariables) {
        var id = null;
        for (var _i = 0, processVariables_1 = processVariables; _i < processVariables_1.length; _i++) {
            var variable = processVariables_1[_i];
            if (variable.name == "initialDocumentID") {
                id = variable.value;
            }
        }
        if (id) {
            return this.getCachedDocument(id);
        }
        else {
            return null;
        }
    };
    DocumentService.prototype.getResponseDocument = function (processVariables) {
        var id = null;
        for (var _i = 0, processVariables_2 = processVariables; _i < processVariables_2.length; _i++) {
            var variable = processVariables_2[_i];
            if (variable.name == "responseDocumentID") {
                id = variable.value;
            }
        }
        if (id) {
            return this.getCachedDocument(id);
        }
        else {
            return null;
        }
    };
    DocumentService.prototype.getAuthorizedHeaders = function () {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        return headers;
    };
    DocumentService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    DocumentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
//# sourceMappingURL=document-service.js.map