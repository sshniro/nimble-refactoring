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
var myGlobals = require("../../globals");
var ProductBpStepsComponent = /** @class */ (function () {
    function ProductBpStepsComponent() {
        this.statusText = "";
        this.config = myGlobals.config;
        this.steps = ["0%", "17%", "33%", "50%", "67%", "83%"];
    }
    ProductBpStepsComponent.prototype.ngOnInit = function () {
        if (!this.config.showPPAP)
            this.steps = ["0%", "0%", "20%", "40%", "60%", "80%"];
    };
    ProductBpStepsComponent.prototype.getStatusTextStyle = function () {
        return {
            "margin-left": this.getStatusTextMarginLeft(),
            "color": this.getStatusTextColor()
        };
    };
    ProductBpStepsComponent.prototype.getStepClasses = function (step) {
        if (step === this.currentStep) {
            var result = {
                step: true,
                current: true
            };
            result[this.status.toLowerCase()] = true;
            return result;
        }
        return { step: true };
    };
    ProductBpStepsComponent.prototype.getStatusTextMarginLeft = function () {
        if (this.displayMode === "Transport") {
            switch (this.currentStep) {
                case "Transport_Information_Request":
                case "Item_Information_Request":
                    return "0%";
                case "Transport_Negotiation":
                    return "25%";
                case "Transport_Order":
                    return "50%";
                case "Transport_Order_Confirmed":
                    return "75%";
                default:
                    throw new Error("Unexpected step for displayMode 'Transport': " + this.currentStep);
            }
        }
        else if (this.displayMode === "Logistics") {
            return "42%";
        }
        else if (this.displayMode === "Transport_After_Order") {
            switch (this.currentStep) {
                case "Item_Information_Request":
                    return "0%";
                case "Transport_Information_Request":
                    return "17%";
                case "Transport_Negotiation":
                    return "33%";
                case "Transport_Order":
                    return "50%";
                case "Transport_Order_Confirmed":
                    return "67%";
                case "Fulfilment":
                    return "83%";
                default:
                    throw new Error("Unexpected step for displayMode 'Transport_After_Order': " + this.currentStep);
            }
        }
        else {
            switch (this.currentStep) {
                case "Item_Information_Request":
                    return this.steps[0];
                case "Ppap":
                    return this.steps[1];
                case "Negotiation":
                    return this.steps[2];
                case "Order":
                    return this.steps[3];
                case "Order_Confirmed":
                    return this.steps[4];
                case "Fulfilment":
                    return this.steps[5];
                default:
                    throw new Error("Unexpected step for displayMode 'Order': " + this.currentStep);
            }
        }
    };
    ProductBpStepsComponent.prototype.getStatusTextColor = function () {
        switch (this.status) {
            case "OPEN":
                return "#000000";
            case "WAITING":
                return "#c48601";
            case "ACTION_REQUIRED":
                return "#d30000";
            case "DONE":
                return "#007706";
            case "CANCELLED":
                return "#363636";
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductBpStepsComponent.prototype, "currentStep", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductBpStepsComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductBpStepsComponent.prototype, "displayMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProductBpStepsComponent.prototype, "statusText", void 0);
    ProductBpStepsComponent = __decorate([
        core_1.Component({
            selector: "product-bp-steps",
            templateUrl: "./product-bp-steps.component.html",
            styleUrls: ["./product-bp-steps.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], ProductBpStepsComponent);
    return ProductBpStepsComponent;
}());
exports.ProductBpStepsComponent = ProductBpStepsComponent;
//# sourceMappingURL=product-bp-steps.component.js.map