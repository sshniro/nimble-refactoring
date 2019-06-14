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
/**
 * Created by suat on 17-May-17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var myGlobals = require("../../globals");
var utils_1 = require("../../common/utils");
var ng2_cookies_1 = require("ng2-cookies");
var CategoryService = /** @class */ (function () {
    function CategoryService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.baseUrl = myGlobals.catalogue_endpoint;
        this.indexingBaseUrl = myGlobals.indexing_service_endpoint;
        this.selectedCategories = [];
    }
    CategoryService.prototype.getCategoriesByName = function (keyword, taxonomyId, isLogistics) {
        var url = this.baseUrl + "/taxonomies/" + taxonomyId + "/categories?name=" + keyword + "&forLogistics=" + isLogistics;
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.getCategoriesByIds = function (codes) {
        if (!codes) {
            return Promise.resolve([]);
        }
        var customCategoryCodes = [];
        var customCategories = [];
        var categories = [];
        // remove default category
        codes = codes.filter(function (cat) {
            return cat.listID != 'Default';
        });
        customCategoryCodes = codes.filter(function (cat) {
            return cat.listID == 'Custom';
        });
        // get non-custom categories
        codes = codes.filter(function (cat) {
            return cat.listID != 'Custom';
        });
        if (codes.length > 0) {
            var url = this.baseUrl;
            var categoryIds = '';
            var taxonomyIds = '';
            var i = 0;
            for (; i < codes.length - 1; i++) {
                categoryIds += encodeURIComponent(codes[i].value) + ",";
                taxonomyIds += codes[i].listID + ",";
            }
            categoryIds += encodeURIComponent(codes[i].value);
            taxonomyIds += codes[i].listID;
            url += "/categories?taxonomyIds=" + taxonomyIds + "&categoryIds=" + categoryIds;
            return this.http
                .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
                .toPromise()
                .then(function (res) {
                categories = categories.concat(res.json());
                return categories;
            })
                .catch(this.handleError);
        }
        else {
            return Promise.resolve(categories);
        }
    };
    /**
     * Gets labels for the categories specified with the uris. The result is a map of uri->label map.
     * @param uris
     */
    CategoryService.prototype.getCategories = function (uris) {
        var url = this.indexingBaseUrl + "/class/search";
        var query = "";
        for (var _i = 0, uris_1 = uris; _i < uris_1.length; _i++) {
            var uri = uris_1[_i];
            query += "id:\"" + uri + "\" OR ";
        }
        if (query != "")
            query = query.substring(0, query.length - 4);
        var searchObject = {};
        searchObject.rows = 99999;
        searchObject.q = query;
        return this.http
            .post(url, searchObject, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CategoryService.prototype.getCategory = function (category) {
        var url = this.baseUrl + "/categories?taxonomyIds=" + category.taxonomyId + "&categoryIds=" + encodeURIComponent(category.id);
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json()[0];
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.getCategoriesForIds = function (taxonomyIds, categoryIds) {
        // create the url
        var taxonomyIdSize = taxonomyIds.length;
        var categoryIdSize = categoryIds.length;
        var taxonomyIdsParam = "";
        var categoryIdsParam = "";
        taxonomyIds.forEach(function (value, index) {
            if (index === taxonomyIdSize - 1)
                taxonomyIdsParam += value;
            else
                taxonomyIdsParam += value + ",";
        });
        categoryIds.forEach(function (value, index) {
            if (index === categoryIdSize - 1)
                categoryIdsParam += value;
            else
                categoryIdsParam += value + ",";
        });
        var url = this.baseUrl + "/categories?taxonomyIds=" + taxonomyIdsParam + "&categoryIds=" + encodeURIComponent(categoryIdsParam);
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.getParentCategories = function (category) {
        var url = this.baseUrl + "/taxonomies/" + category.taxonomyId + "/categories/tree?categoryId=" + encodeURIComponent(category.id);
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.addSelectedCategory = function (category) {
        // Only add if category is not null and doesn't exist in selected categories
        if (category != null && this.selectedCategories.findIndex(function (c) { return c.id == category.id; }) == -1) {
            this.selectedCategories.push(category);
            utils_1.sortCategories(this.selectedCategories);
        }
    };
    CategoryService.prototype.getRootCategories = function (taxonomyId) {
        var url = this.baseUrl + "/taxonomies/" + taxonomyId + "/root-categories";
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.getChildrenCategories = function (category) {
        var url = this.baseUrl + "/taxonomies/" + category.taxonomyId + "/categories/children-categories?categoryId=" + encodeURIComponent(category.id);
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.getAvailableTaxonomies = function () {
        var url = this.baseUrl + "/taxonomies/id";
        return this.http
            .get(url, { headers: utils_1.getAuthorizedHeaders(this.cookieService) })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CategoryService.prototype.resetSelectedCategories = function () {
        this.selectedCategories.splice(0, this.selectedCategories.length);
    };
    CategoryService.prototype.resetData = function () {
        this.resetSelectedCategories();
    };
    CategoryService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    CategoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            ng2_cookies_1.CookieService])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map