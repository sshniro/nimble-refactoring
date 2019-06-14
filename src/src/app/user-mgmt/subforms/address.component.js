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
var utils_1 = require("../../common/utils");
var operators_1 = require("rxjs/operators");
var AddressSubForm = /** @class */ (function () {
    function AddressSubForm() {
        this.disabledFlag = false;
        this.requiredFlag = true;
        this.getSuggestions = function (text$) {
            return text$.pipe(operators_1.debounceTime(50), operators_1.distinctUntilChanged(), operators_1.map(function (term) { return utils_1.getCountrySuggestions(term); }));
        };
    }
    AddressSubForm.get = function (addressForm) {
        return {
            streetName: addressForm.controls.streetName.value,
            buildingNumber: addressForm.controls.buildingNumber.value,
            cityName: addressForm.controls.cityName.value,
            postalCode: addressForm.controls.postalCode.value,
            region: addressForm.controls.region.value,
            country: addressForm.controls.country.value
        };
    };
    AddressSubForm.update = function (addressForm, address) {
        if (address) {
            addressForm.controls.streetName.setValue(address.streetName || "");
            addressForm.controls.buildingNumber.setValue(address.buildingNumber || "");
            addressForm.controls.cityName.setValue(address.cityName || "");
            addressForm.controls.region.setValue(address.region || "");
            addressForm.controls.postalCode.setValue(address.postalCode || "");
            addressForm.controls.country.setValue(address.country || "");
        }
        return addressForm;
    };
    AddressSubForm.generateForm = function (builder) {
        var formDef = [''];
        return builder.group({
            streetName: formDef,
            buildingNumber: formDef,
            cityName: formDef,
            postalCode: formDef,
            region: formDef,
            country: ['', [utils_1.validateCountry]]
        });
    };
    __decorate([
        core_1.Input('group'),
        __metadata("design:type", forms_1.FormGroup)
    ], AddressSubForm.prototype, "addressForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressSubForm.prototype, "disabledFlag", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressSubForm.prototype, "requiredFlag", void 0);
    AddressSubForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'address-form',
            templateUrl: 'address.component.html',
            styleUrls: ['address.component.css']
        })
    ], AddressSubForm);
    return AddressSubForm;
}());
exports.AddressSubForm = AddressSubForm;
//# sourceMappingURL=address.component.js.map