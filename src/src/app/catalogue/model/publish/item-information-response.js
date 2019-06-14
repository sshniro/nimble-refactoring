"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_party_1 = require("./customer-party");
var supplier_party_1 = require("./supplier-party");
var document_reference_1 = require("./document-reference");
var item_1 = require("./item");
var ItemInformationResponse = /** @class */ (function () {
    function ItemInformationResponse(id, note, itemInformationRequestDocumentReference, buyerCustomerParty, sellerSupplierParty, item, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (itemInformationRequestDocumentReference === void 0) { itemInformationRequestDocumentReference = new document_reference_1.DocumentReference(); }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = new customer_party_1.CustomerParty(); }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = new supplier_party_1.SupplierParty(); }
        if (item === void 0) { item = [new item_1.Item()]; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.itemInformationRequestDocumentReference = itemInformationRequestDocumentReference;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.item = item;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return ItemInformationResponse;
}());
exports.ItemInformationResponse = ItemInformationResponse;
//# sourceMappingURL=item-information-response.js.map