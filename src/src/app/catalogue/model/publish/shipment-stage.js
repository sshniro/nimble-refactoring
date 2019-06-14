"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var party_1 = require("./party");
var code_1 = require("./code");
var transport_means_1 = require("./transport-means");
var ShipmentStage = /** @class */ (function () {
    function ShipmentStage(transportModeCode, carrierParty, transportMeans, estimatedDeliveryDate) {
        if (transportModeCode === void 0) { transportModeCode = new code_1.Code(); }
        if (carrierParty === void 0) { carrierParty = new party_1.Party(); }
        if (transportMeans === void 0) { transportMeans = new transport_means_1.TransportMeans(); }
        if (estimatedDeliveryDate === void 0) { estimatedDeliveryDate = null; }
        this.transportModeCode = transportModeCode;
        this.carrierParty = carrierParty;
        this.transportMeans = transportMeans;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
    }
    return ShipmentStage;
}());
exports.ShipmentStage = ShipmentStage;
//# sourceMappingURL=shipment-stage.js.map