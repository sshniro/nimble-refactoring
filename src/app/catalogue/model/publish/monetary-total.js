"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amount_1 = require("./amount");
var MonetaryTotal = /** @class */ (function () {
    function MonetaryTotal(payableAmount) {
        if (payableAmount === void 0) { payableAmount = new amount_1.Amount(); }
        this.payableAmount = payableAmount;
    }
    return MonetaryTotal;
}());
exports.MonetaryTotal = MonetaryTotal;
//# sourceMappingURL=monetary-total.js.map