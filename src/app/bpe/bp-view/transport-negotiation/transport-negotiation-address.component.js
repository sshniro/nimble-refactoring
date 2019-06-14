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
var line_item_1 = require("../../../catalogue/model/publish/line-item");
var TransportNegotiationAddressComponent = /** @class */ (function () {
    function TransportNegotiationAddressComponent() {
    }
    TransportNegotiationAddressComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", line_item_1.LineItem)
    ], TransportNegotiationAddressComponent.prototype, "lineItem", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TransportNegotiationAddressComponent.prototype, "disabled", void 0);
    TransportNegotiationAddressComponent = __decorate([
        core_1.Component({
            selector: "transport-negotiation-address",
            templateUrl: "./transport-negotiation-address.component.html"
        }),
        __metadata("design:paramtypes", [])
    ], TransportNegotiationAddressComponent);
    return TransportNegotiationAddressComponent;
}());
exports.TransportNegotiationAddressComponent = TransportNegotiationAddressComponent;
//# sourceMappingURL=transport-negotiation-address.component.js.map