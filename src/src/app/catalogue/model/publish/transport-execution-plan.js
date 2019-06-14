"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var party_1 = require("./party");
var code_1 = require("./code");
var document_reference_1 = require("./document-reference");
/**
 * Created by suat on 10-Nov-17.
 */
var TransportExecutionPlan = /** @class */ (function () {
    function TransportExecutionPlan(id, note, documentStatusCode, documentStatusReasonCode, transportUserParty, transportServiceProviderParty, transportExecutionPlanRequestDocumentReference, additionalDocumentReference) {
        if (id === void 0) { id = null; }
        if (note === void 0) { note = ['']; }
        if (documentStatusCode === void 0) { documentStatusCode = new code_1.Code(); }
        if (documentStatusReasonCode === void 0) { documentStatusReasonCode = new code_1.Code(); }
        if (transportUserParty === void 0) { transportUserParty = new party_1.Party(); }
        if (transportServiceProviderParty === void 0) { transportServiceProviderParty = new party_1.Party(); }
        if (transportExecutionPlanRequestDocumentReference === void 0) { transportExecutionPlanRequestDocumentReference = new document_reference_1.DocumentReference(); }
        if (additionalDocumentReference === void 0) { additionalDocumentReference = []; }
        this.id = id;
        this.note = note;
        this.documentStatusCode = documentStatusCode;
        this.documentStatusReasonCode = documentStatusReasonCode;
        this.transportUserParty = transportUserParty;
        this.transportServiceProviderParty = transportServiceProviderParty;
        this.transportExecutionPlanRequestDocumentReference = transportExecutionPlanRequestDocumentReference;
        this.additionalDocumentReference = additionalDocumentReference;
    }
    return TransportExecutionPlan;
}());
exports.TransportExecutionPlan = TransportExecutionPlan;
//# sourceMappingURL=transport-execution-plan.js.map