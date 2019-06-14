"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var utils_1 = require("../../../common/utils");
var price_wrapper_1 = require("../../../common/price-wrapper");
var trading_term_1 = require("../../../catalogue/model/publish/trading-term");
var multi_type_value_1 = require("../../../catalogue/model/publish/multi-type-value");
var RequestForQuotationWrapper = /** @class */ (function () {
    function RequestForQuotationWrapper(requestForQuotation, catalogueLine) {
        this.requestForQuotation = requestForQuotation;
        this.catalogueLine = catalogueLine;
        this.paymentTermsWrapper = new payment_terms_wrapper_1.PaymentTermsWrapper(requestForQuotation.paymentTerms);
        this.priceWrapper = new price_wrapper_1.PriceWrapper(requestForQuotation.requestForQuotationLine[0].lineItem.price, catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent, requestForQuotation.requestForQuotationLine[0].lineItem.quantity);
    }
    Object.defineProperty(RequestForQuotationWrapper.prototype, "priceAmount", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.price.priceAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "orderedQuantity", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "deliveryPeriod", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "deliveryPeriodString", {
        get: function () {
            return utils_1.durationToString(this.deliveryPeriod);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "warranty", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.warrantyValidityPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "warrantyString", {
        get: function () {
            return utils_1.durationToString(this.warranty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "incoterms", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms;
        },
        set: function (incoterms) {
            this.requestForQuotation.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms = incoterms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "incotermsString", {
        get: function () {
            return this.requestForQuotation.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms || "None";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "paymentMeans", {
        get: function () {
            return this.requestForQuotation.paymentMeans.paymentMeansCode.value;
        },
        set: function (paymentMeans) {
            this.requestForQuotation.paymentMeans.paymentMeansCode.value = paymentMeans;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestForQuotationWrapper.prototype, "frameContractDuration", {
        get: function () {
            var tradingTerm = this.requestForQuotation.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm != null) {
                return tradingTerm.value.valueQuantity[0];
            }
            return null;
        },
        set: function (duration) {
            var tradingTerm = this.requestForQuotation.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm == null) {
                tradingTerm = new trading_term_1.TradingTerm("FRAME_CONTRACT_DURATION", null, null, new multi_type_value_1.MultiTypeValue());
                tradingTerm.value.valueQuantity.push(duration);
                this.requestForQuotation.tradingTerms.push(tradingTerm);
            }
            else {
                tradingTerm.value.valueQuantity[0] = duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    return RequestForQuotationWrapper;
}());
exports.RequestForQuotationWrapper = RequestForQuotationWrapper;
//# sourceMappingURL=request-for-quotation-wrapper.js.map