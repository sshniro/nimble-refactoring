"use strict";
/**
 * Created by suat on 12-May-17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var party_1 = require("./party");
var item_identification_1 = require("./item-identification");
var document_reference_1 = require("./document-reference");
var transportation_service_1 = require("./transportation-service");
var track_and_trace_details_1 = require("./track-and-trace-details");
var life_cycle_performance_assessment_details_1 = require("./life-cycle-performance-assessment-details");
var Item = /** @class */ (function () {
    function Item(name, description, itemSpecificationDocumentReference, productImage, additionalItemProperty, manufacturerParty, manufacturersItemIdentification, catalogueDocumentReference, commodityClassification, certificate, dimension, transportationServiceDetails, trackAndTraceDetails, lifeCyclePerformanceAssessmentDetails) {
        if (name === void 0) { name = []; }
        if (description === void 0) { description = []; }
        if (itemSpecificationDocumentReference === void 0) { itemSpecificationDocumentReference = []; }
        if (productImage === void 0) { productImage = []; }
        if (additionalItemProperty === void 0) { additionalItemProperty = []; }
        if (manufacturerParty === void 0) { manufacturerParty = new party_1.Party(); }
        if (manufacturersItemIdentification === void 0) { manufacturersItemIdentification = new item_identification_1.ItemIdentification(); }
        if (catalogueDocumentReference === void 0) { catalogueDocumentReference = new document_reference_1.DocumentReference(); }
        if (commodityClassification === void 0) { commodityClassification = []; }
        if (certificate === void 0) { certificate = []; }
        if (dimension === void 0) { dimension = []; }
        if (transportationServiceDetails === void 0) { transportationServiceDetails = new transportation_service_1.TransportationService(); }
        if (trackAndTraceDetails === void 0) { trackAndTraceDetails = new track_and_trace_details_1.TrackAndTraceDetails(); }
        if (lifeCyclePerformanceAssessmentDetails === void 0) { lifeCyclePerformanceAssessmentDetails = new life_cycle_performance_assessment_details_1.LifeCyclePerformanceAssessmentDetails(); }
        this.name = name;
        this.description = description;
        this.itemSpecificationDocumentReference = itemSpecificationDocumentReference;
        this.productImage = productImage;
        this.additionalItemProperty = additionalItemProperty;
        this.manufacturerParty = manufacturerParty;
        this.manufacturersItemIdentification = manufacturersItemIdentification;
        this.catalogueDocumentReference = catalogueDocumentReference;
        this.commodityClassification = commodityClassification;
        this.certificate = certificate;
        this.dimension = dimension;
        this.transportationServiceDetails = transportationServiceDetails;
        this.trackAndTraceDetails = trackAndTraceDetails;
        this.lifeCyclePerformanceAssessmentDetails = lifeCyclePerformanceAssessmentDetails;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=item.js.map