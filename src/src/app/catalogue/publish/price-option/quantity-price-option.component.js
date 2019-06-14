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
var price_option_1 = require("../../model/publish/price-option");
/**
 * Created by suat on 28-Aug-18.
 */
var QuantityPriceOptionComponent = /** @class */ (function () {
    function QuantityPriceOptionComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", price_option_1.PriceOption)
    ], QuantityPriceOptionComponent.prototype, "priceOption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuantityPriceOptionComponent.prototype, "discountUnits", void 0);
    QuantityPriceOptionComponent = __decorate([
        core_1.Component({
            selector: "quantity-price-option",
            templateUrl: "./quantity-price-option.component.html"
        })
    ], QuantityPriceOptionComponent);
    return QuantityPriceOptionComponent;
}());
exports.QuantityPriceOptionComponent = QuantityPriceOptionComponent;
//# sourceMappingURL=quantity-price-option.component.js.map