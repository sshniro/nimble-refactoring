"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amount_1 = require("./amount");
var location_1 = require("./location");
var period_1 = require("./period");
/**
 * Created by deniz on 16/07/17.
 */
var DeliveryTerms = /** @class */ (function () {
    function DeliveryTerms(id, estimatedDeliveryPeriod, specialTerms, incoterms, amount, deliveryLocation, hjid) {
        if (id === void 0) { id = null; }
        if (estimatedDeliveryPeriod === void 0) { estimatedDeliveryPeriod = new period_1.Period(); }
        if (specialTerms === void 0) { specialTerms = []; }
        if (incoterms === void 0) { incoterms = null; }
        if (amount === void 0) { amount = new amount_1.Amount(); }
        if (deliveryLocation === void 0) { deliveryLocation = new location_1.Location(); }
        if (hjid === void 0) { hjid = null; }
        this.id = id;
        this.estimatedDeliveryPeriod = estimatedDeliveryPeriod;
        this.specialTerms = specialTerms;
        this.incoterms = incoterms;
        this.amount = amount;
        this.deliveryLocation = deliveryLocation;
        this.hjid = hjid;
    }
    DeliveryTerms.prototype.selectSpecialTerms = function (languageID) {
        for (var _i = 0, _a = this.specialTerms; _i < _a.length; _i++) {
            var pName = _a[_i];
            if (pName.languageID === languageID) {
                return pName.value;
            }
        }
        return this.specialTerms[0].value;
    };
    return DeliveryTerms;
}());
exports.DeliveryTerms = DeliveryTerms;
//# sourceMappingURL=delivery-terms.js.map