"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var period_1 = require("./period");
var delivery_terms_1 = require("./delivery-terms");
var shipment_1 = require("./shipment");
var address_1 = require("./address");
/**
 * Created by deniz on 16/07/17.
 */
var Delivery = /** @class */ (function () {
    function Delivery(requestedDeliveryPeriod, deliveryAddress, deliveryTerms, shipment) {
        if (requestedDeliveryPeriod === void 0) { requestedDeliveryPeriod = new period_1.Period(); }
        if (deliveryAddress === void 0) { deliveryAddress = new address_1.Address(); }
        if (deliveryTerms === void 0) { deliveryTerms = new delivery_terms_1.DeliveryTerms(); }
        if (shipment === void 0) { shipment = new shipment_1.Shipment(); }
        this.requestedDeliveryPeriod = requestedDeliveryPeriod;
        this.deliveryAddress = deliveryAddress;
        this.deliveryTerms = deliveryTerms;
        this.shipment = shipment;
    }
    return Delivery;
}());
exports.Delivery = Delivery;
//# sourceMappingURL=delivery.js.map