"use strict";
/**
 * This is the Service File for the Explorative Search Component.
 * We Inject a simple HTTP GET Service which will perform a GET on
 * the User's keyword input to the backend server.
 * And return the response in JSON for further parsing.
 */
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
// import {Observable} from 'rxjs/Observable';
// import {SearchItem} from './model/SearchItem';
var ExplorativeSearchService = /** @class */ (function () {
    function ExplorativeSearchService(http) {
        this.http = http;
        this.langUrl = myGlobals.languageEndPoint;
        this.url = myGlobals.endpoint;
        this.logicalUrl = myGlobals.logicalViewEndpoint;
        this.propEndPoint = myGlobals.propertyEndPoint;
        this.sparqlEndPoint = myGlobals.sparqlEndPoint;
        this.sparqlOptionEndPoint = myGlobals.sparqlOptionalSelectEndPoint;
        // SQP Endpoints
        this.sqpButtonEndPoint = myGlobals.spqButton;
        this.obsPropertySQP = myGlobals.obs_propFromConcept;
        this.obsPropertyValuesSQP = myGlobals.obs_propValueFromConcept;
        this.referenceFromConcept = myGlobals.referenceFromConcept;
        this.sqpOrangeConcept = myGlobals.sqpOrangeConcept;
        this.headers = new http_1.Headers();
    }
    ExplorativeSearchService.prototype.getLanguageSupport = function () {
        return this.http.get(this.langUrl)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    // This is where the HTTP GET service is performed
    // for keyword search from user
    ExplorativeSearchService.prototype.searchData = function (term, lang, user_id) {
        this.userLang = lang;
        // console.log('Search term for language: ' + lang + ' and used backend url ' + this.url);
        var input = { 'keyword': term, 'language': this.userLang, 'userID': user_id };
        return this.http.get(this.url + "?inputAsJson=" + JSON.stringify(input))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /*getLogicalView(term: Object): Promise<any> {
        console.log('getlogicalview', term['language']);
        return this.http.get(`${this.logicalUrl}?inputAsJson=${JSON.stringify(term)}`)
            .toPromise()
            .then(res => res.json())
            .catch(err => console.log(err));
    }*/
    ExplorativeSearchService.prototype.getLogicalView = function (term) {
        // console.log('From Service(logicalView', JSON.stringify(term));
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.logicalUrl, term, new http_1.RequestOptions({ headers: this.headers }))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.getPropertyValues = function (term) {
        // console.log('propvalue', term['language']);
        return this.http.get(this.propEndPoint + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.getTableValues = function (term) {
        // console.log('gettableview', term['language']);
        return this.http.get(this.sparqlEndPoint + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.getOptionalSelect = function (term) {
        // console.log('getoptselect', term['language']);
        return this.http.get(this.sparqlOptionEndPoint + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //
    // Semantic Query Patterns API Call Handlers
    //
    ExplorativeSearchService.prototype.getSQPButton = function (term) {
        return this.http.get(this.sqpButtonEndPoint + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.searchForProperty = function (term) {
        return this.http.get(this.obsPropertySQP + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json().outputForPropertiesFromConcept; });
    };
    ExplorativeSearchService.prototype.searchForPropertyValues = function (term) {
        return this.http.get(this.obsPropertyValuesSQP + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.getReferencesFromConcept = function (term) {
        return this.http.get(this.referenceFromConcept + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ExplorativeSearchService.prototype.getPropertyValuesFromOrangeGroup = function (term) {
        return this.http.get(this.sqpOrangeConcept + "?inputAsJson=" + JSON.stringify(term))
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
     * Error Handling for API Calls
     * @param error
     * @returns {Promise<any>}
     */
    ExplorativeSearchService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ExplorativeSearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ExplorativeSearchService);
    return ExplorativeSearchService;
}());
exports.ExplorativeSearchService = ExplorativeSearchService;
//# sourceMappingURL=explorative-search.service.js.map