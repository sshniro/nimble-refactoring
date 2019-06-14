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
var globals_1 = require("../globals");
var user_service_1 = require("../user-mgmt/user.service");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var ng2_cookies_1 = require("ng2-cookies");
var utils_1 = require("../common/utils");
var catalogue_pagination_response_1 = require("./model/publish/catalogue-pagination-response");
var ubl_model_utils_1 = require("./model/ubl-model-utils");
var constants_1 = require("./model/constants");
var CatalogueService = /** @class */ (function () {
    function CatalogueService(http, userService, cookieService) {
        this.http = http;
        this.userService = userService;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.baseUrl = globals_1.catalogue_endpoint;
        // edit mode switch (observable as it is provided by parent to its grandchild components)
        this.editMode = new BehaviorSubject_1.BehaviorSubject(false);
        this.editModeObs = this.editMode.asObservable();
    }
    CatalogueService.prototype.getCatalogueResponse = function (userId, categoryName, searchText, limit, offset, sortOption, catalogueId) {
        var _this = this;
        if (categoryName === void 0) { categoryName = null; }
        if (searchText === void 0) { searchText = null; }
        if (limit === void 0) { limit = 0; }
        if (offset === void 0) { offset = 0; }
        if (sortOption === void 0) { sortOption = null; }
        if (catalogueId === void 0) { catalogueId = "default"; }
        return this.userService.getUserParty(userId).then(function (party) {
            var url = _this.baseUrl + ("/catalogue/" + ubl_model_utils_1.UBLModelUtils.getPartyId(party) + "/pagination/" + catalogueId + "?limit=" + limit + "&offset=" + offset);
            // if there is a selected category to filter the results, then add it to the url
            if (categoryName) {
                url += "&categoryName=" + categoryName;
            }
            // if there is a search text, append it to the end of the url. Also, default language id is added.
            if (searchText) {
                url += "&searchText=" + searchText + "&languageId=" + constants_1.DEFAULT_LANGUAGE();
            }
            if (sortOption) {
                url += "&sortOption=" + sortOption;
            }
            return _this.http
                .get(url, { headers: _this.getAuthorizedHeaders() })
                .toPromise()
                .then(function (res) {
                _this.catalogueResponse = res.json();
                return _this.catalogueResponse;
            })
                .catch(function (res) {
                if (res.status == 404) {
                    // no default catalogue yet, create new one            
                    _this.catalogueResponse = new catalogue_pagination_response_1.CataloguePaginationResponse(null, 0, []);
                    return _this.catalogueResponse;
                }
                else {
                    _this.handleError(res.getBody());
                }
            });
        });
    };
    CatalogueService.prototype.getFavouriteResponse = function (userId, limit, offset, sortOption) {
        var _this = this;
        if (limit === void 0) { limit = 0; }
        if (offset === void 0) { offset = 0; }
        if (sortOption === void 0) { sortOption = null; }
        return this.userService.getPerson(userId).then(function (person) {
            var url = _this.baseUrl + ("/cataloguelines?limit=" + limit + "&offset=" + offset);
            // if there is a selected category to filter the results, then add it to the url
            if (sortOption) {
                url += "&sortOption=" + sortOption;
            }
            if (person) {
                url += "&ids=" + person.favouriteProductID;
            }
            return _this.http
                .get(url, { headers: _this.getAuthorizedHeaders() })
                .toPromise()
                .then(function (res) {
                return res.json();
            })
                .catch(function (res) {
                if (res.status == 500) {
                    return [];
                }
                _this.handleError(res.getBody());
            });
        });
    };
    CatalogueService.prototype.getCatalogueLine = function (catalogueId, lineId) {
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/catalogueline/" + lineId);
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getCatalogueLineByHjid = function (hjId) {
        var url = this.baseUrl + ("/catalogueline/" + hjId);
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getCatalogueLines = function (catalogueId, lineIds) {
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/cataloguelines");
        // append catalogue line ids to the url
        var size = lineIds.length;
        for (var i = 0; i < size; i++) {
            if (i == 0) {
                url += "?lineIds=";
            }
            url += lineIds[i];
            if (i != size - 1) {
                url += ",";
            }
        }
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.addCatalogueLine = function (catalogueId, catalogueLineJson) {
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/catalogueline");
        return this.http
            .post(url, catalogueLineJson, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.updateCatalogueLine = function (catalogueId, catalogueLineJson) {
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/catalogueline");
        return this.http
            .put(url, catalogueLineJson, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.postCatalogue = function (catalogue) {
        var url = this.baseUrl + "/catalogue/ubl";
        return this.http
            .post(url, JSON.stringify(catalogue), { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.deleteCatalogue = function () {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.baseUrl + ("/catalogue/ubl/" + this.catalogueResponse.catalogueUuid);
        return this.http
            .delete(url, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.downloadTemplate = function (userId, categories, templateLanguage) {
        var _this = this;
        var taxonomyIds = "", categoryIds = "";
        for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
            var category = categories_1[_i];
            categoryIds += category.id + ",";
            taxonomyIds += category.taxonomyId + ",";
        }
        categoryIds = categoryIds.substr(0, categoryIds.length - 1);
        taxonomyIds = taxonomyIds.substr(0, taxonomyIds.length - 1);
        return this.userService.getUserParty(userId).then(function (party) {
            var token = 'Bearer ' + _this.cookieService.get("bearer_token");
            var url = _this.baseUrl + ("/catalogue/template?categoryIds=" + encodeURIComponent(categoryIds) + "&taxonomyIds=" + encodeURIComponent(taxonomyIds) + "&templateLanguage=" + templateLanguage);
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.setRequestHeader('Accept', 'application/octet-stream');
                xhr.setRequestHeader('Authorization', token);
                xhr.responseType = 'blob';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                            var blob = new Blob([xhr.response], { type: contentType });
                            var fileName = xhr.getResponseHeader("Content-Disposition").split("=")[1];
                            resolve({ fileName: fileName, content: blob });
                        }
                        else {
                            reject(xhr.status);
                        }
                    }
                };
                xhr.send();
            });
        });
    };
    CatalogueService.prototype.uploadTemplate = function (userId, template, uploadMode) {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        return this.userService.getUserParty(userId).then(function (party) {
            var url = _this.baseUrl + ("/catalogue/template/upload?partyId=" + ubl_model_utils_1.UBLModelUtils.getPartyId(party) + "&uploadMode=" + uploadMode);
            return new Promise(function (resolve, reject) {
                var formData = new FormData();
                formData.append("file", template, template.name);
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 || xhr.status === 201) {
                            //observer.next(JSON.parse(xhr.response));
                            resolve(xhr.response);
                        }
                        else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Authorization', token);
                xhr.send(formData);
            });
        });
    };
    CatalogueService.prototype.uploadZipPackage = function (pck) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.baseUrl + ("/catalogue/" + this.catalogueResponse.catalogueUuid + "/image/upload");
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append("package", pck, pck.name);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                var response = {};
                // the operation completed
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        response.status = xhr.status;
                        response.message = "Image package uploaded successfully.";
                        resolve(response);
                    }
                    else if (xhr.status == 504) {
                        response.status = xhr.status;
                        response.message = "Images uploaded but still being processed. They will be visible once the processing is done.";
                        resolve(response);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    };
    CatalogueService.prototype.exportCatalogue = function (catalogueUuid) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var languageId = constants_1.DEFAULT_LANGUAGE();
        var url = this.baseUrl + ("/catalogue/export?uuid=" + catalogueUuid + "&languageId=" + languageId);
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Accept', 'application/zip');
            xhr.setRequestHeader('Authorization', token);
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var contentType = 'application/zip';
                        var blob = new Blob([xhr.response], { type: contentType });
                        // file name
                        var fileName = catalogueUuid + '_' + new Date().toString();
                        resolve({ fileName: fileName, content: blob });
                    }
                    else {
                        reject(xhr.status);
                    }
                }
            };
            xhr.send();
        });
    };
    CatalogueService.prototype.deleteCatalogueLine = function (catalogueId, lineId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/catalogueline/" + lineId);
        return this.http
            .delete(url, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.deleteAllProductImagesInsideCatalogue = function (catalogueId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.baseUrl + ("/catalogue/" + catalogueId + "/delete-images");
        return this.http
            .get(url, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .catch(this.handleError);
    };
    CatalogueService.prototype.getBinaryObject = function (uri) {
        var url = this.baseUrl + ("/binary-content?uri=" + encodeURIComponent(uri));
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getBinaryObjects = function (uris) {
        var condition = "";
        for (var _i = 0, uris_1 = uris; _i < uris_1.length; _i++) {
            var uri = uris_1[_i];
            condition += uri + ",";
        }
        var url = this.baseUrl + ("/binary-contents?uris=" + encodeURIComponent(condition));
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getCatalogueIdsForParty = function () {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var partyId = this.cookieService.get("company_id");
        var url = this.baseUrl + ("/catalogue/ids/" + partyId);
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getCatalogueFromId = function (id) {
        var partyId = this.cookieService.get("company_id");
        var url = this.baseUrl + ("/catalogue/" + partyId + "/" + id + "/ubl");
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getCatalogueFromUuid = function (Uuid) {
        var url = this.baseUrl + ("/catalogue/ubl/" + Uuid);
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getTaxRates = function () {
        var url = this.baseUrl + "/catalogue/vat-rates";
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    CatalogueService.prototype.getAuthorizedHeaders = function () {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        return headers;
    };
    CatalogueService.prototype.resetData = function () {
        this.draftCatalogueLine = null;
    };
    CatalogueService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    // Editing functionality
    CatalogueService.prototype.editCatalogueLine = function (catalogueLine) {
        // Deep copy to guard original catalogueLine model
        this.draftCatalogueLine = utils_1.copy(catalogueLine);
        // save reference to original
        this.originalCatalogueLine = catalogueLine;
    };
    CatalogueService.prototype.setEditMode = function (editMode) {
        this.editMode.next(editMode);
    };
    CatalogueService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            user_service_1.UserService,
            ng2_cookies_1.CookieService])
    ], CatalogueService);
    return CatalogueService;
}());
exports.CatalogueService = CatalogueService;
//# sourceMappingURL=catalogue.service.js.map