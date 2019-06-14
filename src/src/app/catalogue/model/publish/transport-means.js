"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var transport_equipment_1 = require("./transport-equipment");
/**
 * Created by suat on 09-Nov-17.
 */
var TransportMeans = /** @class */ (function () {
    function TransportMeans(transportMeansTypeCode, transportEquipment) {
        if (transportMeansTypeCode === void 0) { transportMeansTypeCode = new code_1.Code(); }
        if (transportEquipment === void 0) { transportEquipment = [new transport_equipment_1.TransportEquipment()]; }
        this.transportMeansTypeCode = transportMeansTypeCode;
        this.transportEquipment = transportEquipment;
    }
    return TransportMeans;
}());
exports.TransportMeans = TransportMeans;
//# sourceMappingURL=transport-means.js.map