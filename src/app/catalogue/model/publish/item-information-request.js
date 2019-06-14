"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_party_1 = require("./customer-party");
var supplier_party_1 = require("./supplier-party");
var item_information_request_line_1 = require("./item-information-request-line");
var ItemInformationRequest = /** @class */ (function () {
    function ItemInformationRequest(id, note, buyerCustomerParty, sellerSupplierParty, itemInformationRequestLine, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = new customer_party_1.CustomerParty(); }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = new supplier_party_1.SupplierParty(); }
        if (itemInformationRequestLine === void 0) { itemInformationRequestLine = [new item_information_request_line_1.ItemInformationRequestLine()]; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.itemInformationRequestLine = itemInformationRequestLine;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return ItemInformationRequest;
}());
exports.ItemInformationRequest = ItemInformationRequest;
//# sourceMappingURL=item-information-request.js.map