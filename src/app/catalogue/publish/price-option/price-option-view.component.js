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
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var constants_1 = require("../../model/constants");
var PriceOptionViewComponent = /** @class */ (function () {
    function PriceOptionViewComponent() {
        this.incoterms = [];
        this.paymentMeans = [];
        this.deliveryPeriodUnits = [];
        this.priceOptions = constants_1.PRICE_OPTIONS;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], PriceOptionViewComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", price_option_1.PriceOption)
    ], PriceOptionViewComponent.prototype, "priceOption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PriceOptionViewComponent.prototype, "incoterms", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PriceOptionViewComponent.prototype, "paymentMeans", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PriceOptionViewComponent.prototype, "deliveryPeriodUnits", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PriceOptionViewComponent.prototype, "discountUnits", void 0);
    PriceOptionViewComponent = __decorate([
        core_1.Component({
            selector: "price-option-view",
            templateUrl: "./price-option-view-component.html"
        })
    ], PriceOptionViewComponent);
    return PriceOptionViewComponent;
}());
exports.PriceOptionViewComponent = PriceOptionViewComponent;
//# sourceMappingURL=price-option-view.component.js.map