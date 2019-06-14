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
var user_service_1 = require("../user.service");
var ng2_cookies_1 = require("ng2-cookies");
var myGlobals = require("../../globals");
var call_status_1 = require("../../common/call-status");
var router_1 = require("@angular/router");
var app_component_1 = require("../../app.component");
var CompanySettingsComponent = /** @class */ (function () {
    function CompanySettingsComponent(cookieService, userService, route, appComponent) {
        this.cookieService = cookieService;
        this.userService = userService;
        this.route = route;
        this.appComponent = appComponent;
        this.selectedTab = "COMPANY_DATA";
        this.initCallStatus = new call_status_1.CallStatus();
        this.profile_completeness = 0;
        this.profile_completeness_str = "0%";
        this.config = myGlobals.config;
        this.companyId = null;
        this.viewMode = "full";
    }
    CompanySettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initCallStatus.submit();
        this.route.queryParams.subscribe(function (params) {
            _this.companyId = params['id'];
            if (params['viewMode'])
                _this.viewMode = params['viewMode'];
            else
                _this.viewMode = "full";
            if (_this.companyId && _this.appComponent.checkRoles("pm"))
                _this.getCompanySettings(_this.companyId);
        });
        var userId = this.cookieService.get("user_id");
        if (!this.companyId) {
            this.userService.getSettingsForUser(userId).then(function (settings) {
                _this.processSettings(settings);
            })
                .catch(function (error) {
                _this.initCallStatus.error("Error while fetching company settings", error);
            });
        }
        else {
            this.getCompanySettings(this.companyId);
        }
    };
    CompanySettingsComponent.prototype.getCompanySettings = function (id) {
        var _this = this;
        this.userService.getSettingsForParty(id).then(function (settings) {
            _this.processSettings(settings);
        })
            .catch(function (error) {
            _this.initCallStatus.error("Error while fetching company settings", error);
        });
    };
    CompanySettingsComponent.prototype.processSettings = function (settings) {
        var _this = this;
        if (myGlobals.debug) {
            console.log("Fetched settings: " + JSON.stringify(settings));
        }
        this.userService.getProfileCompleteness(settings.companyID).then(function (completeness) {
            _this.profile_completeness = 0;
            _this.profile_completeness_str = "0%";
            if (completeness.qualityIndicator && completeness.qualityIndicator.length > 0) {
                for (var _i = 0, _a = completeness.qualityIndicator; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    if (indicator.qualityParameter == "PROFILE_COMPLETENESS") {
                        if (indicator.orderedQuantity && indicator.orderedQuantity.value) {
                            _this.profile_completeness = indicator.orderedQuantity.value;
                            _this.profile_completeness_str = Math.round(indicator.orderedQuantity.value * 100) + "%";
                        }
                    }
                }
            }
            _this.initCallStatus.callback("Profile completeness successfully fetched", true);
        })
            .catch(function (error) {
            _this.initCallStatus.error("Error while fetching profile completeness", error);
        });
        this.settings = settings;
        this.certificates = this.settings.certificates;
        if (this.settings.tradeDetails.ppapCompatibilityLevel && this.settings.tradeDetails.ppapCompatibilityLevel > 0)
            this.ppapLevel = this.settings.tradeDetails.ppapCompatibilityLevel;
        else
            this.ppapLevel = 0;
        this.certificates.sort(function (a, b) { return a.name.localeCompare(b.name); });
        this.certificates.sort(function (a, b) { return a.type.localeCompare(b.type); });
        this.initCallStatus.callback("Settings successfully fetched", true);
    };
    CompanySettingsComponent.prototype.onSelectTab = function (event) {
        event.preventDefault();
        this.selectedTab = event.target.id;
    };
    CompanySettingsComponent.prototype.onSettingsUpdated = function () {
        this.ngOnInit();
    };
    CompanySettingsComponent = __decorate([
        core_1.Component({
            selector: "company-settings",
            templateUrl: "./company-settings.component.html",
            styleUrls: ["./company-settings.component.css"]
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            app_component_1.AppComponent])
    ], CompanySettingsComponent);
    return CompanySettingsComponent;
}());
exports.CompanySettingsComponent = CompanySettingsComponent;
//# sourceMappingURL=company-settings.component.js.map