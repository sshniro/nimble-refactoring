"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var PaymentMeans = /** @class */ (function () {
    function PaymentMeans(paymentMeansCode) {
        if (paymentMeansCode === void 0) { paymentMeansCode = new code_1.Code(); }
        this.paymentMeansCode = paymentMeansCode;
    }
    return PaymentMeans;
}());
exports.PaymentMeans = PaymentMeans;
//# sourceMappingURL=payment-means.js.map