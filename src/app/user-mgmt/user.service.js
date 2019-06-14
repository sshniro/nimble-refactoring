"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng2_cookies_1 = require("ng2-cookies");
require("rxjs/add/operator/toPromise");
var myGlobals = require("../globals");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var user_role_1 = require("./model/user-role");
var constants_1 = require("../catalogue/model/constants");
var unit_service_1 = require("../common/unit-service");
var constants_2 = require("../common/constants");
var UserService = /** @class */ (function () {
    function UserService(unitService, http, cookieService) {
        this.unitService = unitService;
        this.http = http;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = myGlobals.user_mgmt_endpoint;
    }
    UserService.prototype.setWelcomeFlag = function (flag) {
        var url = this.url + "/set-welcome-info/" + flag;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify({}), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    UserService.prototype.registerUser = function (user) {
        var url = this.url + "/register/user";
        return this.http
            .post(url, JSON.stringify(user), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.registerCompany = function (company) {
        var url = this.url + "/register/company";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(company), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getCompanyMemberList = function (partyId) {
        var ownerCompanyId = this.cookieService.get("company_id");
        if (partyId != null) {
            ownerCompanyId = partyId;
        }
        var url = this.url + "/company_members/" + ownerCompanyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.deleteInvite = function (email) {
        var encodedMail = encodeURIComponent(email);
        var url = this.url + "/invitations?username=" + encodedMail;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .delete(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.inviteCompany = function (invitation) {
        var url = this.url + "/send_invitation";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(invitation), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    UserService.prototype.getParty = function (partyId) {
        var url = this.url + "/party/" + partyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) {
            var party = res.json();
            ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(party);
            return Promise.resolve(party);
        })
            .catch(this.handleError);
    };
    UserService.prototype.getPerson = function (personId) {
        var url = this.url + "/person/" + personId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUserParty = function (userId) {
        var _this = this;
        if (this.userParty != null) {
            return Promise.resolve(this.userParty);
        }
        var url = this.url + "/party_by_person/" + userId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) {
            _this.userParty = res.json()[0];
            ubl_model_utils_1.UBLModelUtils.removeHjidFieldsFromObject(_this.userParty);
            return Promise.resolve(_this.userParty);
        })
            .catch(this.handleError);
    };
    UserService.prototype.getSettingsForProduct = function (line) {
        return this.getSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(line.goodsItem.item.manufacturerParty))
            .then(function (settings) {
            return settings;
        });
    };
    UserService.prototype.getSettingsForUser = function (userId) {
        var _this = this;
        return this.getUserParty(userId).then(function (party) { return _this.getSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(party)); });
    };
    UserService.prototype.getSettingsForParty = function (partyId) {
        return Promise.all([
            this.getSettingsPromise(partyId),
            this.getCompanyNegotiationSettingsForParty(partyId)
        ]).then(function (_a) {
            var settings = _a[0], negotiationSettings = _a[1];
            settings.negotiationSettings = negotiationSettings;
            return settings;
        });
    };
    UserService.prototype.getProfileCompleteness = function (partyId) {
        var url = this.url + "/company-settings/" + partyId + "/completeness";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getSettingsPromise = function (partyId) {
        var url = this.url + "/company-settings/" + partyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.resetPassword = function (credentials) {
        var url = this.url + "/reset-password";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(credentials), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    UserService.prototype.getUserRoles = function () {
        var url = this.url + "/roles";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) {
            var roles = [];
            var resultJson = res.json();
            for (var roleId in resultJson)
                roles.push(new user_role_1.UserRole(roleId, resultJson[roleId]));
            return Promise.resolve(roles);
        })
            .catch(this.handleError);
    };
    UserService.prototype.setRoles = function (email, roleIDs) {
        var encodedMail = encodeURIComponent(email);
        var url = this.url + "/roles/user?username=" + encodedMail;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .post(url, JSON.stringify(roleIDs), { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.putSettings = function (rawSettings, userId) {
        var _this = this;
        var settings = __assign({}, rawSettings);
        delete settings.negotiationSettings;
        return this.getUserParty(userId).then(function (party) {
            var url = _this.url + "/company-settings/" + ubl_model_utils_1.UBLModelUtils.getPartyId(party);
            var token = 'Bearer ' + _this.cookieService.get("bearer_token");
            var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
            return _this.http
                .put(url, settings, { headers: headers_token, withCredentials: true })
                .toPromise()
                .then(function (response) { return response.json(); })
                .catch(_this.handleError);
        });
    };
    UserService.prototype.putSettingsForParty = function (rawSettings, partyId) {
        var settings = __assign({}, rawSettings);
        delete settings.negotiationSettings;
        var url = this.url + "/company-settings/" + partyId;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .put(url, settings, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.validateVAT = function (vat) {
        var vat_url = vat.replace(/ /g, "");
        var url = this.url + "/company-settings/vat/" + vat_url;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getPrefCat = function (userId) {
        return this.getSettingsForUser(userId).then(function (settings) { return settings.preferredProductCategories; });
    };
    UserService.prototype.getRecCat = function (userId) {
        return this.getSettingsForUser(userId).then(function (settings) { return settings.recentlyUsedProductCategories; });
    };
    UserService.prototype.togglePrefCat = function (userId, cat) {
        var _this = this;
        return this.getSettingsForUser(userId).then(function (settings) {
            var pref_cat = settings.preferredProductCategories;
            var cat_idx = pref_cat.indexOf(cat);
            if (cat_idx == -1)
                pref_cat.push(cat);
            else
                pref_cat.splice(cat_idx, 1);
            settings.preferredProductCategories = pref_cat;
            return _this.putSettings(settings, userId).then(function (response) { return response.preferredProductCategories; });
        });
    };
    UserService.prototype.addRecCat = function (userId, cat) {
        var _this = this;
        return this.getSettingsForUser(userId).then(function (settings) {
            var rec_cat = settings.recentlyUsedProductCategories;
            var rec_cat_comp = rec_cat.slice();
            for (var i = 0; i < rec_cat_comp.length; i++) {
                var rec_cat_comp_arr = rec_cat_comp[i].split("::");
                rec_cat_comp[i] = rec_cat_comp_arr[0] + "::" + rec_cat_comp_arr[1] + "::" + rec_cat_comp_arr[2] + "::" + rec_cat_comp_arr[3];
            }
            for (var i = 0; i < cat.length; i++) {
                var cat_arr = cat[i].split("::");
                var cat_comp = cat_arr[0] + "::" + cat_arr[1] + "::" + cat_arr[2] + "::" + cat_arr[3];
                var cat_idx = rec_cat_comp.indexOf(cat_comp);
                if (cat_idx == -1)
                    rec_cat.push(cat[i]);
                else
                    rec_cat[cat_idx] = cat[i];
            }
            if (rec_cat.length > 10) {
                rec_cat.sort(function (a, b) { return b.split("::")[2].localeCompare(a.split("::")[2]); });
                rec_cat.sort(function (a, b) { return a.split("::")[4].localeCompare(b.split("::")[4]); });
                rec_cat.splice(0, rec_cat.length - 10);
            }
            settings.recentlyUsedProductCategories = rec_cat;
            return _this.putSettings(settings, userId).then(function (response) { return response.recentlyUsedProductCategories; });
        });
    };
    UserService.prototype.removeRecCat = function (userId, cat) {
        var _this = this;
        return this.getSettingsForUser(userId).then(function (settings) {
            var rec_cat = settings.recentlyUsedProductCategories;
            var cat_idx = rec_cat.indexOf(cat);
            if (cat_idx != -1)
                rec_cat.splice(cat_idx, 1);
            settings.recentlyUsedProductCategories = rec_cat;
            return _this.putSettings(settings, userId).then(function (response) { return response.recentlyUsedProductCategories; });
        });
    };
    UserService.prototype.saveCert = function (file, name, description, type, partyId) {
        var url = this.url + "/company-settings/" + partyId + "/certificate?name=" + name + "&description=" + description + "&type=" + type;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Authorization': token });
        var form_data = new FormData();
        form_data.append('file', file);
        return this.http
            .post(url, form_data, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService.prototype.saveImage = function (file, isLogo, partyId) {
        var url = this.url + "/company-settings/" + partyId + "/image?isLogo=" + isLogo;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Authorization': token });
        var form_data = new FormData();
        form_data.append('file', file);
        return this.http
            .post(url, form_data, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService.prototype.deleteImage = function (id, partyId) {
        var url = this.url + "/company-settings/" + partyId + "/image/" + id;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .delete(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService.prototype.downloadCert = function (id) {
        var url = this.url + "/company-settings/certificate/" + id;
        window.open(url, "_blank");
    };
    UserService.prototype.deleteCert = function (id, partyId) {
        var url = this.url + "/company-settings/" + partyId + "/certificate/" + id;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .delete(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService.prototype.getCompanyNegotiationSettingsForUser = function (userId) {
        var _this = this;
        return this.getUserParty(userId).then(function (party) { return _this.getCompanyNegotiationSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(party)); });
    };
    UserService.prototype.getCompanyNegotiationSettingsForProduct = function (line) {
        return this.getCompanyNegotiationSettingsForParty(ubl_model_utils_1.UBLModelUtils.getPartyId(line.goodsItem.item.manufacturerParty));
    };
    UserService.prototype.getCompanyNegotiationSettingsForParty = function (partyId) {
        var _this = this;
        var url = this.url + "/company-settings/" + partyId + "/negotiation/";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .get(url, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function (res) {
            return _this.sanitizeNegotiationSettings(res.json());
        })
            .catch(this.handleError);
    };
    UserService.prototype.sanitizeNegotiationSettings = function (settings) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        if (!(settings.deliveryPeriodUnits.length === 0)) return [3 /*break*/, 2];
                        _b = (_a = (_g = settings.deliveryPeriodUnits).push).apply;
                        _c = [_g];
                        return [4 /*yield*/, this.unitService.getCachedUnitList(constants_2.deliveryPeriodUnitListId)];
                    case 1:
                        _b.apply(_a, _c.concat([_m.sent()]));
                        _m.label = 2;
                    case 2:
                        if (settings.deliveryPeriodRanges.length === 0) {
                            settings.deliveryPeriodRanges.push({ start: 24, end: 1344 });
                            settings.deliveryPeriodRanges.push({ start: 1, end: 40 });
                            settings.deliveryPeriodRanges.push({ start: 1, end: 56 });
                            settings.deliveryPeriodRanges.push({ start: 0, end: 8 });
                            settings.deliveryPeriodRanges.push({ start: 1, end: 12 });
                        }
                        while (settings.deliveryPeriodRanges.length > 5) {
                            settings.deliveryPeriodRanges.pop();
                        }
                        if (!(settings.warrantyPeriodUnits.length === 0)) return [3 /*break*/, 4];
                        _e = (_d = (_h = settings.warrantyPeriodUnits).push).apply;
                        _f = [_h];
                        return [4 /*yield*/, this.unitService.getCachedUnitList(constants_2.warrantyPeriodUnitListId)];
                    case 3:
                        _e.apply(_d, _f.concat([_m.sent()]));
                        _m.label = 4;
                    case 4:
                        if (settings.warrantyPeriodRanges.length === 0) {
                            settings.warrantyPeriodRanges.push({ start: 0, end: 24 });
                            settings.warrantyPeriodRanges.push({ start: 0, end: 2 });
                        }
                        while (settings.warrantyPeriodRanges.length > 2) {
                            settings.warrantyPeriodRanges.pop();
                        }
                        if (settings.incoterms.length === 0) {
                            (_j = settings.incoterms).push.apply(_j, constants_1.INCOTERMS);
                        }
                        if (settings.paymentMeans.length === 0) {
                            (_k = settings.paymentMeans).push.apply(_k, constants_1.PAYMENT_MEANS);
                        }
                        if (settings.paymentTerms.length === 0) {
                            (_l = settings.paymentTerms).push.apply(_l, ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings());
                        }
                        return [2 /*return*/, settings];
                }
            });
        });
    };
    UserService.prototype.putCompanyNegotiationSettings = function (settings, partyId) {
        var url = this.url + "/company-settings/" + partyId + "/negotiation";
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .put(url, settings, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService.prototype.resetData = function () {
        this.userParty = null;
    };
    UserService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    UserService.prototype.putUserFavourite = function (uuid, status) {
        if (status === void 0) { status = 1; }
        var userId = this.cookieService.get("user_id");
        var url = this.url + "/favourite/" + userId + "?status=" + status;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers_token = new http_1.Headers({ 'Content-Type': 'application/json', 'Authorization': token });
        return this.http
            .put(url, uuid, { headers: headers_token, withCredentials: true })
            .toPromise()
            .then(function () { })
            .catch(this.handleError);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [unit_service_1.UnitService,
            http_1.Http,
            ng2_cookies_1.CookieService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map