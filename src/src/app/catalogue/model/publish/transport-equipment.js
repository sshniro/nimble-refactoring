"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
/**
 * Created by suat on 07-Nov-17.
 */
var TransportEquipment = /** @class */ (function () {
    function TransportEquipment(transportEquipmentTypeCode, humidityPercent, refrigeratedIndicator, characteristics) {
        if (transportEquipmentTypeCode === void 0) { transportEquipmentTypeCode = new code_1.Code(); }
        if (humidityPercent === void 0) { humidityPercent = null; }
        if (refrigeratedIndicator === void 0) { refrigeratedIndicator = false; }
        if (characteristics === void 0) { characteristics = null; }
        this.transportEquipmentTypeCode = transportEquipmentTypeCode;
        this.humidityPercent = humidityPercent;
        this.refrigeratedIndicator = refrigeratedIndicator;
        this.characteristics = characteristics;
    }
    return TransportEquipment;
}());
exports.TransportEquipment = TransportEquipment;
//# sourceMappingURL=transport-equipment.js.map