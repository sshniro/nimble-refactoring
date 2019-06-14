"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 05-Oct-17.
 */
var ReceiptAdvice = /** @class */ (function () {
    function ReceiptAdvice(id, note, orderReference, despatchDocumentReference, deliveryCustomerParty, despatchSupplierParty, receiptLine, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = [""]; }
        if (orderReference === void 0) { orderReference = null; }
        if (despatchDocumentReference === void 0) { despatchDocumentReference = null; }
        if (deliveryCustomerParty === void 0) { deliveryCustomerParty = null; }
        if (despatchSupplierParty === void 0) { despatchSupplierParty = null; }
        if (receiptLine === void 0) { receiptLine = null; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.orderReference = orderReference;
        this.despatchDocumentReference = despatchDocumentReference;
        this.deliveryCustomerParty = deliveryCustomerParty;
        this.despatchSupplierParty = despatchSupplierParty;
        this.receiptLine = receiptLine;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return ReceiptAdvice;
}());
exports.ReceiptAdvice = ReceiptAdvice;
//# sourceMappingURL=receipt-advice.js.map