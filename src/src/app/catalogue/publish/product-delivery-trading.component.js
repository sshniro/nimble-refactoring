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
var constants_1 = require("../model/constants");
var product_wrapper_1 = require("../../common/product-wrapper");
var text_1 = require("../model/publish/text");
var constants_2 = require("../model/constants");
var ProductDeliveryTradingComponent = /** @class */ (function () {
    function ProductDeliveryTradingComponent() {
        this.INCOTERMS = constants_1.INCOTERMS;
    }
    ProductDeliveryTradingComponent.prototype.ngOnInit = function () {
        if (this.wrapper.line.goodsItem.deliveryTerms.specialTerms == null || this.wrapper.line.goodsItem.deliveryTerms.specialTerms.length == 0) {
            this.wrapper.line.goodsItem.deliveryTerms.specialTerms = [new text_1.Text(null, constants_2.DEFAULT_LANGUAGE())];
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", product_wrapper_1.ProductWrapper)
    ], ProductDeliveryTradingComponent.prototype, "wrapper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProductDeliveryTradingComponent.prototype, "disabled", void 0);
    ProductDeliveryTradingComponent = __decorate([
        core_1.Component({
            selector: "product-delivery-trading",
            templateUrl: "./product-delivery-trading.component.html",
            styleUrls: ["./product-delivery-trading.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], ProductDeliveryTradingComponent);
    return ProductDeliveryTradingComponent;
}());
exports.ProductDeliveryTradingComponent = ProductDeliveryTradingComponent;
//# sourceMappingURL=product-delivery-trading.component.js.map