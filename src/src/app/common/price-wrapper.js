"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("../catalogue/model/publish/quantity");
var utils_1 = require("./utils");
var item_price_wrapper_1 = require("./item-price-wrapper");
var constants_1 = require("./constants");
/**
 * Wrapper around a price and a quantity, contains convenience methods to get the total price,
 * price per item and their string representations.
 *
 * This class can also be substituted for a Quantity.
 */
var PriceWrapper = /** @class */ (function () {
    function PriceWrapper(price, vatPercentage, orderedQuantity) {
        if (vatPercentage === void 0) { vatPercentage = constants_1.defaultVatRate; }
        if (orderedQuantity === void 0) { orderedQuantity = new quantity_1.Quantity(1, price.baseQuantity.unitCode); }
        this.price = price;
        this.vatPercentage = vatPercentage;
        this.orderedQuantity = orderedQuantity;
        this.itemPrice = new item_price_wrapper_1.ItemPriceWrapper(price);
    }
    Object.defineProperty(PriceWrapper.prototype, "totalPrice", {
        get: function () {
            if (!this.hasPrice()) {
                return 0;
            }
            var amount = Number(this.price.priceAmount.value);
            var baseQuantity = this.price.baseQuantity.value || 1;
            return this.orderedQuantity.value * amount / baseQuantity;
        },
        set: function (price) {
            var quantity = this.orderedQuantity.value || 1;
            var baseQuantity = this.price.baseQuantity.value || 1;
            this.price.priceAmount.value = price / quantity * baseQuantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "totalPriceString", {
        get: function () {
            if (!this.hasPrice()) {
                return "Not specified";
            }
            return utils_1.roundToTwoDecimals(this.totalPrice) + " " + this.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "pricePerItem", {
        get: function () {
            return this.price.priceAmount.value / this.price.baseQuantity.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "pricePerItemString", {
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
    Object.defineProperty(PriceWrapper.prototype, "pricePerBaseQuantity", {
        get: function () {
            return this.pricePerItem * this.itemPrice.baseQuantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "vatTotal", {
        get: function () {
            return this.totalPrice * this.vatPercentage / 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "vatTotalString", {
        get: function () {
            return utils_1.roundToTwoDecimals(this.vatTotal) + " " + this.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "grossTotal", {
        get: function () {
            return this.totalPrice + this.vatTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "grossTotalString", {
        get: function () {
            return this.totalPrice + this.vatTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceWrapper.prototype, "currency", {
        get: function () {
            return utils_1.currencyToString(this.price.priceAmount.currencyID);
        },
        set: function (currency) {
            this.price.priceAmount.currencyID = currency;
        },
        enumerable: true,
        configurable: true
    });
    PriceWrapper.prototype.hasPrice = function () {
        // != here gives "not null or undefined", which is the behaviour we want.
        return this.price.priceAmount.value != null;
    };
    return PriceWrapper;
}());
exports.PriceWrapper = PriceWrapper;
//# sourceMappingURL=price-wrapper.js.map