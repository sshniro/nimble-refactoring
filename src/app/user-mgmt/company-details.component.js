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
var user_service_1 = require("./user.service");
var router_1 = require("@angular/router");
var ng2_cookies_1 = require("ng2-cookies");
var myGlobals = require("../globals");
var moment = require("moment");
var call_status_1 = require("../common/call-status");
var company_settings_1 = require("./model/company-settings");
var app_component_1 = require("../app.component");
var utils_1 = require("../common/utils");
var CompanyDetailsComponent = /** @class */ (function () {
    function CompanyDetailsComponent(cookieService, userService, appComponent, route, router) {
        this.cookieService = cookieService;
        this.userService = userService;
        this.appComponent = appComponent;
        this.route = route;
        this.router = router;
        this.details = null;
        this.hideTitle = false;
        this.platformManagerMode = true;
        this.managementMode = false;
        this.imgEndpoint = myGlobals.user_mgmt_endpoint + "/company-settings/image/";
        this.initCallStatus = new call_status_1.CallStatus();
        this.vatCallStatus = new call_status_1.CallStatus();
        this.party = {};
        this.selectValueOfTextObject = utils_1.selectValueOfTextObject;
        this.getLink = utils_1.sanitizeLink;
    }
    CompanyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.details) {
            this.initCallStatus.submit();
            this.route.queryParams.subscribe(function (params) {
                var viewMode = params['viewMode'];
                var id = params['id'];
                if (viewMode && viewMode == 'mgmt') {
                    _this.managementMode = true;
                }
                if (id) {
                    _this.party.partyId = id;
                    _this.userService.getSettingsForParty(id).then(function (details) {
                        if (myGlobals.debug) {
                            console.log("Fetched details: " + JSON.stringify(details));
                        }
                        _this.details = details;
                        _this.initCallStatus.callback("Details successfully fetched", true);
                    })
                        .catch(function (error) {
                        _this.initCallStatus.error("Error while fetching company details", error);
                    });
                }
            });
        }
        else {
            this.party.partyId = this.details.companyID;
        }
    };
    CompanyDetailsComponent.prototype.validateVAT = function () {
        var _this = this;
        this.vatCallStatus.submit();
        this.userService.validateVAT(this.details.details.vatNumber)
            .then(function (response) {
            _this.vatCallStatus.callback("VAT checked", true);
            setTimeout(function () {
                if (response.status == "success") {
                    if (response.valid) {
                        if (response.company_name) {
                            alert("The VAT is valid and registered for " + response.company_name + ".");
                        }
                        else
                            alert("The VAT is valid.");
                    }
                    else {
                        alert("The VAT is invalid.");
                    }
                }
                else {
                    alert("The VAT is invalid.");
                }
            }, 50);
        })
            .catch(function (error) {
            _this.vatCallStatus.error("Error while checking VAT", error);
        });
    };
    CompanyDetailsComponent.prototype.formatDate = function (date) {
        return moment(date).format("YYYY-MM-DD");
    };
    CompanyDetailsComponent.prototype.openSearchPage = function () {
        var fq = "manufacturer.legalName:\"" + utils_1.selectValueOfTextObject(this.details.details.legalName) + "\"";
        this.router.navigate(['/simple-search'], {
            queryParams: {
                q: "*",
                fq: encodeURIComponent(fq),
                p: 1,
                searchContext: null,
                cat: "",
                catID: "",
                sIdx: "Products",
                sTop: "prod"
            }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyDetailsComponent.prototype, "details", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompanyDetailsComponent.prototype, "hideTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CompanyDetailsComponent.prototype, "platformManagerMode", void 0);
    CompanyDetailsComponent = __decorate([
        core_1.Component({
            selector: "company-details",
            templateUrl: "./company-details.component.html"
        }),
        __metadata("design:paramtypes", [ng2_cookies_1.CookieService,
            user_service_1.UserService,
            app_component_1.AppComponent,
            router_1.ActivatedRoute,
            router_1.Router])
    ], CompanyDetailsComponent);
    return CompanyDetailsComponent;
}());
exports.CompanyDetailsComponent = CompanyDetailsComponent;
//# sourceMappingURL=company-details.component.js.map