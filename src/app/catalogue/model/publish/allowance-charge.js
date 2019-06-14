"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amount_1 = require("./amount");
/**
 * Created by suat on 28-Aug-18.
 */
var AllowanceCharge = /** @class */ (function () {
    function AllowanceCharge(amount, perUnitAmount) {
        if (amount === void 0) { amount = new amount_1.Amount(); }
        if (perUnitAmount === void 0) { perUnitAmount = new amount_1.Amount(); }
        this.amount = amount;
        this.perUnitAmount = perUnitAmount;
    }
    return AllowanceCharge;
}());
exports.AllowanceCharge = AllowanceCharge;
//# sourceMappingURL=allowance-charge.js.map