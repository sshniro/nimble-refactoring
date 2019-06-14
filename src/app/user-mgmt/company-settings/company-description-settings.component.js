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
var call_status_1 = require("../../common/call-status");
var forms_1 = require("@angular/forms");
var company_settings_1 = require("../model/company-settings");
var company_event_1 = require("../model/company-event");
var address_component_1 = require("../subforms/address.component");
var moment = require("moment");
var myGlobals = require("../../globals");
var ng2_cookies_1 = require("ng2-cookies");
var user_service_1 = require("../user.service");
var app_component_1 = require("../../app.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var utils_1 = require("../../common/utils");
var CompanyDescriptionSettingsComponent = /** @class */ (function () {
    function CompanyDescriptionSettingsComponent(appComponent, modalService, _fb, cookieService, userService) {
        this.appComponent = appComponent;
        this.modalService = modalService;
        this._fb = _fb;
        this.cookieService = cookieService;
        this.userService = userService;
        this.socialMediaList = [""];
        this.externalResources = [""];
        this.compEvents = [];
        this.socialMediaListChanged = false;
        this.externalResourcesChanged = false;
        this.compEventsChanged = false;
        this.imgEndpoint = myGlobals.user_mgmt_endpoint + "/company-settings/image/";
        this.imgFile = null;
        this.compEventFromDate = new Date().toISOString();
        this.compEventToDate = new Date().toISOString();
        this.saveCallStatus = new call_status_1.CallStatus();
        this.saveCallStatusImage = new call_status_1.CallStatus();
        this.onSaveEvent = new core_1.EventEmitter();
    }
    CompanyDescriptionSettingsComponent.prototype.ngOnInit = function () {
        this.descriptionForm = this._fb.group({
            companyStatement: utils_1.selectValueOfTextObject(this.settings.description.companyStatement),
            website: this.settings.description.website
        });
        this.externalResources = this.settings.description.externalResources;
        if (this.externalResources.length == 0)
            this.externalResources = [""];
        this.socialMediaList = this.settings.description.socialMediaList;
        if (this.socialMediaList.length == 0)
            this.socialMediaList = [""];
        this.compEvents = this.settings.description.events;
        this.sortCompEvent();
    };
    CompanyDescriptionSettingsComponent.prototype.addSocialMediaEntry = function () {
        this.socialMediaList.push("");
        this.flagSocialMediaChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.addExternalResourceEntry = function () {
        this.externalResources.push("");
        this.flagExternalResourcesChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.addCompEventEntry = function (content) {
        this.compEventFromDate = new Date().toISOString();
        this.compEventToDate = new Date().toISOString();
        this.addEventForm = this._fb.group({
            name: [""],
            description: [""],
            place: address_component_1.AddressSubForm.generateForm(this._fb)
        });
        this.modalService.open(content);
    };
    CompanyDescriptionSettingsComponent.prototype.onSaveEventEntry = function (model, close) {
        var fields = model.getRawValue();
        var newEvent = new company_event_1.CompanyEvent(moment(this.compEventFromDate).format("YYYY-MM-DD"), moment(this.compEventToDate).format("YYYY-MM-DD"), fields.description, fields.name, fields.place);
        this.compEvents.push(newEvent);
        this.sortCompEvent();
        close();
        this.flagCompEventsChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.sortCompEvent = function () {
        this.compEvents.sort(function (a, b) { return moment(a.dateFrom).diff(moment(b.dateFrom)); });
    };
    CompanyDescriptionSettingsComponent.prototype.removeSocialMediaEntry = function (index) {
        this.socialMediaList.splice(index, 1);
        if (this.socialMediaList.length == 0)
            this.socialMediaList = [""];
        this.flagSocialMediaChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.removeExternalResourceEntry = function (index) {
        this.externalResources.splice(index, 1);
        if (this.externalResources.length == 0)
            this.externalResources = [""];
        this.flagExternalResourcesChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.removeCompEventEntry = function (index) {
        this.compEvents.splice(index, 1);
        this.flagCompEventsChanged();
    };
    CompanyDescriptionSettingsComponent.prototype.flagSocialMediaChanged = function () {
        this.socialMediaListChanged = true;
    };
    CompanyDescriptionSettingsComponent.prototype.flagExternalResourcesChanged = function () {
        this.externalResourcesChanged = true;
    };
    CompanyDescriptionSettingsComponent.prototype.flagCompEventsChanged = function () {
        this.compEventsChanged = true;
    };
    CompanyDescriptionSettingsComponent.prototype.trackFn = function (index, item) {
        return index;
    };
    CompanyDescriptionSettingsComponent.prototype.addImage = function (content, logo) {
        this.addImageForm = this._fb.group({
            file: [""],
            isLogo: logo
        });
        this.modalService.open(content);
    };
    CompanyDescriptionSettingsComponent.prototype.onSetImageFile = function (event, model) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            if (file) {
                var filesize = parseInt(((file.size / 1024) / 1024).toFixed(4));
                if (filesize < 2) {
                    this.imgFile = file;
                }
                else {
                    this.imgFile = null;
                    model.patchValue({
                        file: null
                    });
                    alert("Maximum allowed filesize: 2 MB");
                }
            }
        }
        else {
            this.imgFile = null;
            model.patchValue({
                file: null
            });
            event.target.files = [];
        }
    };
    CompanyDescriptionSettingsComponent.prototype.onSaveImage = function (model, close) {
        var _this = this;
        this.saveCallStatusImage.submit();
        var fields = model.getRawValue();
        this.userService
            .saveImage(this.imgFile, fields.isLogo, this.settings.companyID)
            .then(function () {
            close();
            _this.saveCallStatusImage.callback("Image saved", true);
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.saveCallStatusImage.error("Error while saving image", error);
        });
    };
    CompanyDescriptionSettingsComponent.prototype.onDeleteImage = function (id) {
        var _this = this;
        if (confirm("Are you sure that you want to delete this image?")) {
            this.saveCallStatusImage.submit();
            this.userService
                .deleteImage(id, this.settings.companyID)
                .then(function () {
                _this.saveCallStatusImage.callback("Image deleted", true);
                _this.onSaveEvent.emit();
            })
                .catch(function (error) {
                _this.saveCallStatusImage.error("Error while deleting image", error);
            });
        }
    };
    CompanyDescriptionSettingsComponent.prototype.onSave = function (model) {
        var _this = this;
        this.saveCallStatus.submit();
        this.settings.description.companyStatement = utils_1.createTextObject(model.getRawValue()['companyStatement']);
        this.settings.description.website = model.getRawValue()['website'];
        this.settings.description.socialMediaList = this.socialMediaList;
        this.settings.description.externalResources = this.externalResources;
        this.settings.description.events = this.compEvents;
        var compId = this.settings.companyID;
        this.userService
            .putSettingsForParty(this.settings, compId)
            .then(function (response) {
            if (myGlobals.debug) {
                console.log("Saved Company Settings for company " + compId + ". Response: " + response);
            }
            _this.saveCallStatus.callback("Successfully saved", true);
            _this.socialMediaListChanged = false;
            _this.externalResourcesChanged = false;
            _this.compEventsChanged = false;
            _this.descriptionForm.markAsPristine();
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.saveCallStatus.error("Error while saving company settings", error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyDescriptionSettingsComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompanyDescriptionSettingsComponent.prototype, "onSaveEvent", void 0);
    CompanyDescriptionSettingsComponent = __decorate([
        core_1.Component({
            selector: "company-description-settings",
            templateUrl: "./company-description-settings.component.html"
        }),
        __metadata("design:paramtypes", [app_component_1.AppComponent,
            ng_bootstrap_1.NgbModal,
            forms_1.FormBuilder,
            ng2_cookies_1.CookieService,
            user_service_1.UserService])
    ], CompanyDescriptionSettingsComponent);
    return CompanyDescriptionSettingsComponent;
}());
exports.CompanyDescriptionSettingsComponent = CompanyDescriptionSettingsComponent;
//# sourceMappingURL=company-description-settings.component.js.map