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
var shipment_1 = require("../../../catalogue/model/publish/shipment");
var ShipmentInputComponent = /** @class */ (function () {
    function ShipmentInputComponent() {
        this.presentationMode = "edit";
        this.disabled = false;
        // used to get correct format for the estimatedDeliveryDate of shipment
        this.date = null;
    }
    ShipmentInputComponent.prototype.ngOnInit = function () {
        this.setEstimatedDeliveryDate();
    };
    ShipmentInputComponent.prototype.setEstimatedDeliveryDate = function () {
        if (this.shipment.shipmentStage[0].estimatedDeliveryDate) {
            var dateParts = this.shipment.shipmentStage[0].estimatedDeliveryDate.trim().split('-');
            var index = dateParts[2].indexOf('T');
            if (index == -1) {
                this.date = dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
            }
            else {
                this.date = dateParts[1] + "/" + dateParts[2].substring(0, index) + "/" + dateParts[0];
            }
        }
        else {
            this.date = null;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", shipment_1.Shipment)
    ], ShipmentInputComponent.prototype, "shipment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ShipmentInputComponent.prototype, "presentationMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ShipmentInputComponent.prototype, "disabled", void 0);
    ShipmentInputComponent = __decorate([
        core_1.Component({
            selector: "shipment-input",
            templateUrl: "./shipment-input.component.html"
        }),
        __metadata("design:paramtypes", [])
    ], ShipmentInputComponent);
    return ShipmentInputComponent;
}());
exports.ShipmentInputComponent = ShipmentInputComponent;
//# sourceMappingURL=shipment-input.component.js.map