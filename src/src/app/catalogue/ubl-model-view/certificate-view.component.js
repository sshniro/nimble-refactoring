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
var certificate_1 = require("../model/publish/certificate");
var bp_data_service_1 = require("../../bpe/bp-view/bp-data-service");
/**
 * Created by suat on 22-Sep-17.
 */
var CertificateViewComponent = /** @class */ (function () {
    function CertificateViewComponent(bpDataService) {
        this.bpDataService = bpDataService;
    }
    CertificateViewComponent.prototype.addNewValue = function () {
        var certificate = new certificate_1.Certificate();
        this.certificates.push(certificate);
    };
    CertificateViewComponent.prototype.removeValue = function (index) {
        this.certificates.splice(index, 1);
    };
    CertificateViewComponent.prototype.updateCertificate = function (event) {
        var prevValue = this.certificates[0];
        var selectedValue = this.certificates[event.target.selectedIndex];
        this.certificates[0] = selectedValue;
        this.certificates[event.target.selectedIndex] = prevValue;
        this.bpDataService.modifiedCatalogueLines[0].goodsItem.item.certificate = [selectedValue];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CertificateViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CertificateViewComponent.prototype, "certificates", void 0);
    CertificateViewComponent = __decorate([
        core_1.Component({
            selector: 'certificate-view',
            templateUrl: './certificate-view.component.html'
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService])
    ], CertificateViewComponent);
    return CertificateViewComponent;
}());
exports.CertificateViewComponent = CertificateViewComponent;
//# sourceMappingURL=certificate-view.component.js.map