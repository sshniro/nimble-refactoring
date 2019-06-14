"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var SearchContextService = /** @class */ (function () {
    function SearchContextService() {
    }
    SearchContextService.prototype.clearSearchContext = function () {
        this.targetPartyRole = null;
        this.associatedProcessType = null;
        this.associatedProcessMetadata = null;
        this.precedingGroupId = null;
    };
    SearchContextService.prototype.setSearchContext = function (targetPartyRole, associatedProcessType, associatedProcessMetadata, precedingGroupId) {
        this.targetPartyRole = targetPartyRole;
        this.associatedProcessType = associatedProcessType;
        this.associatedProcessMetadata = associatedProcessMetadata;
        this.precedingGroupId = precedingGroupId;
    };
    SearchContextService.prototype.getAssociatedProcessType = function () {
        return this.associatedProcessType;
    };
    SearchContextService.prototype.getAssociatedProcessMetadata = function () {
        return this.associatedProcessMetadata;
    };
    SearchContextService.prototype.getPrecedingGroupId = function () {
        return this.precedingGroupId;
    };
    SearchContextService = __decorate([
        core_1.Injectable()
    ], SearchContextService);
    return SearchContextService;
}());
exports.SearchContextService = SearchContextService;
//# sourceMappingURL=search-context.service.js.map