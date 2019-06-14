"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var period_1 = require("./period");
var DigitalAgreementTerms = /** @class */ (function () {
    function DigitalAgreementTerms(validityPeriod) {
        if (validityPeriod === void 0) { validityPeriod = new period_1.Period(); }
        this.validityPeriod = validityPeriod;
    }
    return DigitalAgreementTerms;
}());
exports.DigitalAgreementTerms = DigitalAgreementTerms;
//# sourceMappingURL=digital-agreement-terms.js.map