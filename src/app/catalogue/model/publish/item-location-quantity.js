"use strict";
/**
 * Created by suat on 12-May-17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var price_1 = require("./price");
var allowance_charge_1 = require("./allowance-charge");
var tax_category_1 = require("./tax-category");
var ItemLocationQuantity = /** @class */ (function () {
    function ItemLocationQuantity(minimumQuantity, applicableTerritoryAddress, price, allowanceCharge, applicableTaxCategory) {
        if (minimumQuantity === void 0) { minimumQuantity = null; }
        if (applicableTerritoryAddress === void 0) { applicableTerritoryAddress = []; }
        if (price === void 0) { price = new price_1.Price(); }
        if (allowanceCharge === void 0) { allowanceCharge = [new allowance_charge_1.AllowanceCharge()]; }
        if (applicableTaxCategory === void 0) { applicableTaxCategory = [new tax_category_1.TaxCategory()]; }
        this.minimumQuantity = minimumQuantity;
        this.applicableTerritoryAddress = applicableTerritoryAddress;
        this.price = price;
        this.allowanceCharge = allowanceCharge;
        this.applicableTaxCategory = applicableTaxCategory;
    }
    return ItemLocationQuantity;
}());
exports.ItemLocationQuantity = ItemLocationQuantity;
//# sourceMappingURL=item-location-quantity.js.map