"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var party_1 = require("./party");
var period_1 = require("./period");
var consignment_1 = require("./consignment");
var location_1 = require("./location");
var item_1 = require("./item");
/**
 * Created by suat on 10-Nov-17.
 */
var TransportExecutionPlanRequest = /** @class */ (function () {
    function TransportExecutionPlanRequest(id, note, transportUserParty, transportContract, transportServiceProviderParty, mainTransportationService, serviceStartTimePeriod, serviceEndTimePeriod, fromLocation, toLocation, consignment, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (transportUserParty === void 0) { transportUserParty = new party_1.Party(); }
        if (transportContract === void 0) { transportContract = null; }
        if (transportServiceProviderParty === void 0) { transportServiceProviderParty = new party_1.Party(); }
        if (mainTransportationService === void 0) { mainTransportationService = new item_1.Item(); }
        if (serviceStartTimePeriod === void 0) { serviceStartTimePeriod = new period_1.Period(); }
        if (serviceEndTimePeriod === void 0) { serviceEndTimePeriod = new period_1.Period(); }
        if (fromLocation === void 0) { fromLocation = new location_1.Location(); }
        if (toLocation === void 0) { toLocation = new location_1.Location(); }
        if (consignment === void 0) { consignment = [new consignment_1.Consignment()]; }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.transportUserParty = transportUserParty;
        this.transportContract = transportContract;
        this.transportServiceProviderParty = transportServiceProviderParty;
        this.mainTransportationService = mainTransportationService;
        this.serviceStartTimePeriod = serviceStartTimePeriod;
        this.serviceEndTimePeriod = serviceEndTimePeriod;
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.consignment = consignment;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return TransportExecutionPlanRequest;
}());
exports.TransportExecutionPlanRequest = TransportExecutionPlanRequest;
//# sourceMappingURL=transport-execution-plan-request.js.map