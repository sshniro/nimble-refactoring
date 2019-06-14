"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jinnerbi on 03/07/17.
 */
var DeliveryTerms = /** @class */ (function () {
    function DeliveryTerms(specialTerms, // languageId-value pairs. For example, {en:"some special terms here"}
        deliveryAddress, estimatedDeliveryTime) {
        if (specialTerms === void 0) { specialTerms = {}; }
        this.specialTerms = specialTerms;
        this.deliveryAddress = deliveryAddress;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }
    return DeliveryTerms;
}());
exports.DeliveryTerms = DeliveryTerms;
//# sourceMappingURL=delivery-terms.js.map