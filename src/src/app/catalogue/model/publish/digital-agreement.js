"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var digital_agreement_terms_1 = require("./digital-agreement-terms");
var document_reference_1 = require("./document-reference");
var DigitalAgreement = /** @class */ (function () {
    function DigitalAgreement(id, participantParty, item, digitalAgreementTerms, quotationReference) {
        if (id === void 0) { id = ""; }
        if (participantParty === void 0) { participantParty = []; }
        if (item === void 0) { item = null; }
        if (digitalAgreementTerms === void 0) { digitalAgreementTerms = new digital_agreement_terms_1.DigitalAgreementTerms(); }
        if (quotationReference === void 0) { quotationReference = new document_reference_1.DocumentReference(); }
        this.id = id;
        this.participantParty = participantParty;
        this.item = item;
        this.digitalAgreementTerms = digitalAgreementTerms;
        this.quotationReference = quotationReference;
    }
    return DigitalAgreement;
}());
exports.DigitalAgreement = DigitalAgreement;
//# sourceMappingURL=digital-agreement.js.map