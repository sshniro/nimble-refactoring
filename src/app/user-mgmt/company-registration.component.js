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
var forms_1 = require("@angular/forms");
var address_component_1 = require("./subforms/address.component");
var user_service_1 = require("./user.service");
var ng2_cookies_1 = require("ng2-cookies");
var company_registration_1 = require("./model/company-registration");
var company_settings_1 = require("./model/company-settings");
var company_details_1 = require("./model/company-details");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var myGlobals = require("../globals");
var call_status_1 = require("../common/call-status");
var address_1 = require("./model/address");
var utils_1 = require("../common/utils");
var constants_1 = require("../common/constants");
var utils_2 = require("../common/utils");
var CompanyRegistrationComponent = /** @class */ (function () {
    function CompanyRegistrationComponent(_fb, appComponent, cookieService, modalService, router, userService) {
        this._fb = _fb;
        this.appComponent = appComponent;
        this.cookieService = cookieService;
        this.modalService = modalService;
        this.router = router;
        this.userService = userService;
        this.alertClosed = false;
        this.config = myGlobals.config;
        this.submitCallStatus = new call_status_1.CallStatus();
        this.vatCallStatus = new call_status_1.CallStatus();
        this.tooltipHTML = "";
        this.imgFile = null;
        this.vatSkipped = false;
        this.vatValidated = false;
        this.vat = "";
        this.forceActText = false;
    }
    CompanyRegistrationComponent.prototype.ngOnInit = function () {
        this.registrationForm = this._fb.group({
            name: [''],
            brandName: [''],
            vatNumber: [''],
            logo: [''],
            verificationInformation: [''],
            businessType: [''],
            businessKeywords: [''],
            industrySectors: [''],
            yearOfReg: [''],
            address: address_component_1.AddressSubForm.generateForm(this._fb),
        });
    };
    CompanyRegistrationComponent.prototype.skipVAT = function () {
        this.vatSkipped = true;
    };
    CompanyRegistrationComponent.prototype.backToVAT = function () {
        this.vatSkipped = false;
        this.vatValidated = false;
        this.registrationForm.controls['name'].setValue("");
        this.registrationForm.controls['brandName'].setValue("");
        this.registrationForm.controls['vatNumber'].setValue("");
        this.registrationForm.controls['logo'].setValue("");
        this.registrationForm.controls['verificationInformation'].setValue("");
        this.registrationForm.controls['businessType'].setValue("");
        this.registrationForm.controls['businessKeywords'].setValue("");
        this.registrationForm.controls['industrySectors'].setValue("");
        this.registrationForm.controls['yearOfReg'].setValue("");
        address_component_1.AddressSubForm.update(this.registrationForm.controls['address'], new address_1.Address("", "", "", "", "", ""));
    };
    CompanyRegistrationComponent.prototype.validateVAT = function () {
        var _this = this;
        this.vatCallStatus.submit();
        this.userService.validateVAT(this.vat)
            .then(function (response) {
            _this.vatCallStatus.callback("VAT checked", true);
            if (response.status == "success") {
                if (response.valid) {
                    if (response.company_name)
                        _this.registrationForm.controls['name'].setValue(response.company_name);
                    _this.registrationForm.controls['vatNumber'].setValue(_this.vat);
                    if (response.country_code)
                        address_component_1.AddressSubForm.update(_this.registrationForm.controls['address'], new address_1.Address("", "", "", "", "", utils_1.getCountryByISO(response.country_code)));
                    _this.vatValidated = true;
                }
                else {
                    setTimeout(function () {
                        alert("The VAT is invalid.");
                    }, 50);
                }
            }
            else {
                setTimeout(function () {
                    alert("The VAT is invalid.");
                }, 50);
            }
        })
            .catch(function (error) {
            _this.vatCallStatus.error("Error while checking VAT", error);
        });
    };
    CompanyRegistrationComponent.prototype.save = function (model) {
        var _this = this;
        var sectorString = model.getRawValue()['industrySectors'];
        if (Array.isArray(sectorString))
            sectorString = sectorString.join("\n");
        // create company registration DTO
        var userId = this.cookieService.get('user_id');
        var companyRegistration = new company_registration_1.CompanyRegistration(userId, null, new company_settings_1.CompanySettings(null, null, null, new company_details_1.CompanyDetails(model.getRawValue()['address'], utils_2.createTextObject(model.getRawValue()['businessKeywords']), model.getRawValue()['businessType'], utils_2.createTextObject(model.getRawValue()['name']), utils_2.createTextObject(model.getRawValue()['brandName']), utils_2.createTextObject(sectorString), model.getRawValue()['vatNumber'], model.getRawValue()['verificationInformation'], model.getRawValue()['yearOfReg']), null, null, null, null));
        if (myGlobals.debug)
            console.log("Registering company " + JSON.stringify(companyRegistration));
        this.submitCallStatus.submit();
        this.userService.registerCompany(companyRegistration)
            .then(function (response) {
            if (myGlobals.debug)
                console.log("Saved Company Settings for user " + userId + ". Response: " + JSON.stringify(response));
            _this.cookieService.set('bearer_token', response.accessToken);
            if (response['companyID']) {
                _this.cookieService.set("company_id", response['companyID']);
                _this.cookieService.set("active_company_name", utils_2.selectValueOfTextObject(response['settings']['details']['legalName']));
            }
            if (_this.config.logoRequired) {
                _this.userService
                    .saveImage(_this.imgFile, true, response['companyID'])
                    .then(function () {
                    _this.submitCallStatus.callback("Registration submitted", true);
                    _this.appComponent.checkLogin("/user-mgmt/company-settings");
                })
                    .catch(function (error) {
                    _this.submitCallStatus.error("Error while submitting company", error);
                });
            }
            else {
                _this.submitCallStatus.callback("Registration submitted", true);
                _this.appComponent.checkLogin("/user-mgmt/company-settings");
            }
        })
            .catch(function (error) {
            _this.submitCallStatus.error("Error while submitting company", error);
        });
        return false;
    };
    CompanyRegistrationComponent.prototype.switchInput = function () {
        this.registrationForm.controls['industrySectors'].setValue("");
        this.forceActText = !this.forceActText;
    };
    CompanyRegistrationComponent.prototype.onSetImageFile = function (event, model) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            if (file) {
                var filesize = parseInt(((file.size / 1024) / 1024).toFixed(4));
                var isAllowedExtension = this.isAllowedExtension(file.name);
                if (filesize < 2 && isAllowedExtension) {
                    this.imgFile = file;
                }
                else {
                    this.imgFile = null;
                    model.patchValue({
                        logo: null
                    });
                    if (filesize > 2) {
                        alert("Maximum allowed filesize: 2 MB");
                    }
                    else if (!isAllowedExtension) {
                        alert("Supported file extensions: " + constants_1.ALLOWED_EXTENSIONS.join());
                    }
                }
            }
        }
        else {
            this.imgFile = null;
            model.patchValue({
                logo: null
            });
            event.target.files = [];
        }
    };
    CompanyRegistrationComponent.prototype.isAllowedExtension = function (fileName) {
        var extension = utils_1.getFileExtension(fileName);
        if (extension != null) {
            var filterResults = constants_1.ALLOWED_EXTENSIONS.filter(function (allowedExtension) { return extension.toLocaleLowerCase() === allowedExtension.toLocaleLowerCase(); });
            return (filterResults.length !== 0);
        }
        return false;
    };
    CompanyRegistrationComponent.prototype.showLogoTT = function (content) {
        var tooltip = "";
        tooltip += "Maximum allowed filesize: 2 MB<br/>";
        tooltip += "Allowed formats: PNG, JPG, GIF";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyRegistrationComponent.prototype.showVerificationTT = function (content) {
        var tooltip = "";
        tooltip += "Please provide links to external resources or any other information that prove your connection to the company you want to register as a legal representative.<br/><br/>";
        tooltip += "e.g. Company member listing on an official website, signing authority, company registration at external authorities, additional identification numbers, ...";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyRegistrationComponent.prototype.showSectorTT = function (content) {
        var tooltip = "";
        tooltip += "Hold down the Ctrl key in order to select multiple sectors";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyRegistrationComponent.prototype.showKeywordsTT = function (content) {
        var tooltip = "";
        tooltip += "List some keywords that represent your business. Those will be used to improve the visibility of your company on the platform.<br/><br/>";
        tooltip += "e.g.: Design, Bathroom Manufacturing, Home Accessories";
        this.tooltipHTML = tooltip;
        this.modalService.open(content);
    };
    CompanyRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'company-registration',
            templateUrl: './company-registration.component.html',
            styleUrls: ['./company-registration.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            app_component_1.AppComponent,
            ng2_cookies_1.CookieService,
            ng_bootstrap_1.NgbModal,
            router_1.Router,
            user_service_1.UserService])
    ], CompanyRegistrationComponent);
    return CompanyRegistrationComponent;
}());
exports.CompanyRegistrationComponent = CompanyRegistrationComponent;
//# sourceMappingURL=company-registration.component.js.map