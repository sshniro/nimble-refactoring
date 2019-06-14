"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var commodity_classification_1 = require("./commodity-classification");
var dimension_1 = require("./dimension");
var shipment_stage_1 = require("./shipment-stage");
var environmental_emission_1 = require("./environmental-emission");
var service_frequency_type_1 = require("./service-frequency-type");
var period_1 = require("./period");
/**
 * Created by suat on 07-Nov-17.
 */
var TransportationService = /** @class */ (function () {
    function TransportationService(transportServiceCode, name, supportedCommodityClassification, totalCapacityDimension, shipmentStage, environmentalEmission, estimatedDurationPeriod, scheduledServiceFrequency) {
        if (transportServiceCode === void 0) { transportServiceCode = new code_1.Code(); }
        if (name === void 0) { name = null; }
        if (supportedCommodityClassification === void 0) { supportedCommodityClassification = [new commodity_classification_1.CommodityClassification()]; }
        if (totalCapacityDimension === void 0) { totalCapacityDimension = new dimension_1.Dimension(); }
        if (shipmentStage === void 0) { shipmentStage = [new shipment_stage_1.ShipmentStage()]; }
        if (environmentalEmission === void 0) { environmentalEmission = [new environmental_emission_1.EnvironmentalEmission()]; }
        if (estimatedDurationPeriod === void 0) { estimatedDurationPeriod = new period_1.Period(); }
        if (scheduledServiceFrequency === void 0) { scheduledServiceFrequency = [new service_frequency_type_1.ServiceFrequencyType()]; }
        this.transportServiceCode = transportServiceCode;
        this.name = name;
        this.supportedCommodityClassification = supportedCommodityClassification;
        this.totalCapacityDimension = totalCapacityDimension;
        this.shipmentStage = shipmentStage;
        this.environmentalEmission = environmentalEmission;
        this.estimatedDurationPeriod = estimatedDurationPeriod;
        this.scheduledServiceFrequency = scheduledServiceFrequency;
    }
    return TransportationService;
}());
exports.TransportationService = TransportationService;
//# sourceMappingURL=transportation-service.js.map