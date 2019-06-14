"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var payment_terms_wrapper_1 = require("../payment-terms-wrapper");
var utils_1 = require("../../../common/utils");
var trading_term_1 = require("../../../catalogue/model/publish/trading-term");
var multi_type_value_1 = require("../../../catalogue/model/publish/multi-type-value");
var discount_price_wrapper_1 = require("../../../common/discount-price-wrapper");
var quotation_wrapper_1 = require("./quotation-wrapper");
/**
 * Convenient getters (and some setters) for catalogue line, request for quotations and quotations.
 * This class also serves as a bit of documentation on the model.
 */
var NegotiationModelWrapper = /** @class */ (function () {
    function NegotiationModelWrapper(catalogueLine, rfq, newQuotation, // quotation object of the current negotiation step instantiated as a result of the rfq. It's supposed to be provided in the negotiation response phase
        frameContractQuotation, // quotation object associated to a frame contract, if any
        lastOfferQuotation, // in second or later steps of negotiation, this parameter keeps the quotation coming from the previous step
        settings) {
        this.catalogueLine = catalogueLine;
        this.rfq = rfq;
        this.newQuotation = newQuotation;
        this.frameContractQuotation = frameContractQuotation;
        this.lastOfferQuotation = lastOfferQuotation;
        this.settings = settings;
        if (rfq) {
            this.initialImmutableRfq = utils_1.copy(rfq);
            this.rfqPaymentTerms = new payment_terms_wrapper_1.PaymentTermsWrapper(rfq.paymentTerms);
        }
        if (catalogueLine) {
            this.initialImmutableCatalogueLine = utils_1.copy(catalogueLine);
        }
        // discount price wrappers
        if (catalogueLine && rfq) {
            // first construct wrappers
            this.lineDiscountPriceWrapper = new discount_price_wrapper_1.DiscountPriceWrapper(catalogueLine.requiredItemLocationQuantity.price, utils_1.copy(catalogueLine.requiredItemLocationQuantity.price), // we don't want the original catalogueLine.requiredItemLocationQuantity.price to be updated in price changes
            catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent, rfq.requestForQuotationLine[0].lineItem.quantity, catalogueLine.priceOption, rfq.requestForQuotationLine[0].lineItem.item.additionalItemProperty, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms, rfq.paymentMeans.paymentMeansCode.value, rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address);
            this.rfqDiscountPriceWrapper = new discount_price_wrapper_1.DiscountPriceWrapper(catalogueLine.requiredItemLocationQuantity.price, rfq.requestForQuotationLine[0].lineItem.price, catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent, rfq.requestForQuotationLine[0].lineItem.quantity, catalogueLine.priceOption, rfq.requestForQuotationLine[0].lineItem.item.additionalItemProperty, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms, rfq.paymentMeans.paymentMeansCode.value, rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address);
            if (newQuotation) {
                this.quotationDiscountPriceWrapper = new discount_price_wrapper_1.DiscountPriceWrapper(catalogueLine.requiredItemLocationQuantity.price, newQuotation.quotationLine[0].lineItem.price, catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent, newQuotation.quotationLine[0].lineItem.quantity, catalogueLine.priceOption, rfq.requestForQuotationLine[0].lineItem.item.additionalItemProperty, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms, rfq.paymentMeans.paymentMeansCode.value, rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure, rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address);
            }
        }
        if (newQuotation) {
            this.newQuotationWrapper = new quotation_wrapper_1.QuotationWrapper(newQuotation, catalogueLine);
        }
        if (frameContractQuotation) {
            this.frameContractQuotationWrapper = new quotation_wrapper_1.QuotationWrapper(frameContractQuotation, catalogueLine);
        }
        if (lastOfferQuotation) {
            this.lastOfferQuotationWrapper = new quotation_wrapper_1.QuotationWrapper(lastOfferQuotation, catalogueLine);
        }
    }
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineDeliveryPeriod", {
        /**
         * Getter methods for the line which is updated based on activities of the
         */
        get: function () {
            return this.catalogueLine.goodsItem.deliveryTerms.estimatedDeliveryPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineDeliveryPeriodString", {
        get: function () {
            return utils_1.durationToString(this.lineDeliveryPeriod);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineWarranty", {
        get: function () {
            return this.catalogueLine.warrantyValidityPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineWarrantyString", {
        get: function () {
            return utils_1.durationToString(this.lineWarranty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineIncoterms", {
        get: function () {
            return this.catalogueLine.goodsItem.deliveryTerms.incoterms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "linePaymentTerms", {
        get: function () {
            return this.settings.paymentTerms[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "linePaymentMeans", {
        get: function () {
            return this.settings.paymentMeans[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "lineVatPercentage", {
        get: function () {
            return this.catalogueLine.requiredItemLocationQuantity.applicableTaxCategory[0].percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "originalLineDeliveryPeriod", {
        /**
         * Methods for retrieving terms from the original line
         */
        get: function () {
            return this.initialImmutableCatalogueLine.goodsItem.deliveryTerms.estimatedDeliveryPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "originalLineWarranty", {
        get: function () {
            return this.initialImmutableCatalogueLine.warrantyValidityPeriod.durationMeasure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "originalLineIncoterms", {
        get: function () {
            return this.initialImmutableCatalogueLine.goodsItem.deliveryTerms.incoterms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqPricePerItemString", {
        get: function () {
            return this.rfqDiscountPriceWrapper.pricePerItemString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqTotalPriceString", {
        get: function () {
            return this.rfqDiscountPriceWrapper.totalPriceString;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqVatTotal", {
        get: function () {
            return this.rfqDiscountPriceWrapper.totalPrice * this.lineVatPercentage / 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqVatTotalString", {
        get: function () {
            return this.rfqVatTotal + " " + this.rfqDiscountPriceWrapper.itemPrice.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqGrossTotal", {
        get: function () {
            return this.rfqDiscountPriceWrapper.totalPrice + this.rfqVatTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqGrossTotalString", {
        get: function () {
            return utils_1.roundToTwoDecimals(this.rfqGrossTotal) + " " + this.rfqDiscountPriceWrapper.itemPrice.currency;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqDeliveryPeriod", {
        get: function () {
            return this.rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure;
        },
        set: function (quantity) {
            this.rfq.requestForQuotationLine[0].lineItem.delivery[0].requestedDeliveryPeriod.durationMeasure = quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqDeliveryPeriodString", {
        get: function () {
            return utils_1.durationToString(this.rfqDeliveryPeriod);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqWarranty", {
        get: function () {
            return this.rfq.requestForQuotationLine[0].lineItem.warrantyValidityPeriod.durationMeasure;
        },
        set: function (quantity) {
            this.rfq.requestForQuotationLine[0].lineItem.warrantyValidityPeriod.durationMeasure = quantity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqWarrantyString", {
        get: function () {
            return utils_1.durationToString(this.rfqWarranty);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqIncoterms", {
        get: function () {
            return this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms;
        },
        set: function (incoterms) {
            this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.incoterms = incoterms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqPaymentTermsToString", {
        get: function () {
            return this.rfqPaymentTerms.paymentTerm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqPaymentMeans", {
        get: function () {
            return this.rfq.paymentMeans.paymentMeansCode.value;
        },
        set: function (paymentMeans) {
            this.rfq.paymentMeans.paymentMeansCode.value = paymentMeans;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqFrameContractDuration", {
        get: function () {
            var tradingTerm = this.rfq.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm != null) {
                return tradingTerm.value.valueQuantity[0];
            }
            return null;
        },
        set: function (duration) {
            var tradingTerm = this.rfq.tradingTerms.find(function (tradingTerm) { return tradingTerm.id == "FRAME_CONTRACT_DURATION"; });
            if (tradingTerm == null) {
                tradingTerm = new trading_term_1.TradingTerm("FRAME_CONTRACT_DURATION", null, null, new multi_type_value_1.MultiTypeValue());
                tradingTerm.value.valueQuantity.push(duration);
                this.rfq.tradingTerms.push(tradingTerm);
            }
            else {
                tradingTerm.value.valueQuantity[0] = duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NegotiationModelWrapper.prototype, "rfqDeliveryAddress", {
        get: function () {
            return this.rfq.requestForQuotationLine[0].lineItem.deliveryTerms.deliveryLocation.address;
        },
        enumerable: true,
        configurable: true
    });
    return NegotiationModelWrapper;
}());
exports.NegotiationModelWrapper = NegotiationModelWrapper;
//# sourceMappingURL=negotiation-model-wrapper.js.map