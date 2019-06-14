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
var product_wrapper_1 = require("../common/product-wrapper");
var company_settings_1 = require("../user-mgmt/model/company-settings");
var user_service_1 = require("../user-mgmt/user.service");
var catalogue_service_1 = require("../catalogue/catalogue.service");
var ProductDetailsCertificatesComponent = /** @class */ (function () {
    function ProductDetailsCertificatesComponent(userService, catalogueService) {
        this.userService = userService;
        this.catalogueService = catalogueService;
        this.certificateStatus = new core_1.EventEmitter();
    }
    ProductDetailsCertificatesComponent.prototype.ngOnInit = function () {
        if (this.settings.certificates.length == 0 && this.wrapper.line.goodsItem.item.certificate.length == 0) {
            this.certificateStatus.emit(true);
        }
    };
    ProductDetailsCertificatesComponent.prototype.downloadCertificate = function (id) {
        this.userService.downloadCert(id);
    };
    ProductDetailsCertificatesComponent.prototype.getCertificateCountryNames = function (countries) {
        var countryNames = null;
        if (countries == null || countries.length == 0) {
            return countryNames;
        }
        for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
            var country = countries_1[_i];
            if (countryNames == null) {
                countryNames = country.name.value;
            }
            else {
                countryNames += "," + country.name.value;
            }
        }
        return countryNames;
    };
    ProductDetailsCertificatesComponent.prototype.downloadProductCertificate = function (certificate) {
        this.catalogueService.getBinaryObject(certificate.documentReference[0].attachment.embeddedDocumentBinaryObject.uri).then(function (binaryObject) {
            var binaryString = window.atob(binaryObject.value);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            var a = document.createElement("a");
            document.body.appendChild(a);
            var blob = new Blob([bytes], { type: binaryObject.mimeCode });
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = binaryObject.fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }).catch(function (error) {
            console.error("Failed to download the file", error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", product_wrapper_1.ProductWrapper)
    ], ProductDetailsCertificatesComponent.prototype, "wrapper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", company_settings_1.CompanySettings)
    ], ProductDetailsCertificatesComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductDetailsCertificatesComponent.prototype, "certificateStatus", void 0);
    ProductDetailsCertificatesComponent = __decorate([
        core_1.Component({
            selector: 'product-details-certificates',
            templateUrl: './product-details-certificates.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            catalogue_service_1.CatalogueService])
    ], ProductDetailsCertificatesComponent);
    return ProductDetailsCertificatesComponent;
}());
exports.ProductDetailsCertificatesComponent = ProductDetailsCertificatesComponent;
//# sourceMappingURL=product-details-certificates.component.js.map