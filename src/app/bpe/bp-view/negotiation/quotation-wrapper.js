"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var utils_1 = require("../../../common/utils");
var price_wrapper_1 = require("../../../common/price-wrapper");
var trading_term_1 = require("../../../catalogue/model/publish/trading-term");
var multi_type_value_1 = require("../../../catalogue/model/publish/multi-type-value");
var QuotationWrapper = /** @class */ (function () {
    function QuotationWrapper(quotation, catalogueLine) {
        this.quotation = quotation;
        this.catalogueLine = catalogueLine;
        this.paymentTermsWrapper = new payment_terms_wrapper_1.PaymentTermsWrapper(quotation.paymentTerms);
        this.priceWrapper = new price_wrapper_1.PriceWrapper(quotation.quotationLine[0].lineItem.price, catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent, quotation.quotationLine[0].lineItem.quantity);
    }
    Object.defineProperty(QuotationWrapper.prototype, "priceAmount", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.price.priceAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "orderedQuantity", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.quantity;
        },
        set: function (quantity) {
            this.quotation.quotationLine[0].lineItem.quantity = quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "deliveryPeriod", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "deliveryPeriodString", {
        get: function () {
            return utils_1.durationToString(this.deliveryPeriod);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "warranty", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.warrantyValidityPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "warrantyString", {
        get: function () {
            return utils_1.durationToString(this.warranty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "incoterms", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.deliveryTerms.incoterms;
        },
        set: function (incoterms) {
            this.quotation.quotationLine[0].lineItem.deliveryTerms.incoterms = incoterms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "incotermsString", {
        get: function () {
            return this.quotation.quotationLine[0].lineItem.deliveryTerms.incoterms || "None";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "paymentMeans", {
        get: function () {
            return this.quotation.paymentMeans.paymentMeansCode.value;
        },
        set: function (paymentMeans) {
            this.quotation.paymentMeans.paymentMeansCode.value = paymentMeans;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "frameContractDuration", {
        get: function () {
            var tradingTerm = this.quotation.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm != null) {
                return tradingTerm.value.valueQuantity[0];
            }
            return null;
        },
        set: function (duration) {
            var tradingTerm = this.quotation.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm == null) {
                tradingTerm = new trading_term_1.TradingTerm("FRAME_CONTRACT_DURATION", null, null, new multi_type_value_1.MultiTypeValue());
                tradingTerm.value.valueQuantity.push(duration);
                this.quotation.tradingTerms.push(tradingTerm);
            }
            else {
                tradingTerm.value.valueQuantity[0] = duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "rfqFrameContractDurationString", {
        get: function () {
            var duration = this.frameContractDuration;
            if (duration != null) {
                return utils_1.durationToString(duration);
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "dataMonitoringPromised", {
        get: function () {
            return this.quotation.dataMonitoringPromised;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotationWrapper.prototype, "dataMonitoringPromisedString", {
        get: function () {
            return this.quotation.dataMonitoringPromised ? "Promised" : "Not Promised";
        },
        enumerable: true,
        configurable: true
    });
    return QuotationWrapper;
}());
exports.QuotationWrapper = QuotationWrapper;
//# sourceMappingURL=quotation-wrapper.js.map