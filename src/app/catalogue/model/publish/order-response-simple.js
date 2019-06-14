"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OrderResponseSimple = /** @class */ (function () {
    function OrderResponseSimple(id, note, rejectionNote, acceptedIndicator, orderReference, sellerSupplierParty, buyerCustomerParty, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (rejectionNote === void 0) { rejectionNote = null; }
        if (acceptedIndicator === void 0) { acceptedIndicator = null; }
        if (orderReference === void 0) { orderReference = null; }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = null; }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = null; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.rejectionNote = rejectionNote;
        this.acceptedIndicator = acceptedIndicator;
        this.orderReference = orderReference;
        this.sellerSupplierParty = sellerSupplierParty;
        this.buyerCustomerParty = buyerCustomerParty;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return OrderResponseSimple;
}());
exports.OrderResponseSimple = OrderResponseSimple;
//# sourceMappingURL=order-response-simple.js.map