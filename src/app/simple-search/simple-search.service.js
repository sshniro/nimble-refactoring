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
var operators_1 = require("rxjs/operators");
var ng2_cookies_1 = require("ng2-cookies");
var constants_1 = require("../catalogue/model/constants");
var globals_1 = require("../globals");
var SimpleSearchService = /** @class */ (function () {
    function SimpleSearchService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = myGlobals.indexing_service_endpoint;
        this.facetMin = myGlobals.facet_min;
        this.facetCount = myGlobals.facet_count;
        this.product_name = myGlobals.product_name;
        this.product_vendor_id = myGlobals.product_vendor + "." + myGlobals.product_vendor_id;
        this.product_vendor_name = myGlobals.product_vendor + "." + myGlobals.product_vendor_name;
        this.product_img = myGlobals.product_img;
        this.product_nonfilter_full = myGlobals.product_nonfilter_full;
        this.product_nonfilter_regex = myGlobals.product_nonfilter_regex;
        this.product_configurable = myGlobals.product_configurable;
        this.product_cat = myGlobals.product_cat;
        this.product_cat_mix = myGlobals.product_cat_mix;
    }
    SimpleSearchService.prototype.getUblProperties = function (facets) {
        var url = this.url + "/property/search";
        var searchObject = {};
        searchObject.rows = 2147483647;
        searchObject.start = 0;
        searchObject.q = "*:*";
        searchObject.fq = [];
        searchObject.fq.push("nameSpace:\"http://www.nimble-project.org/resource/ubl#\"");
        for (var _i = 0, facets_1 = facets; _i < facets_1.length; _i++) {
            var facet = facets_1[_i];
            //url += "&localName="+encodeURIComponent(facet);
            // searchObject.fq.push("localName:" + facet)
        }
        return this.http
            .post(url, searchObject, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getFields = function () {
        var url = this.url + "/item/fields";
        // const url = `${this.url}/select?q=*:*&rows=0&wt=csv`;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getCompFields = function () {
        var url = this.url + "/party/fields";
        // const url = `${this.url}/select?q=*:*&rows=0&wt=csv`;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.get = function (query, facets, facetQueries, page, rows, sort, cat, catID, search_index) {
        var queryRes;
        var searchObject = {};
        if (search_index == "Categories") {
            var classLabel = myGlobals.class_label;
            var querySettings = {
                "fields": ["commodityClassficationUri", classLabel],
                "boosting": false,
                "boostingFactors": {}
            };
            queryRes = this.buildQueryString(query, querySettings, true, false);
        }
        else {
            queryRes = this.buildQueryString(query, myGlobals.query_settings, true, false);
            searchObject.sort = [];
            searchObject.sort.push(sort);
        }
        query = queryRes.queryStr;
        var url = this.url + "/item/search";
        searchObject.rows = rows;
        searchObject.start = page - 1;
        searchObject.q = query;
        for (var _i = 0, facets_2 = facets; _i < facets_2.length; _i++) {
            var facet = facets_2[_i];
            if (facet.length === 0 || !facet.trim()) {
            }
            else {
                if (searchObject.facet == null) {
                    searchObject.facet = {};
                    searchObject.facet.field = [];
                    searchObject.facet.minCount = this.facetMin;
                    searchObject.facet.limit = this.facetCount;
                }
                searchObject.facet.field.push(facet);
            }
        }
        for (var _a = 0, facetQueries_1 = facetQueries; _a < facetQueries_1.length; _a++) {
            var facetQuery = facetQueries_1[_a];
            if (searchObject.fq == null) {
                searchObject.fq = [];
            }
            searchObject.fq.push(facetQuery);
        }
        if (cat != "") {
            var add_url = this.product_cat_mix + ":\"" + catID + "\"";
            if (searchObject.fq == null) {
                searchObject.fq = [];
            }
            searchObject.fq.push(add_url);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getComp = function (query, facets, facetQueries, page, rows, sort) {
        var queryRes;
        queryRes = this.buildQueryString(query, myGlobals.query_settings_comp, true, false);
        query = queryRes.queryStr;
        var url = this.url + "/party/search";
        var searchObject = {};
        searchObject.rows = rows;
        searchObject.start = page - 1;
        searchObject.q = query;
        searchObject.sort = [];
        searchObject.sort.push(sort);
        for (var _i = 0, facets_3 = facets; _i < facets_3.length; _i++) {
            var facet = facets_3[_i];
            if (facet.length === 0 || !facet.trim()) {
            }
            else {
                if (searchObject.facet == null) {
                    searchObject.facet = {};
                    searchObject.facet.field = [];
                    searchObject.facet.minCount = this.facetMin;
                    searchObject.facet.limit = this.facetCount;
                }
                searchObject.facet.field.push(facet);
            }
        }
        for (var _a = 0, facetQueries_2 = facetQueries; _a < facetQueries_2.length; _a++) {
            var facetQuery = facetQueries_2[_a];
            if (searchObject.fq == null) {
                searchObject.fq = [];
            }
            searchObject.fq.push(facetQuery);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getSuggestions = function (query, item_field, search_index) {
        var _this = this;
        var querySettings = {
            "fields": [item_field],
            "boosting": false,
            "boostingFactors": {}
        };
        var queryRes = this.buildQueryString(query, querySettings, true, true);
        var url = this.url + "/item/search";
        if (search_index == "Categories") {
            url = this.url + "/class/search";
        }
        var searchObject = {};
        searchObject.rows = 0;
        searchObject.q = queryRes.queryStr;
        searchObject.facet = {};
        searchObject.facet.field = [];
        searchObject.facet.limit = -1;
        for (var i = 0; i < queryRes.queryFields.length; i++) {
            searchObject.facet.field.push(queryRes.queryFields[i]);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .pipe(operators_1.map(function (response) {
            return _this.getSuggestionArray(response.json(), query, queryRes.queryArr, queryRes.queryFields);
        }));
    };
    SimpleSearchService.prototype.getCompSuggestions = function (query, item_field) {
        var _this = this;
        var querySettings = {
            "fields": [item_field],
            "boosting": false,
            "boostingFactors": {}
        };
        var queryRes = this.buildQueryString(query, querySettings, true, true);
        var url = this.url + "/party/search";
        var searchObject = {};
        searchObject.rows = 0;
        searchObject.q = queryRes.queryStr;
        searchObject.facet = {};
        searchObject.facet.field = [];
        searchObject.facet.limit = -1;
        for (var i = 0; i < queryRes.queryFields.length; i++) {
            searchObject.facet.field.push(queryRes.queryFields[i]);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .pipe(operators_1.map(function (response) {
            return _this.getSuggestionArray(response.json(), query, queryRes.queryArr, queryRes.queryFields);
        }));
    };
    SimpleSearchService.prototype.getClassSuggestions = function (query, field, ontology) {
        var _this = this;
        var querySettings = {
            "fields": [field],
            "boosting": false,
            "boostingFactors": {}
        };
        var queryRes = this.buildQueryString(query, querySettings, true, true);
        var url = this.url + "/class/search";
        var searchObject = {};
        searchObject.rows = 0;
        searchObject.q = "(" + queryRes.queryStr + ")";
        if (ontology != "") {
            var ontologyPrefixSimpleArr = ontology.split("/");
            var ontologyPrefixSimple = ontologyPrefixSimpleArr[ontologyPrefixSimpleArr.length - 1];
            ontologyPrefixSimple.replace("#", "");
            searchObject.q += " AND nameSpace:*" + ontologyPrefixSimple + "*";
        }
        searchObject.facet = {};
        searchObject.facet.field = [];
        searchObject.facet.limit = -1;
        for (var i = 0; i < queryRes.queryFields.length; i++) {
            searchObject.facet.field.push(queryRes.queryFields[i]);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .pipe(operators_1.map(function (response) {
            return _this.getSuggestionArray(response.json(), query, queryRes.queryArr, queryRes.queryFields);
        }));
    };
    SimpleSearchService.prototype.getSuggestionArray = function (res, q, qA, fields) {
        var suggestions = [];
        var suggestionsTmp = [];
        var suggestionsCount = [];
        if (q.length >= 2 && res.facets) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (res.facets[field] && res.facets[field].entry && res.facets[field].entry.length > 0) {
                    for (var _i = 0, _a = res.facets[field].entry; _i < _a.length; _i++) {
                        var sug = _a[_i];
                        if (sug["label"]) {
                            var label = sug["label"];
                            if (suggestionsTmp.indexOf(label) == -1) {
                                suggestionsTmp.push(label);
                                suggestionsCount.push({
                                    "label": label,
                                    "count": 0
                                });
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < suggestionsCount.length; i++) {
                var fullLabel = suggestionsCount[i].label.toLowerCase();
                ;
                for (var j = 0; j < qA.length; j++) {
                    var idx = fullLabel.indexOf(qA[j].toLowerCase());
                    if (idx != -1) {
                        if (j == 0)
                            suggestionsCount[i].count += 9999;
                        else {
                            suggestionsCount[i].count += (qA[j].length) * 50;
                            suggestionsCount[i].count += (qA.length - j) * 20;
                            suggestionsCount[i].count -= Math.min(Math.round(idx / 2), 20);
                        }
                    }
                }
            }
            suggestionsCount = suggestionsCount.sort(function (a, b) {
                return b.count - a.count;
            });
            for (var i = 0; i < Math.min(suggestionsCount.length, 10); i++) {
                if (suggestionsCount[i].count > 0)
                    suggestions.push(suggestionsCount[i].label);
            }
        }
        return suggestions;
    };
    SimpleSearchService.prototype.buildQueryString = function (query, qS, full, allLang) {
        if (query == "*") {
            return {
                "queryStr": "*",
                "queryArr": [],
                "queryFields": []
            };
        }
        query = query.replace(/[!'()]/g, '');
        query = query.trim();
        var splitQuery = [];
        if (full)
            splitQuery = query.split(" ");
        var queryArr = [query];
        var queryStr = "";
        var queryFields = [];
        var negativeBoosts = [];
        for (var i = 0; i < qS.fields.length; i++) {
            var field = qS.fields[i];
            if (field.indexOf("{LANG}") != -1) {
                queryFields.push(field.replace("{LANG}", "en"));
                if (qS.boosting && qS.boostingFactors && qS.boostingFactors[field]) {
                    qS.boostingFactors[field.replace("{LANG}", "en")] = qS.boostingFactors[field];
                    if (qS.boostingFactors[field] < 0)
                        negativeBoosts.push(field.replace("{LANG}", "en"));
                }
                if (allLang) {
                    for (var j = 0; j < constants_1.LANGUAGES.length; j++) {
                        if (constants_1.LANGUAGES[j] != "en") {
                            queryFields.push(field.replace("{LANG}", constants_1.LANGUAGES[j]));
                            if (qS.boosting && qS.boostingFactors && qS.boostingFactors[field]) {
                                qS.boostingFactors[field.replace("{LANG}", constants_1.LANGUAGES[j])] = qS.boostingFactors[field];
                                if (qS.boostingFactors[field] < 0)
                                    negativeBoosts.push(field.replace("{LANG}", constants_1.LANGUAGES[j]));
                            }
                        }
                    }
                }
                else if (constants_1.DEFAULT_LANGUAGE() != "en") {
                    queryFields.push(field.replace("{LANG}", constants_1.DEFAULT_LANGUAGE()));
                    if (qS.boosting && qS.boostingFactors && qS.boostingFactors[field]) {
                        qS.boostingFactors[field.replace("{LANG}", constants_1.DEFAULT_LANGUAGE())] = qS.boostingFactors[field];
                        if (qS.boostingFactors[field] < 0)
                            negativeBoosts.push(field.replace("{LANG}", constants_1.DEFAULT_LANGUAGE()));
                    }
                }
            }
            else {
                queryFields.push(field);
                if (qS.boosting && qS.boostingFactors && qS.boostingFactors[field] && qS.boostingFactors[field] < 0) {
                    negativeBoosts.push(field);
                }
            }
        }
        for (var i = 0; i < splitQuery.length; i++) {
            splitQuery[i] = splitQuery[i].replace(/ /g, '');
            if (splitQuery[i].length >= 2) {
                if (queryArr.indexOf(splitQuery[i]) == -1)
                    queryArr.push(splitQuery[i]);
                var allLower = splitQuery[i].toLowerCase();
                if (queryArr.indexOf(allLower) == -1)
                    queryArr.push(allLower);
                var allUpper = splitQuery[i].toUpperCase();
                if (queryArr.indexOf(allUpper) == -1)
                    queryArr.push(allUpper);
                var firstCapital = allLower.substring(0, 1).toUpperCase() + "" + allLower.substring(1, allLower.length);
                if (queryArr.indexOf(firstCapital) == -1)
                    queryArr.push(firstCapital);
            }
        }
        for (var i = 0; i < queryArr.length; i++) {
            for (var j = 0; j < queryFields.length; j++) {
                if (queryFields[j] != "STANDARD") {
                    queryStr += queryFields[j] + ":*" + queryArr[i] + "*";
                }
                else {
                    if (negativeBoosts.length > 0) {
                        queryStr += "(*" + queryArr[i] + "* ";
                        for (var k = 0; k < negativeBoosts.length; k++) {
                            queryStr += "AND ((" + negativeBoosts[k] + ":* -*" + queryArr[i] + "*) OR (-" + negativeBoosts[k] + ":[* TO *] AND *:*)) ";
                        }
                        queryStr += ")";
                    }
                    else
                        queryStr += "*" + queryArr[i] + "*";
                }
                if (qS.boosting && queryFields[j] != globals_1.class_label) {
                    queryStr += "^" + Math.abs(qS.boostingFactors[queryFields[j]]);
                }
                queryStr += " ";
            }
        }
        return {
            "queryStr": queryStr,
            "queryArr": queryArr,
            "queryFields": queryFields
        };
    };
    SimpleSearchService.prototype.checkField = function (field) {
        if (field == this.product_name || field == this.product_img || field == this.product_vendor_id || field == this.product_cat || field == this.product_cat_mix) {
            return false;
        }
        for (var _i = 0, _a = this.product_nonfilter_full; _i < _a.length; _i++) {
            var filter = _a[_i];
            if (field == filter)
                return false;
        }
        for (var _b = 0, _c = this.product_nonfilter_regex; _b < _c.length; _b++) {
            var filter = _c[_b];
            if (field.search(filter) != -1)
                return false;
        }
        for (var _d = 0, _e = this.product_configurable; _d < _e.length; _d++) {
            var filter = _e[_d];
            if (field.search(filter) != -1)
                return false;
        }
        return true;
    };
    SimpleSearchService.prototype.getHeadersWithBasicAuthorization = function () {
        var _this = this;
        var headers = new http_1.Headers();
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        headers.append('Authorization', "Basic " + btoa("admin:*platform*"));
        return headers;
    };
    SimpleSearchService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    SimpleSearchService.prototype.getCompanies = function (query, facets, facetQueries) {
        query = query.replace(/[!'()]/g, '');
        // var start = page*10-10;
        var url = this.url + "/party/search";
        var searchObject = {};
        searchObject.rows = facetQueries.length;
        searchObject.q = query;
        var full_url = url + "";
        for (var _i = 0, facets_4 = facets; _i < facets_4.length; _i++) {
            var facet = facets_4[_i];
            if (facet.length === 0 || !facet.trim()) { }
            else {
                //full_url += "&facet.field=" + facet;
                if (searchObject.facet == null) {
                    searchObject.facet = {};
                    searchObject.facet.field = [];
                    searchObject.facet.minCount = this.facetMin;
                    searchObject.facet.limit = this.facetCount;
                }
                searchObject.facet.field.push(facet);
            }
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getFavouriteSearch = function (query, facets, page, sortType) {
        query = query;
        var url = this.url + "/item/search";
        var searchObject = {};
        searchObject.rows = 10;
        searchObject.start = page - 1;
        searchObject.q = query;
        searchObject.sort = [];
        if (sortType === "PRICE_HIGH_TO_LOW") {
            searchObject.sort.push("eUR_price desc");
        }
        else {
            searchObject.sort.push("eUR_price asc");
        }
        for (var _i = 0, facets_5 = facets; _i < facets_5.length; _i++) {
            var facet = facets_5[_i];
            if (facet.length === 0 || !facet.trim()) { }
            else {
                if (searchObject.facet == null) {
                    searchObject.facet = {};
                    searchObject.facet.field = [];
                    searchObject.facet.minCount = this.facetMin;
                    searchObject.facet.limit = this.facetCount;
                }
                searchObject.facet.field.push(facet);
            }
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService.prototype.getCompanyBasedProductsAndServices = function (query, facets, facetQueries, page, cat, catID) {
        // let queryRes = this.buildQueryString(query,myGlobals.query_settings,true,false);
        // query = queryRes.queryStr;
        var url = this.url + "/item/search";
        var searchObject = {};
        searchObject.rows = 10;
        searchObject.start = page - 1;
        searchObject.q = query;
        for (var _i = 0, facets_6 = facets; _i < facets_6.length; _i++) {
            var facet = facets_6[_i];
            if (facet.length === 0 || !facet.trim()) { }
            else {
                if (searchObject.facet == null) {
                    searchObject.facet = {};
                    searchObject.facet.field = [];
                    searchObject.facet.minCount = this.facetMin;
                    searchObject.facet.limit = this.facetCount;
                }
                searchObject.facet.field.push(facet);
            }
        }
        for (var _a = 0, facetQueries_3 = facetQueries; _a < facetQueries_3.length; _a++) {
            var facetQuery = facetQueries_3[_a];
            if (searchObject.fq == null) {
                searchObject.fq = [];
            }
            searchObject.fq.push(facetQuery);
        }
        if (cat != "") {
            var add_url = this.product_cat_mix + ":\"" + catID + "\"";
            if (searchObject.fq == null) {
                searchObject.fq = [];
            }
            searchObject.fq.push(add_url);
        }
        return this.http
            .post(url, searchObject, { headers: this.getHeadersWithBasicAuthorization() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    SimpleSearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], SimpleSearchService);
    return SimpleSearchService;
}());
exports.SimpleSearchService = SimpleSearchService;
//# sourceMappingURL=simple-search.service.js.map