"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 28-Mar-18.
 */
var ProcessInstanceGroupFilter = /** @class */ (function () {
    function ProcessInstanceGroupFilter(partyID, tradingPartnerIDs, tradingPartnerNames, relatedProducts, relatedProductCategories, status, startDate, endDate) {
        if (partyID === void 0) { partyID = null; }
        if (tradingPartnerIDs === void 0) { tradingPartnerIDs = []; }
        if (tradingPartnerNames === void 0) { tradingPartnerNames = []; }
        if (relatedProducts === void 0) { relatedProducts = []; }
        if (relatedProductCategories === void 0) { relatedProductCategories = []; }
        if (status === void 0) { status = []; }
        if (startDate === void 0) { startDate = ""; }
        if (endDate === void 0) { endDate = ""; }
        this.partyID = partyID;
        this.tradingPartnerIDs = tradingPartnerIDs;
        this.tradingPartnerNames = tradingPartnerNames;
        this.relatedProducts = relatedProducts;
        this.relatedProductCategories = relatedProductCategories;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    return ProcessInstanceGroupFilter;
}());
exports.ProcessInstanceGroupFilter = ProcessInstanceGroupFilter;
//# sourceMappingURL=process-instance-group-filter.js.map