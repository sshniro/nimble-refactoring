"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 17-Sep-17.
 */
var Quotation = /** @class */ (function () {
    function Quotation(id, note, documentStatusCode, documentStatusReasonCode, lineCountNumeric, dataMonitoringPromised, requestForQuotationDocumentReference, buyerCustomerParty, sellerSupplierParty, quotationLine, paymentMeans, paymentTerms, tradingTerms, termOrCondition, additionalDocumentReference) {
        if (termOrCondition === void 0) { termOrCondition = []; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.documentStatusCode = documentStatusCode;
        this.documentStatusReasonCode = documentStatusReasonCode;
        this.lineCountNumeric = lineCountNumeric;
        this.dataMonitoringPromised = dataMonitoringPromised;
        this.requestForQuotationDocumentReference = requestForQuotationDocumentReference;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.quotationLine = quotationLine;
        this.paymentMeans = paymentMeans;
        this.paymentTerms = paymentTerms;
        this.tradingTerms = tradingTerms;
        this.termOrCondition = termOrCondition;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return Quotation;
}());
exports.Quotation = Quotation;
//# sourceMappingURL=quotation.js.map