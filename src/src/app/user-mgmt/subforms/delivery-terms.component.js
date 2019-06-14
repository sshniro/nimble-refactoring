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
var address_component_1 = require("./address.component");
var constants_1 = require("../../catalogue/model/constants");
var DeliveryTermsSubForm = /** @class */ (function () {
    function DeliveryTermsSubForm() {
    }
    DeliveryTermsSubForm.setAddress = function (deliveryTermsForm, address) {
        address_component_1.AddressSubForm.update(deliveryTermsForm.controls.deliveryAddress, address);
    };
    DeliveryTermsSubForm.getAddress = function (deliveryTermsForm) {
        return address_component_1.AddressSubForm.get(deliveryTermsForm.controls.deliveryAddress);
    };
    DeliveryTermsSubForm.update = function (deliveryTermsForm, deliveryTerms) {
        this.updateSpecialTerms(deliveryTermsForm, deliveryTerms.specialTerms);
        address_component_1.AddressSubForm.update(deliveryTermsForm.controls["deliveryAddress"], deliveryTerms.deliveryAddress);
        deliveryTermsForm.controls.estimatedDeliveryTime.setValue(deliveryTerms.estimatedDeliveryTime);
        return deliveryTermsForm;
    };
    // To handle special terms, one FormGroup is created. However, to support multilinguality properly,
    // more than one FormGroup is necessary. Currently, the user only can have one special term in the default language of browser.
    DeliveryTermsSubForm.generateForm = function (builder) {
        return builder.group({
            specialTerms: builder.group({
                value: [""],
                languageID: [constants_1.DEFAULT_LANGUAGE()]
            }),
            deliveryAddress: address_component_1.AddressSubForm.generateForm(builder),
            estimatedDeliveryTime: ['', forms_1.Validators.pattern('\\d+')] // only digits
        });
    };
    DeliveryTermsSubForm.updateSpecialTerms = function (deliveryTermsForm, specialTerms) {
        var keys = Object.keys(specialTerms);
        if (keys.length > 0) {
            var formGroup = deliveryTermsForm.controls.specialTerms;
            // For now, there might be just one special terms. This is why we use the initial key.
            formGroup.controls.value.setValue(specialTerms[keys[0]]);
            formGroup.controls.languageID.setValue(keys[0]);
        }
    };
    __decorate([
        core_1.Input('group'),
        __metadata("design:type", forms_1.FormGroup)
    ], DeliveryTermsSubForm.prototype, "deliveryTermsForm", void 0);
    DeliveryTermsSubForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'delivery-terms-form',
            templateUrl: 'delivery-terms.component.html',
            styleUrls: ['delivery-terms.component.css']
        })
    ], DeliveryTermsSubForm);
    return DeliveryTermsSubForm;
}());
exports.DeliveryTermsSubForm = DeliveryTermsSubForm;
//# sourceMappingURL=delivery-terms.component.js.map