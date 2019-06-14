"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var goods_item_1 = require("./goods-item");
var address_1 = require("./address");
var transport_handling_unit_1 = require("./transport-handling-unit");
var quantity_1 = require("./quantity");
var consignment_1 = require("./consignment");
var Shipment = /** @class */ (function () {
    function Shipment(handlingInstructions, totalTransportHandlingUnitQuantity, consignment, goodsItem, shipmentStage, transportHandlingUnit, originAddress) {
        if (handlingInstructions === void 0) { handlingInstructions = []; }
        if (totalTransportHandlingUnitQuantity === void 0) { totalTransportHandlingUnitQuantity = new quantity_1.Quantity(); }
        if (consignment === void 0) { consignment = [new consignment_1.Consignment()]; }
        if (goodsItem === void 0) { goodsItem = [new goods_item_1.GoodsItem()]; }
        if (shipmentStage === void 0) { shipmentStage = []; }
        if (transportHandlingUnit === void 0) { transportHandlingUnit = [new transport_handling_unit_1.TransportHandlingUnit()]; }
        if (originAddress === void 0) { originAddress = new address_1.Address(); }
        this.handlingInstructions = handlingInstructions;
        this.totalTransportHandlingUnitQuantity = totalTransportHandlingUnitQuantity;
        this.consignment = consignment;
        this.goodsItem = goodsItem;
        this.shipmentStage = shipmentStage;
        this.transportHandlingUnit = transportHandlingUnit;
        this.originAddress = originAddress;
    }
    Shipment.prototype.selectHandlingInstructions = function (languageID) {
        for (var _i = 0, _a = this.handlingInstructions; _i < _a.length; _i++) {
            var pName = _a[_i];
            if (pName.languageID === languageID) {
                return pName.value;
            }
        }
        return this.handlingInstructions[0].value;
    };
    return Shipment;
}());
exports.Shipment = Shipment;
//# sourceMappingURL=shipment.js.map