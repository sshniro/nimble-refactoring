"use strict";
/**
 * Created by deniz on 17/07/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Quantity = /** @class */ (function () {
    function Quantity(value, unitCode, hjid) {
        if (value === void 0) { value = null; }
        if (unitCode === void 0) { unitCode = null; }
        if (hjid === void 0) { hjid = null; }
        this.value = value;
        this.unitCode = unitCode;
        this.hjid = hjid;
    }
    return Quantity;
}());
exports.Quantity = Quantity;
//# sourceMappingURL=quantity.js.map