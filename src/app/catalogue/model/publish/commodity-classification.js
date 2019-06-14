"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
/**
 * Created by suat on 03-Jul-17.
 */
var CommodityClassification = /** @class */ (function () {
    function CommodityClassification(itemClassificationCode, natureCode, cargoTypeCode, hjid) {
        if (itemClassificationCode === void 0) { itemClassificationCode = new code_1.Code(); }
        if (natureCode === void 0) { natureCode = new code_1.Code(); }
        if (cargoTypeCode === void 0) { cargoTypeCode = new code_1.Code(); }
        if (hjid === void 0) { hjid = null; }
        this.itemClassificationCode = itemClassificationCode;
        this.natureCode = natureCode;
        this.cargoTypeCode = cargoTypeCode;
        this.hjid = hjid;
    }
    return CommodityClassification;
}());
exports.CommodityClassification = CommodityClassification;
//# sourceMappingURL=commodity-classification.js.map