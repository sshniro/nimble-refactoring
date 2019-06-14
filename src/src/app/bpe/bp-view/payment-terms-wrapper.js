"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ubl_model_utils_1 = require("../../catalogue/model/ubl-model-utils");
var PaymentTermsWrapper = /** @class */ (function () {
    function PaymentTermsWrapper(paymentTerms) {
        this.paymentTerms = paymentTerms;
        this.PAYMENT_TERMS = ubl_model_utils_1.UBLModelUtils.getDefaultPaymentTermsAsStrings();
        var index = paymentTerms.tradingTerms.findIndex(function (term) { return term.value.value[0].value == "true"; });
        this.selectedPaymentTerm = index < 0 ? 0 : index;
    }
    Object.defineProperty(PaymentTermsWrapper.prototype, "paymentTerm", {
        get: function () {
            return this.PAYMENT_TERMS[this.selectedPaymentTerm];
        },
        set: function (paymentTerm) {
            var index = this.PAYMENT_TERMS.findIndex(function (term) { return term === paymentTerm; });
            if (index < 0) {
                return;
            }
            this.paymentTerms.tradingTerms[this.selectedPaymentTerm].value.value[0].value = "false";
            this.selectedPaymentTerm = index;
            this.paymentTerms.tradingTerms[this.selectedPaymentTerm].value.value[0].value = "true";
            this.paymentTerms.tradingTerms = [].concat(this.paymentTerms.tradingTerms);
        },
        enumerable: true,
        configurable: true
    });
    return PaymentTermsWrapper;
}());
exports.PaymentTermsWrapper = PaymentTermsWrapper;
//# sourceMappingURL=payment-terms-wrapper.js.map