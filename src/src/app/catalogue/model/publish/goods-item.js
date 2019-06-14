"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var delivery_terms_1 = require("./delivery-terms");
var package_1 = require("./package");
var ubl_model_utils_1 = require("../ubl-model-utils");
var GoodsItem = /** @class */ (function () {
    function GoodsItem(id, item, containingPackage, deliveryTerms) {
        if (id === void 0) { id = null; }
        if (item === void 0) { item = ubl_model_utils_1.UBLModelUtils.createItem(); }
        if (containingPackage === void 0) { containingPackage = new package_1.Package(); }
        if (deliveryTerms === void 0) { deliveryTerms = new delivery_terms_1.DeliveryTerms(); }
        this.id = id;
        this.item = item;
        this.containingPackage = containingPackage;
        this.deliveryTerms = deliveryTerms;
    }
    return GoodsItem;
}());
exports.GoodsItem = GoodsItem;
//# sourceMappingURL=goods-item.js.map