"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PpapResponse = /** @class */ (function () {
    function PpapResponse(id, note, rejectionNote, acceptedIndicator, buyerCustomerParty, sellerSupplierParty, requestedDocument, ppapDocumentReference, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = []; }
        if (rejectionNote === void 0) { rejectionNote = null; }
        if (acceptedIndicator === void 0) { acceptedIndicator = null; }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = null; }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = null; }
        if (requestedDocument === void 0) { requestedDocument = null; }
        if (ppapDocumentReference === void 0) { ppapDocumentReference = null; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.rejectionNote = rejectionNote;
        this.acceptedIndicator = acceptedIndicator;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.requestedDocument = requestedDocument;
        this.ppapDocumentReference = ppapDocumentReference;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return PpapResponse;
}());
exports.PpapResponse = PpapResponse;
//# sourceMappingURL=ppap-response.js.map