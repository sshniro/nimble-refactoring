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
var constants_1 = require("../../model/constants");
var core_1 = require("@angular/core");
var price_option_1 = require("../../model/publish/price-option");
/**
 * Created by suat on 05-Sep-18.
 */
var DiscountTargetComponent = /** @class */ (function () {
    function DiscountTargetComponent() {
        this.selectedDiscountTarget = constants_1.DISCOUNT_TARGETS.TOTAL_PRICE;
        this.discountTargets = constants_1.DISCOUNT_TARGETS;
        this.object = Object;
    }
    DiscountTargetComponent.prototype.ngOnInit = function () {
        // if the discount target is already set, we should set the selected discount target properly
        if (this.priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount == null) {
            this.selectedDiscountTarget = constants_1.DISCOUNT_TARGETS.TOTAL_PRICE;
            this.amount = this.priceOption.itemLocationQuantity.allowanceCharge[0].amount;
        }
        else if (this.priceOption.itemLocationQuantity.allowanceCharge[0].amount == null) {
            this.selectedDiscountTarget = constants_1.DISCOUNT_TARGETS.PER_UNIT;
            this.amount = this.priceOption.itemLocationQuantity.allowanceCharge[0].perUnitAmount;
        }
        else {
            this.amount = this.priceOption.itemLocationQuantity.allowanceCharge[0].amount;
        }
    };
    DiscountTargetComponent.prototype.changeDiscountTarget = function (discountTarget, allowanceCharge) {
        if (discountTarget == constants_1.DISCOUNT_TARGETS.PER_UNIT) {
            if (allowanceCharge.amount != null) {
                allowanceCharge.perUnitAmount = allowanceCharge.amount;
                allowanceCharge.amount = null;
                this.amount = allowanceCharge.perUnitAmount;
            }
        }
        else {
            if (allowanceCharge.perUnitAmount != null) {
                allowanceCharge.amount = allowanceCharge.perUnitAmount;
                allowanceCharge.perUnitAmount = null;
                this.amount = allowanceCharge.amount;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", price_option_1.PriceOption)
    ], DiscountTargetComponent.prototype, "priceOption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DiscountTargetComponent.prototype, "discountUnits", void 0);
    DiscountTargetComponent = __decorate([
        core_1.Component({
            selector: "discount-target",
            templateUrl: "./discount-target.component.html"
        })
    ], DiscountTargetComponent);
    return DiscountTargetComponent;
}());
exports.DiscountTargetComponent = DiscountTargetComponent;
//# sourceMappingURL=discount-target.component.js.map