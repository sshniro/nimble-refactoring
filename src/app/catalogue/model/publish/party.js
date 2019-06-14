"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var person_1 = require("./person");
var contact_1 = require("./contact");
/**
 * Created by suat on 12-May-17.
 */
var Party = /** @class */ (function () {
    function Party(hjid, ppapCompatibilityLevel, contact, postalAddress, person, certificate, partyIdentification, partyName) {
        if (hjid === void 0) { hjid = null; }
        if (ppapCompatibilityLevel === void 0) { ppapCompatibilityLevel = 0; }
        if (contact === void 0) { contact = new contact_1.Contact(); }
        if (postalAddress === void 0) { postalAddress = null; }
        if (person === void 0) { person = [new person_1.Person()]; }
        if (certificate === void 0) { certificate = null; }
        if (partyIdentification === void 0) { partyIdentification = null; }
        if (partyName === void 0) { partyName = null; }
        this.hjid = hjid;
        this.ppapCompatibilityLevel = ppapCompatibilityLevel;
        this.contact = contact;
        this.postalAddress = postalAddress;
        this.person = person;
        this.certificate = certificate;
        this.partyIdentification = partyIdentification;
        this.partyName = partyName;
    }
    return Party;
}());
exports.Party = Party;
//# sourceMappingURL=party.js.map