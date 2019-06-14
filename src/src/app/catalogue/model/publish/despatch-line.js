"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
/**
 * Created by suat on 05-Oct-17.
 */
var DespatchLine = /** @class */ (function () {
    function DespatchLine(deliveredQuantity, item, shipment) {
        if (deliveredQuantity === void 0) { deliveredQuantity = new quantity_1.Quantity(); }
        if (item === void 0) { item = null; }
        if (shipment === void 0) { shipment = []; }
        this.deliveredQuantity = deliveredQuantity;
        this.item = item;
        this.shipment = shipment;
    }
    return DespatchLine;
}());
exports.DespatchLine = DespatchLine;
//# sourceMappingURL=despatch-line.js.map