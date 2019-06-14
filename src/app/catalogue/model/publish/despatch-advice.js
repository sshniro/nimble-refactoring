"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 05-Oct-17.
 */
var DespatchAdvice = /** @class */ (function () {
    function DespatchAdvice(id, note, orderReference, deliveryCustomerParty, despatchSupplierParty, despatchLine, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (orderReference === void 0) { orderReference = []; }
        if (deliveryCustomerParty === void 0) { deliveryCustomerParty = null; }
        if (despatchSupplierParty === void 0) { despatchSupplierParty = null; }
        if (despatchLine === void 0) { despatchLine = []; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.orderReference = orderReference;
        this.deliveryCustomerParty = deliveryCustomerParty;
        this.despatchSupplierParty = despatchSupplierParty;
        this.despatchLine = despatchLine;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return DespatchAdvice;
}());
exports.DespatchAdvice = DespatchAdvice;
//# sourceMappingURL=despatch-advice.js.map