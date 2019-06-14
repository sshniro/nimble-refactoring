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
var company_settings_1 = require("../model/company-settings");
var forms_1 = require("@angular/forms");
var delivery_terms_component_1 = require("../subforms/delivery-terms.component");
var myGlobals = require("../../globals");
var call_status_1 = require("../../common/call-status");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../user.service");
var CompanyDeliveryTermsComponent = /** @class */ (function () {
    function CompanyDeliveryTermsComponent(_fb, cookieService, userService) {
        this._fb = _fb;
        this.cookieService = cookieService;
        this.userService = userService;
        this.saveCallStatus = new call_status_1.CallStatus();
        this.onSaveEvent = new core_1.EventEmitter();
    }
    CompanyDeliveryTermsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsForm = this._fb.group({
            deliveryTerms: this._fb.array(this.settings.tradeDetails.deliveryTerms.map(function (term) {
                return delivery_terms_component_1.DeliveryTermsSubForm.update(delivery_terms_component_1.DeliveryTermsSubForm.generateForm(_this._fb), term);
            }))
        });
    };
    CompanyDeliveryTermsComponent.prototype.onAddDeliveryTerms = function () {
        var terms = this.getDeliveryTerms();
        terms.push(delivery_terms_component_1.DeliveryTermsSubForm.generateForm(this._fb));
    };
    CompanyDeliveryTermsComponent.prototype.onSetToCompanyAddress = function (index) {
        var allTerms = this.getDeliveryTerms();
        var term = allTerms.get([index]);
        delivery_terms_component_1.DeliveryTermsSubForm.setAddress(term, this.settings.details.address);
        this.settingsForm.markAsDirty();
    };
    CompanyDeliveryTermsComponent.prototype.onDeleteDeliveryTerms = function (index) {
        var terms = this.getDeliveryTerms();
        terms.removeAt(index);
        this.settingsForm.markAsDirty();
    };
    CompanyDeliveryTermsComponent.prototype.onSave = function (model) {
        var _this = this;
        // update settings
        this.saveCallStatus.submit();
        this.settings.tradeDetails.deliveryTerms = this.generateSpecialTermsMap(model.getRawValue()['deliveryTerms']);
        var userId = this.cookieService.get("user_id");
        this.userService
            .putSettings(this.settings, userId)
            .then(function (response) {
            if (myGlobals.debug) {
                console.log("Saved Company Settings for user " + userId + ". Response: " + response);
            }
            _this.saveCallStatus.callback("Successfully saved", true);
            _this.settingsForm.markAsPristine();
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.saveCallStatus.error("Error while saving company settings", error);
        });
    };
    CompanyDeliveryTermsComponent.prototype.getDeliveryTerms = function () {
        return this.settingsForm.controls.deliveryTerms;
    };
    // this function is used to create languageId-value pairs for SpecialTerms using the raw value of special terms
    CompanyDeliveryTermsComponent.prototype.generateSpecialTermsMap = function (deliveryTermsRawValue) {
        for (var _i = 0, deliveryTermsRawValue_1 = deliveryTermsRawValue; _i < deliveryTermsRawValue_1.length; _i++) {
            var delTer = deliveryTermsRawValue_1[_i];
            var specialTermsMapping = {};
            if (delTer.specialTerms.value != "") {
                specialTermsMapping[delTer.specialTerms.languageID] = delTer.specialTerms.value;
            }
            delTer.specialTerms = specialTermsMapping;
        }
        return deliveryTermsRawValue;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyDeliveryTermsComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompanyDeliveryTermsComponent.prototype, "onSaveEvent", void 0);
    CompanyDeliveryTermsComponent = __decorate([
        core_1.Component({
            selector: "company-delivery-terms",
            templateUrl: "./company-delivery-terms.component.html"
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ng2_cookies_1.CookieService,
            user_service_1.UserService])
    ], CompanyDeliveryTermsComponent);
    return CompanyDeliveryTermsComponent;
}());
exports.CompanyDeliveryTermsComponent = CompanyDeliveryTermsComponent;
//# sourceMappingURL=company-delivery-terms.component.js.map