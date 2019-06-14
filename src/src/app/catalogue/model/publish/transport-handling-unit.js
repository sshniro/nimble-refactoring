"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
/**
 * Created by suat on 15-Nov-17.
 */
var TransportHandlingUnit = /** @class */ (function () {
    function TransportHandlingUnit(transportHandlingUnitTypeCode, measurementDimension) {
        if (transportHandlingUnitTypeCode === void 0) { transportHandlingUnitTypeCode = new code_1.Code(); }
        if (measurementDimension === void 0) { measurementDimension = []; }
        this.transportHandlingUnitTypeCode = transportHandlingUnitTypeCode;
        this.measurementDimension = measurementDimension;
    }
    return TransportHandlingUnit;
}());
exports.TransportHandlingUnit = TransportHandlingUnit;
//# sourceMappingURL=transport-handling-unit.js.map