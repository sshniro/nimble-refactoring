"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var quantity_1 = require("./quantity");
/**
 * Created by deniz on 16/07/17.
 */
var Package = /** @class */ (function () {
    function Package(quantity, packagingTypeCode, hjid) {
        if (quantity === void 0) { quantity = new quantity_1.Quantity(); }
        if (packagingTypeCode === void 0) { packagingTypeCode = new code_1.Code(); }
        if (hjid === void 0) { hjid = null; }
        this.quantity = quantity;
        this.packagingTypeCode = packagingTypeCode;
        this.hjid = hjid;
    }
    return Package;
}());
exports.Package = Package;
//# sourceMappingURL=package.js.map