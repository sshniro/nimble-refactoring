"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
/**
 * Created by suat on 09-Nov-17.
 */
var ServiceFrequencyType = /** @class */ (function () {
    function ServiceFrequencyType(weekDayCode) {
        if (weekDayCode === void 0) { weekDayCode = new code_1.Code(); }
        this.weekDayCode = weekDayCode;
    }
    return ServiceFrequencyType;
}());
exports.ServiceFrequencyType = ServiceFrequencyType;
//# sourceMappingURL=service-frequency-type.js.map