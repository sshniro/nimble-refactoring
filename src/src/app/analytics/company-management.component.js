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
var utils_1 = require("../common/utils");
var constants_1 = require("./constants");
var CompanyManagementComponent = /** @class */ (function () {
    function CompanyManagementComponent(analyticsService) {
        this.analyticsService = analyticsService;
        this.registeredCompaniesPage = null;
        this.registeredCompaniesCallStatus = new call_status_1.CallStatus();
        this.unverifiedCompaniesPage = null;
        this.unverifiedCompaniesCallStatus = new call_status_1.CallStatus();
        this.getNameOfTheCompany = utils_1.selectPartyName;
        this.size = 10;
        this.showOverview = true;
        this.COMPANY_LIST_SORT_OPTIONS = constants_1.COMPANY_LIST_SORT_OPTIONS;
        this.sortOptionForUnverifiedCompanies = this.COMPANY_LIST_SORT_OPTIONS[0].name;
        this.sortOptionForRegisteredCompanies = this.COMPANY_LIST_SORT_OPTIONS[0].name;
    }
    CompanyManagementComponent.prototype.ngOnInit = function () {
        this.registeredCompaniesCallStatus.submit();
        this.unverifiedCompaniesCallStatus.submit();
        this.updateUnverifiedCompanies(1, this.COMPANY_LIST_SORT_OPTIONS[0].sortBy, this.COMPANY_LIST_SORT_OPTIONS[0].orderBy);
        this.updateRegisteredCompanies(1, this.COMPANY_LIST_SORT_OPTIONS[0].sortBy, this.COMPANY_LIST_SORT_OPTIONS[0].orderBy);
        this.selectedTab = this.showOverview ? "UNVERIFIED" : "VERIFIED";
        //this.updateRegisteredCompanies(0);
    };
    CompanyManagementComponent.prototype.updateRegisteredCompanies = function (requestedPage, sortBy, orderBy) {
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
    CompanyManagementComponent.prototype.onRegisteredCompaniesPageChange = function (newPage) {
        this.registeredCompaniesCallStatus.submit();
        if (newPage && newPage !== this.registeredCompaniesPage.number) {
            var selectedSortOption = this.getSelectedSortOption(this.sortOptionForRegisteredCompanies);
            this.updateRegisteredCompanies(newPage, selectedSortOption.sortBy, selectedSortOption.orderBy);
        }
    };
    CompanyManagementComponent.prototype.updateUnverifiedCompanies = function (requestedPage, sortBy, orderBy) {
        var _this = this;
        this.analyticsService
            .getUnverifiedCompanies(requestedPage, sortBy, orderBy)
            .then(function (res) {
            _this.unverifiedCompaniesCallStatus.callback("Successfully loaded unverified companies", true);
            _this.unverifiedCompaniesPage = res;
            _this.unverifiedCompaniesPage.number += 1; // number has offset of 1
        })
            .catch(function (error) {
            _this.unverifiedCompaniesCallStatus.error("Error while loading unverified companies", error);
        });
    };
    CompanyManagementComponent.prototype.verifyCompany = function (company) {
        var _this = this;
        if (confirm("Are you sure that you want to verify this company?")) {
            this.unverifiedCompaniesCallStatus.submit();
            this.registeredCompaniesCallStatus.submit();
            this.analyticsService.verifyCompany(company.hjid)
                .then(function (res) {
                _this.unverifiedCompaniesPage.content = _this.unverifiedCompaniesPage.content.filter(function (c) { return c.hjid !== company.hjid; });
                _this.updateUnverifiedCompanies(_this.unverifiedCompaniesPage.number);
                _this.updateRegisteredCompanies(_this.registeredCompaniesPage.number);
            })
                .catch(function (error) {
                _this.unverifiedCompaniesCallStatus.error("Error while verifing company", error);
            });
        }
    };
    CompanyManagementComponent.prototype.rejectCompany = function (company) {
        var _this = this;
        if (confirm("Are you sure that you want to reject this company?")) {
            this.unverifiedCompaniesCallStatus.submit();
            this.analyticsService.deleteCompany(company.hjid)
                .then(function (res) {
                _this.unverifiedCompaniesPage.content = _this.unverifiedCompaniesPage.content.filter(function (c) { return c.hjid !== company.hjid; });
                _this.updateUnverifiedCompanies(_this.unverifiedCompaniesPage.number);
            })
                .catch(function (error) {
                _this.unverifiedCompaniesCallStatus.error("Error while rejecting company", error);
            });
        }
    };
    CompanyManagementComponent.prototype.onUnverifiedPageChange = function (newPage) {
        this.unverifiedCompaniesCallStatus.submit();
        if (newPage && newPage !== this.unverifiedCompaniesPage.number) {
            var selectedSortOption = this.getSelectedSortOption(this.sortOptionForUnverifiedCompanies);
            this.updateUnverifiedCompanies(newPage, selectedSortOption.sortBy, selectedSortOption.orderBy);
        }
    };
    CompanyManagementComponent.prototype.sortUnverifiedCompanyList = function () {
        var selectedSortOption = this.getSelectedSortOption(this.sortOptionForUnverifiedCompanies);
        this.updateUnverifiedCompanies(1, selectedSortOption.sortBy, selectedSortOption.orderBy);
        this.unverifiedCompaniesCallStatus.submit();
        // this.unverifiedCompaniesPage = null;
    };
    CompanyManagementComponent.prototype.sortRegisteredCompanyList = function () {
        var selectedSortOption = this.getSelectedSortOption(this.sortOptionForRegisteredCompanies);
        this.updateRegisteredCompanies(1, selectedSortOption.sortBy, selectedSortOption.orderBy);
        this.registeredCompaniesCallStatus.submit();
        // this.registeredCompaniesPage = null;
    };
    CompanyManagementComponent.prototype.getSelectedSortOption = function (selectedName) {
        var selectedSortOption = constants_1.COMPANY_LIST_SORT_OPTIONS.filter(function (i) { return i.name === selectedName; });
        return selectedSortOption[0];
    };
    CompanyManagementComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompanyManagementComponent.prototype, "showOverview", void 0);
    CompanyManagementComponent = __decorate([
        core_1.Component({
            selector: "company-management",
            templateUrl: "./company-management.component.html",
            styleUrls: ["./company-management.component.css"]
        }),
        __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
    ], CompanyManagementComponent);
    return CompanyManagementComponent;
}());
exports.CompanyManagementComponent = CompanyManagementComponent;
//# sourceMappingURL=company-management.component.js.map