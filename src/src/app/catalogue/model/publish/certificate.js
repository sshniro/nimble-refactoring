"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
/**
 * Created by deniz on 16/07/17.
 */
var Certificate = /** @class */ (function () {
    function Certificate(certificateType, certificateTypeCode, remarks, documentReference, country, hjid) {
        if (certificateType === void 0) { certificateType = ""; }
        if (certificateTypeCode === void 0) { certificateTypeCode = new code_1.Code(); }
        if (remarks === void 0) { remarks = ""; }
        if (documentReference === void 0) { documentReference = []; }
        if (country === void 0) { country = []; }
        if (hjid === void 0) { hjid = null; }
        this.certificateType = certificateType;
        this.certificateTypeCode = certificateTypeCode;
        this.remarks = remarks;
        this.documentReference = documentReference;
        this.country = country;
        this.hjid = hjid;
    }
    return Certificate;
}());
exports.Certificate = Certificate;
//# sourceMappingURL=certificate.js.map