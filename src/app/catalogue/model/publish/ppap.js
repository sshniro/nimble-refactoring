"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ppap = /** @class */ (function () {
    function Ppap(id, note, documentType, buyerCustomerParty, sellerSupplierParty, lineItem, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (documentType === void 0) { documentType = null; }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = null; }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = null; }
        if (lineItem === void 0) { lineItem = null; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.documentType = documentType;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.lineItem = lineItem;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return Ppap;
}());
exports.Ppap = Ppap;
//# sourceMappingURL=ppap.js.map