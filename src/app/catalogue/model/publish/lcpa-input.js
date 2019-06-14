"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quantity_1 = require("./quantity");
var amount_1 = require("./amount");
var LCPAInput = /** @class */ (function () {
    function LCPAInput(lifeCycleLength, purchasingPrice, assemblyCost, transportCost, consumableCost, energyConsumptionCost, maintenanceCost, sparePartCost, endOfLifeCost, additionalLCPAInputDetail) {
        if (lifeCycleLength === void 0) { lifeCycleLength = new quantity_1.Quantity(); }
        if (purchasingPrice === void 0) { purchasingPrice = new amount_1.Amount(); }
        if (assemblyCost === void 0) { assemblyCost = new amount_1.Amount(); }
        if (transportCost === void 0) { transportCost = new amount_1.Amount(); }
        if (consumableCost === void 0) { consumableCost = new amount_1.Amount(); }
        if (energyConsumptionCost === void 0) { energyConsumptionCost = new amount_1.Amount(); }
        if (maintenanceCost === void 0) { maintenanceCost = new amount_1.Amount(); }
        if (sparePartCost === void 0) { sparePartCost = new amount_1.Amount(); }
        if (endOfLifeCost === void 0) { endOfLifeCost = new amount_1.Amount(); }
        if (additionalLCPAInputDetail === void 0) { additionalLCPAInputDetail = []; }
        this.lifeCycleLength = lifeCycleLength;
        this.purchasingPrice = purchasingPrice;
        this.assemblyCost = assemblyCost;
        this.transportCost = transportCost;
        this.consumableCost = consumableCost;
        this.energyConsumptionCost = energyConsumptionCost;
        this.maintenanceCost = maintenanceCost;
        this.sparePartCost = sparePartCost;
        this.endOfLifeCost = endOfLifeCost;
        this.additionalLCPAInputDetail = additionalLCPAInputDetail;
    }
    return LCPAInput;
}());
exports.LCPAInput = LCPAInput;
//# sourceMappingURL=lcpa-input.js.map