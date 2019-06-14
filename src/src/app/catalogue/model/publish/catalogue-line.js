"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by suat on 26-May-17.
 */
var CatalogueLine = /** @class */ (function () {
    function CatalogueLine(id, hjid, orderableUnit, freeOfChargeIndicator, warrantyValidityPeriod, warrantyInformation, requiredItemLocationQuantity, priceOption, goodsItem) {
        if (freeOfChargeIndicator === void 0) { freeOfChargeIndicator = null; }
        if (priceOption === void 0) { priceOption = null; }
        this.id = id;
        this.hjid = hjid;
        this.orderableUnit = orderableUnit;
        this.freeOfChargeIndicator = freeOfChargeIndicator;
        this.warrantyValidityPeriod = warrantyValidityPeriod;
        this.warrantyInformation = warrantyInformation;
        this.requiredItemLocationQuantity = requiredItemLocationQuantity;
        this.priceOption = priceOption;
        this.goodsItem = goodsItem;
    }
    return CatalogueLine;
}());
exports.CatalogueLine = CatalogueLine;
//# sourceMappingURL=catalogue-line.js.map