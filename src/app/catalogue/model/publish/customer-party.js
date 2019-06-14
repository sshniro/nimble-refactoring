"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var party_1 = require("./party");
/**
 * Created by suat on 25-Aug-17.
 */
var CustomerParty = /** @class */ (function () {
    function CustomerParty(party) {
        if (party === void 0) { party = new party_1.Party(); }
        this.party = party;
    }
    return CustomerParty;
}());
exports.CustomerParty = CustomerParty;
//# sourceMappingURL=customer-party.js.map