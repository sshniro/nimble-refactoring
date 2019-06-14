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
var catalogue_line_1 = require("../../model/publish/catalogue-line");
var forms_1 = require("@angular/forms");
var constants_1 = require("../../model/constants");
var ProductTradingDetailsComponent = /** @class */ (function () {
    function ProductTradingDetailsComponent() {
        this.INCOTERMS = constants_1.INCOTERMS;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductTradingDetailsComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], ProductTradingDetailsComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], ProductTradingDetailsComponent.prototype, "parentForm", void 0);
    ProductTradingDetailsComponent = __decorate([
        core_1.Component({
            selector: 'product-trading-details',
            templateUrl: './product-trading-details.component.html',
        })
        // Component that displays warranty information etc. inside the "trading details" tab in CatalogueLineView
    ], ProductTradingDetailsComponent);
    return ProductTradingDetailsComponent;
}());
exports.ProductTradingDetailsComponent = ProductTradingDetailsComponent;
//# sourceMappingURL=product-trading-details.component.js.map