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
var catalogue_line_1 = require("../model/publish/catalogue-line");
var certificate_1 = require("../model/publish/certificate");
var myGlobals = require("../../globals");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ubl_model_utils_1 = require("../model/ubl-model-utils");
var utils_1 = require("../../common/utils");
var country_1 = require("../model/publish/country");
var text_1 = require("../model/publish/text");
var ProductCertificatesTabComponent = /** @class */ (function () {
    function ProductCertificatesTabComponent(_fb, modalService) {
        this._fb = _fb;
        this.modalService = modalService;
        this.config = myGlobals.config;
        this.countryNames = utils_1.COUNTRY_NAMES;
        this.validUpload = false;
        this.countryInputValue = '';
        this.selectedCountries = [];
    }
    ProductCertificatesTabComponent.prototype.ngOnInit = function () {
        // nothing for now
    };
    ProductCertificatesTabComponent.prototype.onDelete = function (i) {
        this.catalogueLine.goodsItem.item.certificate.splice(i, 1);
    };
    ProductCertificatesTabComponent.prototype.onAddCertificate = function (content) {
        this.validUpload = false;
        this.addCertForm = this._fb.group({
            file: [""],
            name: [""],
            description: [""],
            type: [""]
        });
        this.countryFormControl = new forms_1.FormControl('');
        this.modalService.open(content);
    };
    ProductCertificatesTabComponent.prototype.onSetCertificateFile = function (event) {
        this.validUpload = true;
        this.certDocumentReference = ubl_model_utils_1.UBLModelUtils.createDocumentReferenceWithBinaryObject(event);
    };
    ProductCertificatesTabComponent.prototype.removedFile = function (event) {
        if (event) {
            this.validUpload = false;
        }
    };
    ProductCertificatesTabComponent.prototype.onCertificateDetailsProvided = function (model, close) {
        var fields = model.getRawValue();
        var certificate = new certificate_1.Certificate();
        certificate.certificateType = fields.type;
        certificate.remarks = fields.description;
        certificate.certificateTypeCode.name = fields.name;
        certificate.documentReference = [this.certDocumentReference];
        for (var _i = 0, _a = this.selectedCountries; _i < _a.length; _i++) {
            var countryName = _a[_i];
            var country = new country_1.Country(new text_1.Text(countryName, "en"));
            certificate.country.push(country);
        }
        console.log(certificate.country);
        this.catalogueLine.goodsItem.item.certificate.push(certificate);
        close();
    };
    ProductCertificatesTabComponent.prototype.onCountrySelected = function (event) {
        this.selectedCountries.push(event.target.value);
    };
    ProductCertificatesTabComponent.prototype.onCountryRemoved = function (countryName) {
        this.selectedCountries.splice(this.selectedCountries.indexOf(countryName), 1);
        this.countryFormControl.setValue('');
    };
    ProductCertificatesTabComponent.prototype.getCertificateCountryNames = function (certificate) {
        console.log(certificate.country);
        var countryNames = [];
        if (certificate.country == null || certificate.country.length == 0) {
            return countryNames;
        }
        for (var _i = 0, _a = certificate.country; _i < _a.length; _i++) {
            var country = _a[_i];
            countryNames.push(country.name.value);
        }
        return countryNames;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ProductCertificatesTabComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductCertificatesTabComponent.prototype, "disabled", void 0);
    ProductCertificatesTabComponent = __decorate([
        core_1.Component({
            selector: "product-certificates-tab",
            templateUrl: "./product-certificates-tab.component.html",
            styleUrls: ["./product-certificates-tab.component.css"]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            ng_bootstrap_1.NgbModal])
    ], ProductCertificatesTabComponent);
    return ProductCertificatesTabComponent;
}());
exports.ProductCertificatesTabComponent = ProductCertificatesTabComponent;
//# sourceMappingURL=product-certificates-tab.component.js.map