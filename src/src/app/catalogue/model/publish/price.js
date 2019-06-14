"use strict";
/**
 * Created by suat on 12-May-17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var amount_1 = require("./amount");
var quantity_1 = require("./quantity");
var Price = /** @class */ (function () {
    function Price(priceAmount, baseQuantity) {
        if (priceAmount === void 0) { priceAmount = new amount_1.Amount(); }
        if (baseQuantity === void 0) { baseQuantity = new quantity_1.Quantity(); }
        this.priceAmount = priceAmount;
        this.baseQuantity = baseQuantity;
    }
    return Price;
}());
exports.Price = Price;
//# sourceMappingURL=price.js.map