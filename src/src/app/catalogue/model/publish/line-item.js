"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
var item_1 = require("./item");
var price_1 = require("./price");
var line_reference_1 = require("./line-reference");
var period_1 = require("./period");
var delivery_terms_1 = require("./delivery-terms");
var delivery_1 = require("./delivery");
/**
 * Created by suat on 23-Aug-17.
 */
var LineItem = /** @class */ (function () {
    function LineItem(quantity, warrantyInformation, delivery, deliveryTerms, price, item, warrantyValidityPeriod, lineReference) {
        if (quantity === void 0) { quantity = new quantity_1.Quantity(); }
        if (warrantyInformation === void 0) { warrantyInformation = []; }
        if (delivery === void 0) { delivery = [new delivery_1.Delivery()]; }
        if (deliveryTerms === void 0) { deliveryTerms = new delivery_terms_1.DeliveryTerms(); }
        if (price === void 0) { price = new price_1.Price(); }
        if (item === void 0) { item = new item_1.Item(); }
        if (warrantyValidityPeriod === void 0) { warrantyValidityPeriod = new period_1.Period(); }
        if (lineReference === void 0) { lineReference = [new line_reference_1.LineReference()]; }
        this.quantity = quantity;
        this.warrantyInformation = warrantyInformation;
        this.delivery = delivery;
        this.deliveryTerms = deliveryTerms;
        this.price = price;
        this.item = item;
        this.warrantyValidityPeriod = warrantyValidityPeriod;
        this.lineReference = lineReference;
    }
    return LineItem;
}());
exports.LineItem = LineItem;
//# sourceMappingURL=line-item.js.map