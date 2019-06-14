"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Wrapper for the price of a single item (or at least, for the base quantity of this item).
 *
 * The aim of this class is to be a Quantity to be useable in all quantity based inputs.
 */
var ItemPriceWrapper = /** @class */ (function () {
    function ItemPriceWrapper(price) {
        this.price = price;
        /** hjid field from Quantity class */
        this.hjid = null;
    }
    Object.defineProperty(ItemPriceWrapper.prototype, "pricePerItem", {
        get: function () {
            var amount = this.price.priceAmount;
            var qty = this.price.baseQuantity;
            var baseQuantity = qty.value || 1;
            if (!amount.value || !qty.value) {
                return 0;
            }
            return amount.value / qty.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemPriceWrapper.prototype, "pricePerItemString", {
        get: function () {
            var amount = this.price.priceAmount;
            var qty = this.price.baseQuantity;
            var baseQuantity = qty.value || 1;
            if (!amount.value || !qty.value) {
                return "On demand";
            }
            if (baseQuantity === 1) {
                return utils_1.roundToTwoDecimals(amount.value) + " " + utils_1.currencyToString(amount.currencyID) + " per " + qty.unitCode;
            }
            return utils_1.roundToTwoDecimals(amount.value) + " " + utils_1.currencyToString(amount.currencyID) + " for " + baseQuantity + " " + qty.unitCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemPriceWrapper.prototype, "currency", {
        get: function () {
            return utils_1.currencyToString(this.price.priceAmount.currencyID);
        },
        set: function (currency) {
            this.price.priceAmount.currencyID = currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemPriceWrapper.prototype, "baseQuantity", {
        get: function () {
            return this.price.baseQuantity.value || 1;
        },
        enumerable: true,
        configurable: true
    });
    ItemPriceWrapper.prototype.hasPrice = function () {
        // != here gives "not null or undefined", which is the behaviour we want.
        return this.price.priceAmount.value != null;
    };
    Object.defineProperty(ItemPriceWrapper.prototype, "value", {
        /**
         * Getters/Setters for quantity
         */
        get: function () {
            return this.price.priceAmount.value / this.baseQuantity;
        },
        set: function (value) {
            this.price.priceAmount.value = this.baseQuantity * value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemPriceWrapper.prototype, "unitCode", {
        get: function () {
            return this.currency;
        },
        set: function (unitCode) {
            this.currency = unitCode;
        },
        enumerable: true,
        configurable: true
    });
    return ItemPriceWrapper;
}());
exports.ItemPriceWrapper = ItemPriceWrapper;
//# sourceMappingURL=item-price-wrapper.js.map