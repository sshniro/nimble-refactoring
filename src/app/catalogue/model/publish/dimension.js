"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
/**
 * Created by deniz on 16/07/17.
 */
var Dimension = /** @class */ (function () {
    function Dimension(attributeID, measure) {
        if (attributeID === void 0) { attributeID = null; }
        if (measure === void 0) { measure = new quantity_1.Quantity(); }
        this.attributeID = attributeID;
        this.measure = measure;
    }
    return Dimension;
}());
exports.Dimension = Dimension;
//# sourceMappingURL=dimension.js.map