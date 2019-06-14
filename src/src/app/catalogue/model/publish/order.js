"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payment_means_1 = require("./payment-means");
var address_1 = require("./address");
var period_1 = require("./period");
var payment_terms_1 = require("./payment-terms");
var monetary_total_1 = require("./monetary-total");
var Order = /** @class */ (function () {
    function Order(id, note, requestedDeliveryPeriod, 
        // DO NOT USE, this is not saved in the back end...
        // use order.orderLine[0].lineItem.deliveryTerms.deliveryLocation.address instead.
        deliveryAddress, contract, buyerCustomerParty, sellerSupplierParty, paymentMeans, paymentTerms, anticipatedMonetaryTotal, orderLine, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (requestedDeliveryPeriod === void 0) { requestedDeliveryPeriod = new period_1.Period(); }
        if (deliveryAddress === void 0) { deliveryAddress = new address_1.Address(); }
        if (contract === void 0) { contract = null; }
        if (buyerCustomerParty === void 0) { buyerCustomerParty = null; }
        if (sellerSupplierParty === void 0) { sellerSupplierParty = null; }
        if (paymentMeans === void 0) { paymentMeans = new payment_means_1.PaymentMeans(); }
        if (paymentTerms === void 0) { paymentTerms = new payment_terms_1.PaymentTerms(); }
        if (anticipatedMonetaryTotal === void 0) { anticipatedMonetaryTotal = new monetary_total_1.MonetaryTotal(); }
        if (orderLine === void 0) { orderLine = null; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.requestedDeliveryPeriod = requestedDeliveryPeriod;
        this.deliveryAddress = deliveryAddress;
        this.contract = contract;
        this.buyerCustomerParty = buyerCustomerParty;
        this.sellerSupplierParty = sellerSupplierParty;
        this.paymentMeans = paymentMeans;
        this.paymentTerms = paymentTerms;
        this.anticipatedMonetaryTotal = anticipatedMonetaryTotal;
        this.orderLine = orderLine;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=order.js.map