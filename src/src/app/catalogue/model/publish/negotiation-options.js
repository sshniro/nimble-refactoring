"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NegotiationOptions = /** @class */ (function () {
    function NegotiationOptions(price, deliveryPeriod, warranty, incoterms, paymentTerms, paymentMeans, frameContractDuration, termsAndConditions) {
        if (price === void 0) { price = false; }
        if (deliveryPeriod === void 0) { deliveryPeriod = false; }
        if (warranty === void 0) { warranty = false; }
        if (incoterms === void 0) { incoterms = false; }
        if (paymentTerms === void 0) { paymentTerms = false; }
        if (paymentMeans === void 0) { paymentMeans = false; }
        if (frameContractDuration === void 0) { frameContractDuration = false; }
        if (termsAndConditions === void 0) { termsAndConditions = false; }
        this.price = price;
        this.deliveryPeriod = deliveryPeriod;
        this.warranty = warranty;
        this.incoterms = incoterms;
        this.paymentTerms = paymentTerms;
        this.paymentMeans = paymentMeans;
        this.frameContractDuration = frameContractDuration;
        this.termsAndConditions = termsAndConditions;
    }
    return NegotiationOptions;
}());
exports.NegotiationOptions = NegotiationOptions;
//# sourceMappingURL=negotiation-options.js.map