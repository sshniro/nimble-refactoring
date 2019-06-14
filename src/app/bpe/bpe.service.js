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
var bp_data_service_1 = require("./bp-view/bp-data-service");
var ng2_cookies_1 = require("ng2-cookies");
var search_context_service_1 = require("../simple-search/search-context.service");
var BPEService = /** @class */ (function () {
    function BPEService(http, bpDataService, searchContextService, cookieService) {
        this.http = http;
        this.bpDataService = bpDataService;
        this.searchContextService = searchContextService;
        this.cookieService = cookieService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = myGlobals.bpe_endpoint;
    }
    BPEService.prototype.startBusinessProcess = function (piim) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/start";
        if (this.bpDataService.bpActivityEvent.containerGroupId != null) {
            url += '?gid=' + this.bpDataService.bpActivityEvent.containerGroupId;
        }
        if (this.bpDataService.precedingProcessId != null) {
            if (this.bpDataService.bpActivityEvent.containerGroupId != null) {
                url += '&';
            }
            else {
                url += '?';
            }
            url += 'precedingPid=' + this.bpDataService.precedingProcessId;
        }
        if (this.bpDataService.bpActivityEvent.collaborationGroupId != null) {
            if (this.bpDataService.bpActivityEvent.containerGroupId != null || this.bpDataService.precedingProcessId != null) {
                url += '&';
            }
            else {
                url += "?";
            }
            url += 'collaborationGID=' + this.bpDataService.bpActivityEvent.collaborationGroupId;
        }
        if (this.searchContextService.getPrecedingGroupId() != null) {
            if (this.bpDataService.bpActivityEvent.containerGroupId != null || this.bpDataService.precedingProcessId != null || this.bpDataService.bpActivityEvent.collaborationGroupId != null) {
                url += '&';
            }
            else {
                url += '?';
            }
            url += 'precedingGid=' + this.searchContextService.getPrecedingGroupId();
            // if we have a precedingGroupId,then we need also a precedingProcessId
            if (this.bpDataService.precedingProcessId == null) {
                url += '&precedingPid=' + this.searchContextService.getAssociatedProcessMetadata().processId;
            }
        }
        return this.http
            .post(url, JSON.stringify(piim), { headers: headers })
            .toPromise()
            .then(function (res) {
            if (myGlobals.debug)
                console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    BPEService.prototype.continueBusinessProcess = function (piim) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/continue";
        if (this.bpDataService.bpActivityEvent.containerGroupId != null) {
            url += '?gid=' + this.bpDataService.bpActivityEvent.containerGroupId;
        }
        if (this.bpDataService.bpActivityEvent.collaborationGroupId != null) {
            if (this.bpDataService.bpActivityEvent.containerGroupId != null) {
                url += '&collaborationGID=' + this.bpDataService.bpActivityEvent.collaborationGroupId;
            }
            else {
                url += '?collaborationGID=' + this.bpDataService.bpActivityEvent.collaborationGroupId;
            }
        }
        return this.http
            .post(url, JSON.stringify(piim), { headers: headers })
            .toPromise()
            .then(function (res) {
            if (myGlobals.debug)
                console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    BPEService.prototype.cancelBusinessProcess = function (id) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/processInstance/" + id + "/cancel";
        return this.http
            .post(url, null, { headers: headers })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.cancelCollaboration = function (groupId) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/process-instance-groups/" + groupId + "/cancel";
        return this.http
            .post(url, null, { headers: headers })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.updateBusinessProcess = function (content, processID, processInstanceID) {
        var url = this.url + "/processInstance?processID=" + processID + "&processInstanceID=" + processInstanceID + "&creatorUserID=" + this.cookieService.get("user_id");
        return this.http
            .patch(url, content, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getProcessInstanceGroup = function (groupId) {
        var url = this.url + "/process-instance-groups/" + groupId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getProcessDetailsHistory = function (id) {
        var url = this.url + "/rest/engine/default/history/variable-instance?processInstanceIdIn=" + id;
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getActionRequiredCounter = function (companyId) {
        return Promise.all([
            this.getActionRequiredBuyer(companyId),
            this.getActionRequiredSeller(companyId)
        ]).then(function (_a) {
            var buyer = _a[0], seller = _a[1];
            return { "buyer": buyer, "seller": seller };
        });
    };
    BPEService.prototype.getActionRequiredBuyer = function (partyId) {
        var url = this.url + "/statistics/total-number/business-process/action-required?archived=false&role=buyer&partyId=" + partyId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getActionRequiredSeller = function (partyId) {
        var url = this.url + "/statistics/total-number/business-process/action-required?archived=false&role=seller&partyId=" + partyId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getLastActivityForProcessInstance = function (processInstanceId) {
        var url = this.url + "/rest/engine/default/history/activity-instance?processInstanceId=" + processInstanceId + "&sortBy=startTime&sortOrder=desc&maxResults=1";
        return this.http
            .get(url, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json()[0]; })
            .catch(this.handleError);
    };
    BPEService.prototype.getProcessInstanceGroupFilters = function (partyId, collaborationRole, archived, products, categories, partners, status) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/process-instance-groups/filters?partyId=" + partyId + "&collaborationRole=" + collaborationRole + "&archived=" + archived;
        if (products.length > 0) {
            url += '&relatedProducts=' + this.stringifyArray(products);
        }
        if (categories.length > 0) {
            url += '&relatedProductCategories=' + this.stringifyArray(categories);
        }
        if (partners.length > 0) {
            url += '&tradingPartnerIDs=' + this.stringifyArray(partners);
        }
        if (status.length > 0) {
            url += '&status=' + this.stringifyArray(status);
        }
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getCollaborationGroups = function (partyId, collaborationRole, page, limit, archived, products, categories, partners, status) {
        var offset = page * limit;
        var url = this.url + "/collaboration-groups?partyId=" + partyId + "&collaborationRole=" + collaborationRole + "&offset=" + offset + "&limit=" + limit + "&archived=" + archived;
        if (products.length > 0) {
            url += '&relatedProducts=' + this.stringifyArray(products);
        }
        if (categories.length > 0) {
            url += '&relatedProductCategories=' + this.stringifyArray(categories);
        }
        if (partners.length > 0) {
            url += '&tradingPartnerIDs=' + this.stringifyArray(partners);
        }
        if (status.length > 0) {
            url += '&status=' + this.stringifyArray(status);
        }
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getDashboardProcessInstanceDetails = function (processInstanceId) {
        var url = this.url + "/processInstance/" + processInstanceId + "/details";
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.deleteProcessInstanceGroup = function (groupId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/process-instance-groups/" + groupId;
        return this.http
            .delete(url, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.updateCollaborationGroupName = function (groupId, groupName) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/collaboration-groups/" + groupId + "?groupName=" + groupName;
        return this.http
            .patch(url, null, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.deleteCollaborationGroup = function (groupId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/collaboration-groups/" + groupId;
        return this.http
            .delete(url, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.archiveCollaborationGroup = function (groupId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/collaboration-groups/" + groupId + "/archive";
        return this.http
            .post(url, null, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.restoreCollaborationGroup = function (groupId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/collaboration-groups/" + groupId + "/restore";
        return this.http
            .post(url, null, { headers: new http_1.Headers({ "Authorization": token }) })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.constructContractForProcess = function (processInstancesId) {
        var url = this.url + "/contracts?processInstanceId=" + processInstancesId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.downloadContractBundle = function (id) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var url = this.url + "/contracts/create-bundle?orderId=" + id;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Accept', 'application/zip');
            xhr.setRequestHeader("Authorization", token);
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var contentType = 'application/zip';
                        var blob = new Blob([xhr.response], { type: contentType });
                        resolve({ fileName: "Contract Bundle.zip", content: blob });
                    }
                    else {
                        reject(xhr.status);
                    }
                }
            };
            xhr.send();
        });
    };
    BPEService.prototype.getTermsAndConditions = function (orderId, buyerPartyId, sellerPartyId, rfqId, incoterms, tradingTerm) {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        var url;
        if (orderId) {
            url = this.url + "/contracts/terms-and-conditions?orderId=" + orderId + "&sellerPartyId=" + sellerPartyId + "&buyerPartyId=" + buyerPartyId + "&incoterms=" + (incoterms == null ? "" : incoterms) + "&tradingTerm=" + tradingTerm;
        }
        else if (rfqId) {
            url = this.url + "/contracts/terms-and-conditions?rfqId=" + rfqId + "&sellerPartyId=" + sellerPartyId + "&buyerPartyId=" + buyerPartyId + "&incoterms=" + (incoterms == null ? "" : incoterms) + "&tradingTerm=" + tradingTerm;
        }
        else {
            url = this.url + "/contracts/terms-and-conditions?sellerPartyId=" + sellerPartyId + "&buyerPartyId=" + buyerPartyId + "&incoterms=" + (incoterms == null ? "" : incoterms) + "&tradingTerm=" + tradingTerm;
        }
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getOriginalOrderForProcess = function (processId) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/process-instance-groups/order-document?processInstanceId=" + processId;
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json() || null; })
            .catch(function () { return null; });
    };
    BPEService.prototype.getRatings = function (partyId) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/ratingsAndReviews?partyId=" + partyId;
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getRatingsSummary = function (partyId) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/ratingsSummary?partyId=" + partyId;
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.postRatings = function (partyId, processInstanceId, ratings, reviews) {
        var headers = this.getAuthorizedHeaders();
        var url = this.url + "/ratingsAndReviews?partyId=" + partyId + "&processInstanceID=" + processInstanceId + "&ratings=" + encodeURIComponent(JSON.stringify(ratings)) + "&reviews=" + encodeURIComponent(JSON.stringify(reviews));
        return this.http
            .post(url, null, { headers: headers })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    BPEService.prototype.ratingExists = function (processInstanceId, partyId) {
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Accept': 'text/plain', 'Authorization': token });
        var url = this.url + "/processInstance/" + processInstanceId + "/isRated?partyId=" + partyId;
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    BPEService.prototype.saveFrameContract = function (digitalAgreement) {
        var url = this.url + "/contract/digital-agreement";
        return this.http
            .post(url, digitalAgreement, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.updateFrameContract = function (digitalAgreement) {
        var url = this.url + "/contract/digital-agreement/" + digitalAgreement.id;
        return this.http
            .put(url, digitalAgreement, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getFrameContract = function (sellerId, buyerId, productId) {
        var url = this.url + "/contract/digital-agreement?sellerId=" + sellerId + "&buyerId=" + buyerId + "&productId=" + productId;
        return this.http
            .get(url, { headers: this.getAuthorizedHeaders() })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    BPEService.prototype.getAuthorizedHeaders = function () {
        var _this = this;
        var token = 'Bearer ' + this.cookieService.get("bearer_token");
        var headers = new http_1.Headers({ 'Accept': 'application/json', 'Authorization': token });
        this.headers.keys().forEach(function (header) { return headers.append(header, _this.headers.get(header)); });
        return headers;
    };
    BPEService.prototype.stringifyArray = function (values) {
        var paramVal = '';
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            paramVal += value + ',';
        }
        paramVal = paramVal.substring(0, paramVal.length - 1);
        return paramVal;
    };
    BPEService.prototype.handleError = function (error) {
        if (error.status == 404) {
            // ignore
            return null;
        }
        else {
            return Promise.reject(error.message || error);
        }
    };
    BPEService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            bp_data_service_1.BPDataService,
            search_context_service_1.SearchContextService,
            ng2_cookies_1.CookieService])
    ], BPEService);
    return BPEService;
}());
exports.BPEService = BPEService;
//# sourceMappingURL=bpe.service.js.map