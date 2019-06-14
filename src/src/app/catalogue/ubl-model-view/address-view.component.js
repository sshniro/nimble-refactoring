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
var address_1 = require("../model/publish/address");
var ubl_model_utils_1 = require("../model/ubl-model-utils");
/**
 * Created by suat on 22-Sep-17.
 */
var AddressViewComponent = /** @class */ (function () {
    function AddressViewComponent() {
        this.multiValue = false;
        this.definition = null;
    }
    AddressViewComponent.prototype.addFirstValue = function () {
        this.address.push(new address_1.Address());
    };
    AddressViewComponent.prototype.addNewValue = function () {
        var value = ubl_model_utils_1.UBLModelUtils.createAddress();
        this.address.push(value);
    };
    AddressViewComponent.prototype.removeValue = function (index) {
        this.address.splice(index, 1);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], AddressViewComponent.prototype, "address", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AddressViewComponent.prototype, "propName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AddressViewComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressViewComponent.prototype, "multiValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AddressViewComponent.prototype, "definition", void 0);
    AddressViewComponent = __decorate([
        core_1.Component({
            selector: 'address-view',
            templateUrl: './address-view.component.html'
        })
    ], AddressViewComponent);
    return AddressViewComponent;
}());
exports.AddressViewComponent = AddressViewComponent;
//# sourceMappingURL=address-view.component.js.map