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
var bp_data_service_1 = require("../bp-data-service");
/**
 * Created by suat on 20-Sep-17.
 */
var FulfilmentComponent = /** @class */ (function () {
    function FulfilmentComponent(bpDataService) {
        this.bpDataService = bpDataService;
    }
    FulfilmentComponent.prototype.ngOnInit = function () {
        this.line = this.bpDataService.getCatalogueLine();
    };
    FulfilmentComponent.prototype.showReceiptAdvice = function () {
        return this.bpDataService.bpActivityEvent.userRole === "buyer" || !!this.bpDataService.receiptAdvice;
    };
    FulfilmentComponent = __decorate([
        core_1.Component({
            selector: "fulfilment",
            templateUrl: "./fulfilment.component.html"
        }),
        __metadata("design:paramtypes", [bp_data_service_1.BPDataService])
    ], FulfilmentComponent);
    return FulfilmentComponent;
}());
exports.FulfilmentComponent = FulfilmentComponent;
//# sourceMappingURL=fulfilment.component.js.map