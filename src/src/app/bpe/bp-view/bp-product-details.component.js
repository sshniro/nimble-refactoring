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
/**
 * Created by suat on 15-Nov-17.
 */
var core_1 = require("@angular/core");
var catalogue_line_1 = require("../../catalogue/model/publish/catalogue-line");
var BpProductDetailsComponent = /** @class */ (function () {
    function BpProductDetailsComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", catalogue_line_1.CatalogueLine)
    ], BpProductDetailsComponent.prototype, "catalogueLine", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BpProductDetailsComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BpProductDetailsComponent.prototype, "selectedTab", void 0);
    BpProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'bp-product-details',
            templateUrl: './bp-product-details.component.html'
        })
    ], BpProductDetailsComponent);
    return BpProductDetailsComponent;
}());
exports.BpProductDetailsComponent = BpProductDetailsComponent;
//# sourceMappingURL=bp-product-details.component.js.map