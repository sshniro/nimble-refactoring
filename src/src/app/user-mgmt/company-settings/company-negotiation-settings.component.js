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
var constants_1 = require("../../catalogue/model/constants");
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
var call_status_1 = require("../../common/call-status");
var selected_terms_1 = require("../selected-terms");
var utils_1 = require("../../common/utils");
var company_settings_1 = require("../model/company-settings");
var CompanyNegotiationSettingsComponent = /** @class */ (function () {
    function CompanyNegotiationSettingsComponent(userService) {
        this.userService = userService;
        this.presentationMode = "edit";
        this.settings = null;
        this.PAYMENT_MEANS_LEFT = constants_1.PAYMENT_MEANS.filter(function (_, i) { return i % 2 === 0; });
        this.PAYMENT_MEANS_RIGHT = constants_1.PAYMENT_MEANS.filter(function (_, i) { return i % 2 === 1; });
        this.PAYMENT_TERMS = ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings();
        this.PAYMENT_TERMS_LEFT = this.PAYMENT_TERMS.filter(function (_, i) { return i % 2 === 0; });
        this.PAYMENT_TERMS_RIGHT = this.PAYMENT_TERMS.filter(function (_, i) { return i % 2 === 1; });
        this.INCOTERMS_LEFT = constants_1.INCOTERMS.filter(function (_, i) { return i % 2 === 1; });
        this.INCOTERMS_RIGHT = constants_1.INCOTERMS.filter(function (_, i) { return i % 2 === 0 && i > 0; });
        // initCallStatus: CallStatus = new CallStatus();
        this.callStatus = new call_status_1.CallStatus();
    }
    CompanyNegotiationSettingsComponent.prototype.ngOnInit = function () {
        // selected terms may change the passed terms at initialization
        this.negotiationSettings = this.settings.negotiationSettings;
        this.originalSettings = utils_1.copy(this.negotiationSettings);
        this.paymentTerms = new selected_terms_1.SelectedTerms(this.negotiationSettings.paymentTerms, this.PAYMENT_TERMS);
        this.paymentMeans = new selected_terms_1.SelectedTerms(this.negotiationSettings.paymentMeans, constants_1.PAYMENT_MEANS);
        // first incoterm is "" (option for no incoterm)
        this.incoterms = new selected_terms_1.SelectedTerms(this.negotiationSettings.incoterms, constants_1.INCOTERMS);
    };
    CompanyNegotiationSettingsComponent.prototype.onSave = function () {
        var _this = this;
        this.callStatus.submit();
        this.userService
            .putCompanyNegotiationSettings(this.negotiationSettings, this.settings.companyID)
            .then(function () {
            _this.callStatus.callback("Done saving company negotiation settings", true);
            _this.originalSettings = utils_1.copy(_this.negotiationSettings);
        })
            .catch(function (error) {
            _this.callStatus.error("Error while saving company negotiation settings.", error);
        });
    };
    CompanyNegotiationSettingsComponent.prototype.isLoading = function () {
        return this.callStatus.fb_submitted;
    };
    CompanyNegotiationSettingsComponent.prototype.isDirty = function () {
        return !utils_1.deepEquals(this.negotiationSettings, this.originalSettings);
    };
    CompanyNegotiationSettingsComponent.prototype.isDisabled = function () {
        return this.presentationMode === "view";
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CompanyNegotiationSettingsComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyNegotiationSettingsComponent.prototype, "settings", void 0);
    CompanyNegotiationSettingsComponent = __decorate([
        core_1.Component({
            selector: "company-negotiation-settings",
            templateUrl: "./company-negotiation-settings.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], CompanyNegotiationSettingsComponent);
    return CompanyNegotiationSettingsComponent;
}());
exports.CompanyNegotiationSettingsComponent = CompanyNegotiationSettingsComponent;
//# sourceMappingURL=company-negotiation-settings.component.js.map