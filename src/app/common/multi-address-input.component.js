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
var address_1 = require("../catalogue/model/publish/address");
var ubl_model_utils_1 = require("../catalogue/model/ubl-model-utils");
var MultiAddressInputComponent = /** @class */ (function () {
    function MultiAddressInputComponent() {
        this.multiValue = true;
        this.visible = true;
        this.disabled = false;
        this.presentationMode = "edit";
        this.labelClass = "col-3";
        this.labelMainClass = "";
        this.rowClass = "";
        this.valueTextClass = "";
    }
    MultiAddressInputComponent.prototype.ngOnInit = function () {
        if (this.address.length === 0) {
            this.address.push(new address_1.Address());
        }
        if (!this.valueClass) {
            this.valueClass = this.label ? "col-9" : "col-12";
        }
    };
    MultiAddressInputComponent.prototype.addNewValue = function () {
        var value = ubl_model_utils_1.UBLModelUtils.createAddress();
        this.address.push(value);
    };
    MultiAddressInputComponent.prototype.removeValue = function (index) {
        this.address.splice(index, 1);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MultiAddressInputComponent.prototype, "address", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiAddressInputComponent.prototype, "multiValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiAddressInputComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MultiAddressInputComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "definition", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "labelClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "labelMainClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "rowClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "valueClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MultiAddressInputComponent.prototype, "valueTextClass", void 0);
    MultiAddressInputComponent = __decorate([
        core_1.Component({
            selector: "multi-address-input",
            templateUrl: "./multi-address-input.component.html",
            styleUrls: ["./multi-address-input.component.css"],
        }),
        __metadata("design:paramtypes", [])
    ], MultiAddressInputComponent);
    return MultiAddressInputComponent;
}());
exports.MultiAddressInputComponent = MultiAddressInputComponent;
//# sourceMappingURL=multi-address-input.component.js.map