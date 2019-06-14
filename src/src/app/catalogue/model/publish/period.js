"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
/**
 * Created by deniz on 15/07/17.
 */
var Period = /** @class */ (function () {
    function Period(startDate, // TODO not sure about string for date/time
        startTime, endDate, endTime, durationMeasure, hjid) {
        if (startDate === void 0) { startDate = null; }
        if (startTime === void 0) { startTime = null; }
        if (endDate === void 0) { endDate = null; }
        if (endTime === void 0) { endTime = null; }
        if (durationMeasure === void 0) { durationMeasure = new quantity_1.Quantity(null, null, null); }
        if (hjid === void 0) { hjid = null; }
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.durationMeasure = durationMeasure;
        this.hjid = hjid;
    }
    return Period;
}());
exports.Period = Period;
//# sourceMappingURL=period.js.map