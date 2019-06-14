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
var app_component_1 = require("../../app.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var myGlobals = require("../../globals");
var utils_1 = require("../../common/utils");
var forms_1 = require("@angular/forms");
var address_component_1 = require("../subforms/address.component");
var call_status_1 = require("../../common/call-status");
var user_service_1 = require("../user.service");
var CompanyDataSettingsComponent = /** @class */ (function () {
    function CompanyDataSettingsComponent(appComponent, _fb, modalService, userService) {
        this.appComponent = appComponent;
        this._fb = _fb;
        this.modalService = modalService;
        this.userService = userService;
        this.config = myGlobals.config;
        this.alertClosed = false;
        this.forceActText = false;
        this.saveCallStatus = new call_status_1.CallStatus();
        this.onSaveEvent = new core_1.EventEmitter();
        this.selectValueOfTextObject = utils_1.selectValueOfTextObject;
    }
    CompanyDataSettingsComponent.prototype.ngOnInit = function () {
        var industrySectorVal;
        if (this.settings.details.industrySectors && this.selectValueOfTextObject(this.settings.details.industrySectors))
            industrySectorVal = this.selectValueOfTextObject(this.settings.details.industrySectors);
        else
            industrySectorVal = "";
        if (this.isSectorArray(industrySectorVal)) {
            industrySectorVal = this.getSectorArray(industrySectorVal);
            this.forceActText = false;
        }
        else
            this.forceActText = true;
        this.dataForm = this._fb.group({
            name: new forms_1.FormControl({ value: (this.selectValueOfTextObject(this.settings.details.legalName) || ""), disabled: !this.appComponent.checkRoles('pm') }),
            brandName: new forms_1.FormControl({ value: (this.selectValueOfTextObject(this.settings.details.brandName) || ""), disabled: (!this.appComponent.checkRoles('pm') && Object.keys(this.settings.details.brandName).length == 0) }),
            vatNumber: new forms_1.FormControl({ value: (this.settings.details.vatNumber || ""), disabled: !this.appComponent.checkRoles('pm') }),
            verificationInformation: new forms_1.FormControl({ value: (this.settings.details.verificationInformation || ""), disabled: (!this.appComponent.checkRoles('pm') && this.settings.details.verificationInformation) }),
            businessType: new forms_1.FormControl({ value: (this.settings.details.businessType || ""), disabled: !this.appComponent.checkRoles('pm') }),
            industrySectors: new forms_1.FormControl({ value: industrySectorVal, disabled: !this.appComponent.checkRoles('pm') }),
            businessKeywords: new forms_1.FormControl({ value: (this.selectValueOfTextObject(this.settings.details.businessKeywords) || ""), disabled: (!this.appComponent.checkRoles('pm') && Object.keys(this.settings.details.businessKeywords).length == 0) }),
            yearOfReg: new forms_1.FormControl({ value: (this.settings.details.yearOfCompanyRegistration || ""), disabled: (!this.appComponent.checkRoles('pm') && this.settings.details.yearOfCompanyRegistration) }),
            address: address_component_1.AddressSubForm.update(address_component_1.AddressSubForm.generateForm(this._fb), this.settings.details.address)
        });
    };
    CompanyDataSettingsComponent.prototype.save = function (model) {
        var _this = this;
        this.saveCallStatus.submit();
        var sectorString = model.getRawValue()['industrySectors'];
        if (Array.isArray(sectorString))
            sectorString = sectorString.join("\n");
        this.settings.details.legalName = utils_1.createTextObject(model.getRawValue()['name']);
        this.settings.details.brandName = utils_1.createTextObject(model.getRawValue()['brandName']);
        this.settings.details.vatNumber = model.getRawValue()['vatNumber'];
        this.settings.details.verificationInformation = model.getRawValue()['verificationInformation'];
        this.settings.details.businessType = model.getRawValue()['businessType'];
        this.settings.details.industrySectors = utils_1.createTextObject(sectorString);
        this.settings.details.businessKeywords = utils_1.createTextObject(model.getRawValue()['businessKeywords']);
        this.settings.details.yearOfCompanyRegistration = model.getRawValue()['yearOfReg'];
        this.settings.details.address = model.getRawValue()['address'];
        var compId = this.settings.companyID;
        this.userService
            .putSettingsForParty(this.settings, compId)
            .then(function (response) {
            if (myGlobals.debug) {
                console.log("Saved Company Settings for company " + compId + ". Response: " + response);
            }
            _this.saveCallStatus.callback("Successfully saved", true);
            _this.dataForm.markAsPristine();
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.saveCallStatus.error("Error while saving company settings", error);
        });
    };
    CompanyDataSettingsComponent.prototype.isSectorArray = function (sectors) {
        var isArray = true;
        if (this.config.supportedActivitySectors[this.settings.details.businessType] && this.config.supportedActivitySectors[this.settings.details.businessType].length > 0) {
            var sectorsArr = sectors.split("\n");
            var availableSectors = this.config.supportedActivitySectors[this.settings.details.businessType];
            for (var i = 0; i < sectorsArr.length; i++) {
                if (availableSectors.indexOf(sectorsArr[i]) == -1)
                    isArray = false;
            }
        }
        else
            isArray = false;
        return isArray;
    };
    CompanyDataSettingsComponent.prototype.getSectorArray = function (sectors) {
        return sectors.split("\n");
    };
    CompanyDataSettingsComponent.prototype.switchInput = function () {
        this.dataForm.controls['industrySectors'].setValue("");
        this.forceActText = !this.forceActText;
    };
    CompanyDataSettingsComponent.prototype.changeData = function (content) {
        this.mailto = "mailto:" + this.config.supportMail;
        var subject = "NIMBLE Company Data Change Request (UserID: " + this.appComponent.userID + ", Platform: " +
            this.config.platformName + ", Timestamp: " + new Date().toISOString() + ")";
        this.mailto += "?subject=" + encodeURIComponent(subject);
        var body = "Dear NIMBLE support team,";
        body += "\n\n\n";
        body += "I would like to change my company data to the following:";
        body += "\n\n";
        body += "Company Name:\n";
        body += this.selectValueOfTextObject(this.settings.details.legalName) + "\n\n";
        body += "VAT Number:\n";
        body += this.settings.details.vatNumber + "\n\n";
        body += "Verification Info:\n";
        body += this.settings.details.verificationInformation + "\n\n";
        body += "Business Type:\n";
        body += this.settings.details.businessType + "\n\n";
        body += "Activity Sectors:\n";
        body += this.selectValueOfTextObject(this.settings.details.industrySectors) + "\n\n";
        body += "Business Keywords:\n";
        body += this.selectValueOfTextObject(this.settings.details.businessKeywords) + "\n\n";
        body += "Year of Foundation:\n";
        body += this.settings.details.yearOfCompanyRegistration + "\n\n";
        body += "Street:\n";
        body += this.settings.details.address.streetName + "\n\n";
        body += "Building Number:\n";
        body += this.settings.details.address.buildingNumber + "\n\n";
        body += "City / Town:\n";
        body += this.settings.details.address.cityName + "\n\n";
        body += "State / Province:\n";
        body += this.settings.details.address.region + "\n\n";
        body += "Postal Code:\n";
        body += this.settings.details.address.postalCode + "\n\n";
        body += "Country:\n";
        body += this.settings.details.address.country;
        body += "\n\n\n";
        body += "Best regards,";
        body += "\n\n";
        body += this.appComponent.fullName;
        body += "\n";
        body += "(E-Mail: " + this.appComponent.eMail + ", Company: " + this.appComponent.activeCompanyName + ", CompanyID: " + this.appComponent.companyID + ")";
        this.mailto += "&body=" + encodeURIComponent(body);
        this.modalService.open(content);
    };
    CompanyDataSettingsComponent.prototype.showVerificationTT = function (content) {
        var tooltip = "Please provide links to external resources or any other information that prove your connection to the company you want to register as a legal representative.<br/><br/>"
            + "e.g. Company member listing on an official website, signing authority, company registration at external authorities, additional identification numbers, ...";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyDataSettingsComponent.prototype.showSectorTT = function (content) {
        var tooltip = "";
        tooltip += "Hold down the Ctrl key in order to select multiple sectors";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyDataSettingsComponent.prototype.showKeywordsTT = function (content) {
        var tooltip = "";
        tooltip += "List some keywords that represent your business. Those will be used to improve the visibility of your company on the platform.<br/><br/>";
        tooltip += "e.g.: Design, Bathroom Manufacturing, Home Accessories";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyDataSettingsComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompanyDataSettingsComponent.prototype, "onSaveEvent", void 0);
    CompanyDataSettingsComponent = __decorate([
        core_1.Component({
            selector: "company-data-settings",
            templateUrl: "./company-data-settings.component.html"
        }),
        __metadata("design:paramtypes", [app_component_1.AppComponent,
            forms_1.FormBuilder,
            ng_bootstrap_1.NgbModal,
            user_service_1.UserService])
    ], CompanyDataSettingsComponent);
    return CompanyDataSettingsComponent;
}());
exports.CompanyDataSettingsComponent = CompanyDataSettingsComponent;
//# sourceMappingURL=company-data-settings.component.js.map