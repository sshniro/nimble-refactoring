"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BpURLParams = /** @class */ (function () {
    function BpURLParams(catalogueId, catalogueLineId, processInstanceId, termsSource) {
        if (catalogueId === void 0) { catalogueId = null; }
        if (catalogueLineId === void 0) { catalogueLineId = null; }
        if (processInstanceId === void 0) { processInstanceId = null; }
        if (termsSource === void 0) { termsSource = null; }
        this.catalogueId = catalogueId;
        this.catalogueLineId = catalogueLineId;
        this.processInstanceId = processInstanceId;
        this.termsSource = termsSource;
    }
    return BpURLParams;
}());
exports.BpURLParams = BpURLParams;
//# sourceMappingURL=bpURLParams.js.map