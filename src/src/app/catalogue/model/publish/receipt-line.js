"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
/**
 * Created by suat on 05-Oct-17.
 */
var ReceiptLine = /** @class */ (function () {
    function ReceiptLine(rejectedQuantity, rejectReason, item) {
        if (rejectedQuantity === void 0) { rejectedQuantity = new quantity_1.Quantity(); }
        if (rejectReason === void 0) { rejectReason = []; }
        if (item === void 0) { item = null; }
        this.rejectedQuantity = rejectedQuantity;
        this.rejectReason = rejectReason;
        this.item = item;
    }
    return ReceiptLine;
}());
exports.ReceiptLine = ReceiptLine;
//# sourceMappingURL=receipt-line.js.map