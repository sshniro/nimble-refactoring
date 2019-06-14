"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestForQuotation = /** @class */ (function () {
    function RequestForQuotation(id, note, dataMonitoringRequested, buyerCustomerParty, sellerSupplierParty, delivery, requestForQuotationLine, negotiationOptions, paymentMeans, paymentTerms, tradingTerms, termOrCondition, additionalDocumentReference) {
        if (note === void 0) { note = ['']; }
        if (termOrCondition === void 0) { termOrCondition = []; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.dataMonitoringRequested = dataMonitoringRequested;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.delivery = delivery;
        this.requestForQuotationLine = requestForQuotationLine;
        this.negotiationOptions = negotiationOptions;
        this.paymentMeans = paymentMeans;
        this.paymentTerms = paymentTerms;
        this.tradingTerms = tradingTerms;
        this.termOrCondition = termOrCondition;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return RequestForQuotation;
}());
exports.RequestForQuotation = RequestForQuotation;
//# sourceMappingURL=request-for-quotation.js.map