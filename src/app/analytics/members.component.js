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
var analytics_service_1 = require("./analytics.service");
var call_status_1 = require("../common/call-status");
var myGlobals = require("../globals");
var utils_1 = require("../common/utils");
var app_component_1 = require("../app.component");
var router_1 = require("@angular/router");
var constants_1 = require("./constants");
var MembersComponent = /** @class */ (function () {
    function MembersComponent(analyticsService, appComponent, route) {
        this.analyticsService = analyticsService;
        this.appComponent = appComponent;
        this.route = route;
        this.config = myGlobals.config;
        this.registeredCompaniesPage = null;
        this.registeredCompaniesCallStatus = new call_status_1.CallStatus();
        this.imgEndpoint = myGlobals.user_mgmt_endpoint + "/company-settings/image/";
        this.size = 16;
        this.getNameOfTheCompany = utils_1.selectPartyName;
        this.getLink = utils_1.sanitizeLink;
        this.COMPANY_LIST_SORT_OPTIONS = constants_1.COMPANY_LIST_SORT_OPTIONS;
        this.sortOptionForVerifiedCompanies = this.COMPANY_LIST_SORT_OPTIONS[0].name;
    }
    MembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params["size"]) {
                _this.size = params["size"];
            }
            else {
                _this.size = 16;
            }
        });
        this.registeredCompaniesCallStatus.submit();
        this.updateRegisteredCompanies(1, this.COMPANY_LIST_SORT_OPTIONS[0].sortBy, this.COMPANY_LIST_SORT_OPTIONS[0].orderBy);
    };
    MembersComponent.prototype.updateRegisteredCompanies = function (requestedPage, sortBy, orderBy) {
        var _this = this;
        this.analyticsService
            .getVerifiedCompanies(requestedPage, this.size, sortBy, orderBy)
            .then(function (res) {
            _this.registeredCompaniesCallStatus.callback("Successfully loaded registered companies", true);
            _this.registeredCompaniesPage = res;
            _this.registeredCompaniesPage.number += 1; // number has offset of 1
        })
            .catch(function (error) {
            _this.registeredCompaniesCallStatus.error("Error while loading registered companies page", error);
        });
    };
    MembersComponent.prototype.getCompanyLogo = function (ref) {
        var href = "assets/empty_img.png";
        if (ref) {
            var id = -1;
            for (var i = 0; i < ref.length; i++) {
                if (ref[i].documentType && ref[i].hjid && ref[i].documentType == "CompanyLogo")
                    id = ref[i].hjid;
            }
            if (id != -1)
                href = this.imgEndpoint + "" + id;
        }
        return href;
    };
    MembersComponent.prototype.onRegisteredCompaniesPageChange = function (newPage) {
        var _this = this;
        this.registeredCompaniesCallStatus.submit();
        if (newPage && newPage !== this.registeredCompaniesPage.number) {
            var selectedSortOption = constants_1.COMPANY_LIST_SORT_OPTIONS.filter(function (i) { return i.name === _this.sortOptionForVerifiedCompanies; });
            this.updateRegisteredCompanies(newPage, selectedSortOption[0].sortBy, selectedSortOption[0].orderBy);
        }
    };
    MembersComponent.prototype.sortRegisteredCompanyList = function () {
        var _this = this;
        var selectedSortOption = constants_1.COMPANY_LIST_SORT_OPTIONS.filter(function (i) { return i.name === _this.sortOptionForVerifiedCompanies; });
        this.updateRegisteredCompanies(1, selectedSortOption[0].sortBy, selectedSortOption[0].orderBy);
        this.registeredCompaniesCallStatus.submit();
        this.registeredCompaniesPage = null;
    };
    MembersComponent = __decorate([
        core_1.Component({
            selector: "members-info",
            templateUrl: "./members.component.html",
            styleUrls: ["./members.component.css"]
        }),
        __metadata("design:paramtypes", [analytics_service_1.AnalyticsService,
            app_component_1.AppComponent,
            router_1.ActivatedRoute])
    ], MembersComponent);
    return MembersComponent;
}());
exports.MembersComponent = MembersComponent;
//# sourceMappingURL=members.component.js.map