"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var quantity_1 = require("./quantity");
/**
 * Created by suat on 09-Nov-17.
 */
var EnvironmentalEmission = /** @class */ (function () {
    function EnvironmentalEmission(environmentalEmissionTypeCode, valueMeasure) {
        if (environmentalEmissionTypeCode === void 0) { environmentalEmissionTypeCode = new code_1.Code(); }
        if (valueMeasure === void 0) { valueMeasure = new quantity_1.Quantity(); }
        this.environmentalEmissionTypeCode = environmentalEmissionTypeCode;
        this.valueMeasure = valueMeasure;
    }
    return EnvironmentalEmission;
}());
exports.EnvironmentalEmission = EnvironmentalEmission;
//# sourceMappingURL=environmental-emission.js.map