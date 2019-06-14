"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
/**
 * Created by suat on 10-Nov-17.
 */
var Consignment = /** @class */ (function () {
    function Consignment(grossWeightMeasure, grossVolumeMeasure, consolidatedShipment) {
        if (grossWeightMeasure === void 0) { grossWeightMeasure = new quantity_1.Quantity(); }
        if (grossVolumeMeasure === void 0) { grossVolumeMeasure = new quantity_1.Quantity(); }
        if (consolidatedShipment === void 0) { consolidatedShipment = []; }
        this.grossWeightMeasure = grossWeightMeasure;
        this.grossVolumeMeasure = grossVolumeMeasure;
        this.consolidatedShipment = consolidatedShipment;
    }
    return Consignment;
}());
exports.Consignment = Consignment;
//# sourceMappingURL=consignment.js.map