"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../catalogue/model/constants");
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
var ServiceBridge_1 = require("../../common/ServiceBridge");
var constants_2 = require("../../common/constants");
var CompanyNegotiationSettings = /** @class */ (function () {
    function CompanyNegotiationSettings(paymentMeans, paymentTerms, incoterms, deliveryPeriodRanges, deliveryPeriodUnits, warrantyPeriodRanges, warrantyPeriodUnits) {
        if (paymentMeans === void 0) { paymentMeans = [].concat(constants_1.PAYMENT_MEANS); }
        if (paymentTerms === void 0) { paymentTerms = ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings(); }
        if (incoterms === void 0) { incoterms = [].concat(constants_1.INCOTERMS); }
        if (deliveryPeriodRanges === void 0) { deliveryPeriodRanges = [{ start: 0, end: 2500 }, { start: 0, end: 75 }, { start: 0, end: 100 }, { start: 0, end: 15 }, { start: 1, end: 12 }]; }
        if (deliveryPeriodUnits === void 0) { deliveryPeriodUnits = []; }
        if (warrantyPeriodRanges === void 0) { warrantyPeriodRanges = [{ start: 0, end: 48 }, { start: 0, end: 4 }]; }
        if (warrantyPeriodUnits === void 0) { warrantyPeriodUnits = []; }
        var _this = this;
        this.paymentMeans = paymentMeans;
        this.paymentTerms = paymentTerms;
        this.incoterms = incoterms;
        this.deliveryPeriodRanges = deliveryPeriodRanges;
        this.deliveryPeriodUnits = deliveryPeriodUnits;
        this.warrantyPeriodRanges = warrantyPeriodRanges;
        this.warrantyPeriodUnits = warrantyPeriodUnits;
        var unitService = ServiceBridge_1.ServiceBridge.unitService;
        unitService.getCachedUnitList(constants_2.deliveryPeriodUnitListId).then(function (list) { return _this.deliveryPeriodUnits = list; });
        unitService.getCachedUnitList(constants_2.warrantyPeriodUnitListId).then(function (list) { return _this.warrantyPeriodUnits = list; });
    }
    return CompanyNegotiationSettings;
}());
exports.CompanyNegotiationSettings = CompanyNegotiationSettings;
//# sourceMappingURL=company-negotiation-settings.js.map