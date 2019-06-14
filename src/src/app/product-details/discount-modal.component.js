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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var constants_1 = require("../catalogue/model/constants");
var utils_1 = require("../common/utils");
var DiscountModalComponent = /** @class */ (function () {
    function DiscountModalComponent(modalService) {
        this.modalService = modalService;
        this.orderedQuantityDiscounts = [];
        this.productPropertyDiscounts = [];
        this.deliveryPeriodDiscounts = [];
        this.incotermDiscounts = [];
        this.paymentMeanDiscounts = [];
        this.deliveryLocationDiscount = [];
        this.PRICE_OPTIONS = constants_1.PRICE_OPTIONS;
        this.currencyId = null;
        this.totalDiscount = null;
        this.getPropertyName = utils_1.selectPreferredValues;
    }
    DiscountModalComponent.prototype.ngOnInit = function () {
    };
    DiscountModalComponent.prototype.open = function (appliedDiscounts, currencyId) {
        this.currencyId = currencyId;
        this.resetDiscounts();
        for (var _i = 0, appliedDiscounts_1 = appliedDiscounts; _i < appliedDiscounts_1.length; _i++) {
            var discount = appliedDiscounts_1[_i];
            switch (discount.typeID) {
                case constants_1.PRICE_OPTIONS.ORDERED_QUANTITY.typeID:
                    this.orderedQuantityDiscounts.push(discount);
                    break;
                case constants_1.PRICE_OPTIONS.DELIVERY_LOCATION.typeID:
                    this.deliveryLocationDiscount.push(discount);
                    break;
                case constants_1.PRICE_OPTIONS.PRODUCT_PROPERTY.typeID:
                    this.productPropertyDiscounts.push(discount);
                    break;
                case constants_1.PRICE_OPTIONS.DELIVERY_PERIOD.typeID:
                    this.deliveryPeriodDiscounts.push(discount);
                    break;
                case constants_1.PRICE_OPTIONS.INCOTERM.typeID:
                    this.incotermDiscounts.push(discount);
                    break;
                case constants_1.PRICE_OPTIONS.PAYMENT_MEAN.typeID:
                    this.paymentMeanDiscounts.push(discount);
                    break;
            }
        }
        this.calculateTotalDiscount(appliedDiscounts);
        this.modalService.open(this.modal).result.then(function (result) {
        }, function () {
        });
    };
    DiscountModalComponent.prototype.resetDiscounts = function () {
        this.orderedQuantityDiscounts = [];
        this.deliveryLocationDiscount = [];
        this.productPropertyDiscounts = [];
        this.deliveryPeriodDiscounts = [];
        this.incotermDiscounts = [];
        this.paymentMeanDiscounts = [];
    };
    DiscountModalComponent.prototype.calculateTotalDiscount = function (appliedDiscounts) {
        var totalDiscount = 0;
        for (var _i = 0, appliedDiscounts_2 = appliedDiscounts; _i < appliedDiscounts_2.length; _i++) {
            var discount = appliedDiscounts_2[_i];
            totalDiscount += discount.discount;
        }
        this.totalDiscount = totalDiscount;
    };
    DiscountModalComponent.prototype.getAbsValue = function (value) {
        return utils_1.roundToTwoDecimals(Math.abs(value));
    };
    __decorate([
        core_1.ViewChild("modal"),
        __metadata("design:type", core_1.ElementRef)
    ], DiscountModalComponent.prototype, "modal", void 0);
    DiscountModalComponent = __decorate([
        core_1.Component({
            selector: "discount-modal",
            templateUrl: "./discount-modal.component.html",
            styleUrls: ['./discount-modal.component.css']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], DiscountModalComponent);
    return DiscountModalComponent;
}());
exports.DiscountModalComponent = DiscountModalComponent;
//# sourceMappingURL=discount-modal.component.js.map