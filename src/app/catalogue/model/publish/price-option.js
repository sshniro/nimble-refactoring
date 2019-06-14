"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_location_quantity_1 = require("./item-location-quantity");
var PriceOption = /** @class */ (function () {
    function PriceOption(typeID, incoterms, estimatedDeliveryPeriod, additionalItemProperty, paymentMeans, paymentTerms, itemLocationQuantity, discount) {
        if (typeID === void 0) { typeID = null; }
        if (incoterms === void 0) { incoterms = null; }
        if (estimatedDeliveryPeriod === void 0) { estimatedDeliveryPeriod = null; }
        if (additionalItemProperty === void 0) { additionalItemProperty = null; }
        if (paymentMeans === void 0) { paymentMeans = null; }
        if (paymentTerms === void 0) { paymentTerms = null; }
        if (itemLocationQuantity === void 0) { itemLocationQuantity = new item_location_quantity_1.ItemLocationQuantity(); }
        if (discount === void 0) { discount = 0; }
        this.typeID = typeID;
        this.incoterms = incoterms;
        this.estimatedDeliveryPeriod = estimatedDeliveryPeriod;
        this.additionalItemProperty = additionalItemProperty;
        this.paymentMeans = paymentMeans;
        this.paymentTerms = paymentTerms;
        this.itemLocationQuantity = itemLocationQuantity;
        this.discount = discount;
    }
    return PriceOption;
}());
exports.PriceOption = PriceOption;
//# sourceMappingURL=price-option.js.map