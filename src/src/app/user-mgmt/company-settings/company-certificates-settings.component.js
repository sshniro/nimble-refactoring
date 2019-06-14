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
var call_status_1 = require("../../common/call-status");
//import { PPAP_CERTIFICATES } from "../../catalogue/model/constants";
var user_service_1 = require("../user.service");
var ng2_cookies_1 = require("ng2-cookies");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var myGlobals = require("../../globals");
var CompanyCertificatesSettingsComponent = /** @class */ (function () {
    function CompanyCertificatesSettingsComponent(_fb, userService, modalService, cookieService) {
        this._fb = _fb;
        this.userService = userService;
        this.modalService = modalService;
        this.cookieService = cookieService;
        this.onSaveEvent = new core_1.EventEmitter();
        this.config = myGlobals.config;
        //ppapTypes: string[] = PPAP_CERTIFICATES;
        this.savePpapLevelCallStatus = new call_status_1.CallStatus();
        this.certFile = null;
        this.saveCertCallStatus = new call_status_1.CallStatus();
        this.certificatesCallStatus = new call_status_1.CallStatus();
    }
    CompanyCertificatesSettingsComponent.prototype.ngOnInit = function () {
    };
    CompanyCertificatesSettingsComponent.prototype.isPpapLevelDirty = function () {
        return this.settings.tradeDetails.ppapCompatibilityLevel !== this.ppapLevel;
    };
    CompanyCertificatesSettingsComponent.prototype.onAddCertificate = function (content) {
        this.addCertForm = this._fb.group({
            file: [""],
            name: [""],
            description: [""],
            type: [""]
        });
        this.certFile = null;
        this.modalService.open(content);
    };
    CompanyCertificatesSettingsComponent.prototype.onSaveCertificate = function (model, close) {
        var _this = this;
        this.saveCertCallStatus.submit();
        var fields = model.getRawValue();
        this.userService
            .saveCert(this.certFile, encodeURIComponent(fields.name), encodeURIComponent(fields.description), encodeURIComponent(fields.type), this.settings.companyID)
            .then(function () {
            close();
            _this.saveCertCallStatus.callback("Certificate saved", true);
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.saveCertCallStatus.error("Error while saving cerficate", error);
        });
    };
    CompanyCertificatesSettingsComponent.prototype.onRemoveCertificate = function (id, index) {
        var _this = this;
        if (confirm("Are you sure that you want to delete this certificate?")) {
            this.certificatesCallStatus.submit();
            this.userService
                .deleteCert(id, this.settings.companyID)
                .then(function () {
                _this.certificatesCallStatus.callback("Succesfully deleted certificate", true);
                _this.onSaveEvent.emit();
            })
                .catch(function (error) {
                _this.certificatesCallStatus.error("Error while deleting certificate", error);
            });
        }
    };
    CompanyCertificatesSettingsComponent.prototype.onSetCertificateFile = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            this.certFile = file;
        }
        else {
            this.certFile = null;
        }
    };
    CompanyCertificatesSettingsComponent.prototype.onSavePpapLevel = function () {
        var _this = this;
        this.savePpapLevelCallStatus.submit();
        this.settings.tradeDetails.ppapCompatibilityLevel = this.ppapLevel;
        var userId = this.cookieService.get("user_id");
        this.userService.putSettings(this.settings, userId)
            .then(function () {
            _this.savePpapLevelCallStatus.callback("Ppap level saved.", true);
            _this.onSaveEvent.emit();
        })
            .catch(function (error) {
            _this.savePpapLevelCallStatus.error("Error while saving Ppap level.", error);
        });
    };
    CompanyCertificatesSettingsComponent.prototype.onDownloadCertificate = function (id) {
        this.userService.downloadCert(id);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], CompanyCertificatesSettingsComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CompanyCertificatesSettingsComponent.prototype, "certificates", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CompanyCertificatesSettingsComponent.prototype, "ppapLevel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CompanyCertificatesSettingsComponent.prototype, "onSaveEvent", void 0);
    CompanyCertificatesSettingsComponent = __decorate([
        core_1.Component({
            selector: "company-certificates-settings",
            templateUrl: "./company-certificates-settings.component.html"
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            user_service_1.UserService,
            ng_bootstrap_1.NgbModal,
            ng2_cookies_1.CookieService])
    ], CompanyCertificatesSettingsComponent);
    return CompanyCertificatesSettingsComponent;
}());
exports.CompanyCertificatesSettingsComponent = CompanyCertificatesSettingsComponent;
//# sourceMappingURL=company-certificates-settings.component.js.map